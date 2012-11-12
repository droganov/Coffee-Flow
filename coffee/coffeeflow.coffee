jQuery.fn.extend
	coverflow: (options) ->
		j = jQuery
		settings =
			blur:			->
				log "coverflow blured"
			change: 		->
				log "coverflow change"
			ready:			->
				log "coverflow ready"
			select:			->
				log "coverflow select"
			focus:			->
				log "coverflow focused"
			borderWidth:	2
			debug: 			false
			density:		4.2
			firstItem: 		2
			minHeight:		200
			selectOnChange: false
		settings = j.extend settings, options

		log = (msg) ->
			console?.log msg if settings.debug

		class Coverflow
			constructor: (el) ->
				@state = ""
				@container = j el
				@currentItem = settings.firstItem
				@stack = []
				@canvas = j '<div class="coverFlowCanvas"></div>'

				items = @container.find "a"
				for i in items
					item = new CoverflowItem i, _i, this
					@stack.push item
					item.appendTo @canvas
					
				@container.append @canvas
				@resize()
				
				j( window ).resize (e) =>
					@resize()

				@container.click (e) =>
					if not @container.is ".coverflowFocuse"
						@container.addClass "coverflowFocuse"
						@resize()
						settings.focus this
					e.stopPropagation()
				j("html").click (e) =>
					if @container.is ".coverflowFocuse"
						@container.removeClass "coverflowFocuse"
						@resize()
						settings.blur this

				setTimeout @ready, 10
			
			arrange: ()->
				for i in @stack
					i.resize()
					margin = @canvas.height() / settings.density
					if _i is @currentItem
						state = "current"
						depth = @stack.length + 1
						x = @canvas.width() / 2
					else if _i < @currentItem
						state = "before"
						depth = _i
						x = ( @canvas.width() / 2 ) - (margin / 2) - ( ( @currentItem - _i ) * margin )
					else
						state = "after"
						depth = @stack.length - _i
						x = ( @canvas.width() / 2 ) + (margin / 2) + ( ( _i - @currentItem) * margin )
					i.setDepth depth
					i.moveTo x
					i.setState state
			getCanvas: ()->
				return @canvas
			getState: () ->
				@state
			ready: ()=>
				@canvas.addClass "ready"
				@resize()
				settings.ready this
			resize: ()=>
				if @container.height() > settings.minHeight
					height = @container.height()
				else
					height = settings.minHeight				
				@canvas.height height
				@arrange()
			setState: (state)->
				@state = state
			slideTo: (i)->
				@currentItem = i
				@arrange()
				settings.change this
				if settings.selectOnChange
					@stack[i].select()
										


		class CoverflowItem
			constructor: (el, i, p) ->
				@state = ""
				@p = p
				@self = j(el).addClass "coverflowItem"
				@img = @self.find "img"
				@self.css
					top: settings.borderWidth + "px"
				@img.css
					"border-width": settings.borderWidth + "px"
					margin: -settings.borderWidth + "px"

				@img.load (e) =>
					@align()

				@self.click (e) =>
					e.preventDefault()
					if @self.is ".current"
						@select()
					else
						p.slideTo i
			align: () ->
				switch @state
					when "current"
						@img.css
							left: ( @self.height() - @img.width() ) / 2 + "px"
					when "before"
						@img.css
							left: 0
					when "after"
						@img.css
							right: 0

			appendTo: (target)->
				@self.appendTo target
			setDepth: (depth)->
				@self.css "z-index", depth
			select: () ->
				@self.addClass "selected"
				settings.select @p
			setState: (state)->
				@self.removeClass "before"
				@self.removeClass "current"
				@self.removeClass "after"
				if state != "current"
					@self.removeClass "selected"
				@self.addClass state
				@state = state
				@align()

			moveTo: (x)->
				x = x - ( @self.width() / 2 )
				@self.css
					left: x + "px"
			resize: ()->
				h = @p.getCanvas().height() - ( settings.borderWidth * 2)
				@self.height( h ).width( h )
			
			
		

		return @each ()->
			new Coverflow this
			return