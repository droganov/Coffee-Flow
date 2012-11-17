log = (msg) ->
	console?.log msg if settings.debug
j = jQuery
settings =
	blur:(e)		->
		log "CoffeeFlow blured"
	change:(e) 		->
		log "CoffeeFlow change"
	ready:(e)		->
		log "CoffeeFlow ready"
	select:(e)		->
		log "CoffeeFlow select"
	focus:(e)		->
		log "CoffeeFlow focused"
	borderWidth:	1
	debug: 			false
	density:		3.2
	defaultItem: 		2
	minHeight:		200
	selectOnChange: false
class Coffeeflow
	window?.Coffeeflow = this
	constructor: (el, options) ->
		container = j el
		settings = j.extend settings, j.data(el)
		settings = j.extend settings, options

		self = this
		state = ""
		
		currentItem = settings.defaultItem
		stack = []
		canvas = j '<div class="coffeeflowCanvas"></div>'

		items = container.find "a"


		# Public
		@getCanvas = ()->
			return canvas

		@getData = () ->
			canvas.data()

		@getHeight = ->
			canvas.height()

		@getIndex = () ->
			currentItem

		@getItem = ( i = currentItem ) ->
			stack[ i ]

		@getWidth = ->
			canvas.width()

		@hasFocus = ->
			container.is ".coffeeflowFocuse"

		@resize = () ->
			if container.height() > settings.minHeight
				height = container.height()
			else
				height = settings.minHeight				
			canvas.height height
			arrange()

		@slideTo = (i)->
			if i >= stack.length
				i = stack.length - 1
			if i < 0
				i = 0
			currentItem = i
			arrange()
			settings.change self
			if settings.selectOnChange
				stack[i].select()

		# Private
		arrange = ()->
			for i in stack
				i.resize()
				margin = canvas.height() / settings.density
				if _i is currentItem
					state = "current"
					depth = stack.length + 1
					x = canvas.width() / 2
				else if _i < currentItem
					state = "before"
					depth = _i
					x = ( canvas.width() / 2 ) - (margin / 2) - ( ( currentItem - _i ) * margin )
				else
					state = "after"
					depth = stack.length - _i
					x = ( canvas.width() / 2 ) + (margin / 2) + ( ( _i - currentItem) * margin )
				i.setDepth depth
				i.setState state
				i.moveTo(x)


		getState = () ->
			state
		
		onMouseWheel = (e) =>
			if @hasFocus()
				e = e || event
				delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))

				i = currentItem + delta
				@slideTo i

				if e.preventDefault
					e.preventDefault()
				else
					(e.returnValue = false)

		ready = () =>
			canvas.addClass "ready"
			@resize()
			settings.ready self

		setState = (state)->
			state = state
								
		# init
		for i in items
			item = new CoffeeflowItem i, _i, self
			stack.push item
			item.appendTo canvas
		
		container.append canvas
		@resize()
		
		j( window ).resize (e) =>
			@resize()

		container.mouseover (e) =>
			if not container.is ".coffeeflowFocuse"
				container.addClass "coffeeflowFocuse"
				@resize()
				settings.focus self
			e.stopPropagation()

		j("html").mouseover (e) =>
			if container.is ".coffeeflowFocuse"
				container.removeClass "coffeeflowFocuse"
				@resize()
				settings.blur self
				e.stopPropagation()

		if window.addEventListener
			window.addEventListener "mousewheel", onMouseWheel, false
			window.addEventListener "DOMMouseScroll", onMouseWheel, false
		else
			window.attachEvent "onmousewheel", onMouseWheel

		if Hammer?
			hammer = new Hammer canvas[0]
			hammer.onswipe = (e) =>
				pos = currentItem
				offset = parseInt( currentItem / @getHeight() )
				offset = 1 if offset is 0
				switch e.direction
					when "left"
						pos = currentItem + offset
					when "right"
						pos = currentItem - offset
				@slideTo pos

		setTimeout ready, 10


class CoffeeflowItem
	constructor: (el, i, p) ->
		state = ""
		p = p
		self = j(el).addClass "coffeeflowItem"
		img = self.find "img"
		self.css
			top: settings.borderWidth + "px"
		img.css
			"border-width": settings.borderWidth + "px"
			margin: -settings.borderWidth + "px"

		img.load (e) =>
			align()

		self.click (e) =>
			e.preventDefault()
			if self.is ".current"
				select()
			else
				p.slideTo i

		# Public methods
		@appendTo = (target)->
			self.appendTo target
		@setDepth = (depth)->
			self.css "z-index", depth
		@setState = (newState)->
			self.removeClass "before"
			self.removeClass "current"
			self.removeClass "after"
			if newState != "current"
				self.removeClass "selected"
			self.addClass newState
			state = newState
			align()

		@moveTo = (x)->
			x = x - ( self.width() / 2 )
			visible = true
			switch state
				when "before"
					visible = x > 0 - self.width() 
				when "after"
					visible = x < 0 + p.getWidth()
			if visible
				self.show()
			else
				self.hide()
			self.css
				left: x + "px"
			
		@resize = ()->
			h = p.getCanvas().height() - ( settings.borderWidth * 2)
			self.height( h ).width( h )
		
		# private
		align = () ->
			switch state
				when "current"
					img.css
						left: ( self.height() - img.width() ) / 2 + "px"
				when "before"
					img.css
						left: 0
				when "after"
					img.css
						right: 0

		select = () ->
			self.addClass "selected"
			settings.select p
