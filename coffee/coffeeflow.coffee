j = jQuery

isCompatible = ()->
	test1 = false
	rat = document.createElement 'div'
	props1 = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition']
	
	for i in props1
		test1 = true if !!(0 + rat.style[i])
	test1

compatible = isCompatible()

prefix = () ->
	r = "-webkit-" if j.browser.webkit
	r = "-moz-" if j.browser.mozilla
	r = "-ms-" if j.browser.msie
	r = "-o-" if j.browser.opera
	r


class Coffeeflow
	window?.Coffeeflow = this
	constructor: (el, options) ->
		container = j el

		settings =
			blur:(e)		->
				log "CoffeeFlow blured"
			change:(e) 		->
				log "CoffeeFlow change"
			error:(e) 		->
				log "CoffeeFlow image load error"
			focus:(e)		->
				log "CoffeeFlow focused"
			ready:(e)		->
				log "CoffeeFlow ready"
			select:(e)		->
				log "CoffeeFlow select"
			
			borderWidth:			0
			borderColor:			"rgba(255,255,255, .3)"
			borderColorHover:		"rgba(0,175,255, .8)"
			borderColorSelected:	"rgba(250,210,6, .8)"
			borderStyle:			"solid"
			crop:					false
			debug: 					false
			defaultItem: 			"auto"
			density:				3.2
			hideOverflow:			true
			minHeight:				120
			pull:					true
			selectOnChange: 		false
			transitionDuration:		500
			transitionEasing:		"cubic-bezier(0.075, 0.820, 0.165, 1.000)"
			transitionPerspective:	"600px"
			transitionScale:		.70
			transitionRotation:		45

		settings = j.extend settings, container.data()
		settings = j.extend settings, options

		self = this
		state = ""
		changeTimeout = 0
		

		stack = []
		canvas = j '<div class="coffeeflowCanvas"></div>'

		canvas.css
			position : "relative"

		if settings.hideOverflow
			container.css
				overflow : "hidden"

		items = container.find "a"

		if parseInt settings.defaultItem 
			currentItem = settings.defaultItem
		else
			currentItem = Math.floor items.length / 2


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
			if i != currentItem
				if i >= stack.length
					i = stack.length - 1
				if i < 0
					i = 0
				currentItem = i
				arrange()
				clearTimeout changeTimeout
				changeTimeout = setTimeout onChange, settings.transitionDuration
				if settings.selectOnChange
					stack[i].select()

		# Private
		arrange = ()->
			w = canvas.width()
			h = canvas.height()
			for i in stack
				i.arrange currentItem, stack.length, w, h


		getState = () ->
			state

		log = (msg) ->
			console?.log msg if settings.debug
		
		onChange = () =>
			settings.change(self)
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
			item = new CoffeeflowItem i, _i, self, settings
			stack.push item
		
		container.addClass "coffeeflowReflections" if settings.enableReflections
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
			hammer = new Hammer canvas[0],
				prevent_default: true
				swipe_time: 200
				drag_vertical: false
				transform: false
				hold: false
			ts = 0
			sItem = currentItem
			hammer.ondragstart = (e) =>
				sItem = currentItem
				ts = new Date().getTime()
			hammer.ondrag = (e) =>
				offset = parseInt ( e.distanceX / ( @getHeight() / settings.density * 1.4 ) )
				pos = sItem - offset
				@slideTo pos
			hammer.onswipe = (e) =>
				period = e.originalEvent.timeStamp - ts
				impulse = Math.floor e.distance / ( period / settings.density * 2 )
				pos = currentItem
				switch e.direction
					when "left"
						pos = pos + impulse
					when "right"
						pos = pos - impulse
				@slideTo pos

		setTimeout ready, 10


class CoffeeflowItem
	constructor: (el, i, p, settings) ->
		el = j el
		i = i
		p = p

		self = this

		data = j.data el
		link = el.attr "href"
		source = el.find("img").attr "src"
		
		state = item = anchor = img = xPos = depth = size = attached = completeTimeout = preloader = 0
		visible = true

		el.remove()

		

		# Public methods
		@arrange = (currentItem, totalItems, canvasWidth, canwasHeight) ->
			size = canwasHeight
			margin = size / settings.density
			if i is currentItem
				state = "current"
				depth = totalItems + 1
				x = canvasWidth / 2
				visible = true
			else if i < currentItem
				state = "before"
				depth = i
				x = ( canvasWidth / 2 ) - (margin) - ( ( currentItem - i ) * margin )
				c = 0 - size
				visible = x > c
			else
				state = "after"
				depth = totalItems - i
				x = ( canvasWidth / 2 ) + (margin) + ( ( i - currentItem) * margin )
				c = canvasWidth + size
				visible = x < c
			

			render(x) if visible and not attached

			if attached
				anchor.width(size).height(size).css
					left : "#{0 - size/2}px"

				item.removeClass "coffeeflowItem_before"
				item.removeClass "coffeeflowItem_current"
				item.removeClass "coffeeflowItem_after"
				if state != "current"
					item.removeClass "coffeeflowItem_selected"
				item.addClass "coffeeflowItem_" + state
				item.css "z-index", depth

				
				align(x)
				

				completeTimeout = setTimeout onComplete, settings.transitionDuration


			xPos = x

		@setContent = (content) ->	
			anchor.append content

		
		# private
		align = (x) ->
			if compatible
				item.css
					"transform" : "translate(" + x + "px)"
					"z-index" : depth
				
				setTransform()

				bTarget = img
				bTarget = anchor if settings.crop
				if item.is ".coffeeflowItem_selected"
					bTarget.css
						borderColor 	: settings.borderColorSelected
				else
					bTarget.css
						borderColor 	: settings.borderColor
			else
				item.css
					"z-index" : depth
				item.animate
					left : x,
					"fast"


		attach = () ->	
			load()
			attached = true

		crop = () ->	
			if img.width() > img.height()
				iWidth = "none"
				iHeight = "100%"
				iBottom = 0
				iScale = img.width() / size
				iLeft = 0 - ( ( ( img.width() / iScale ) - size ) / 2 )
			else
				iWidth = "100%"
				iHeight = "none"
				iScale = img.height() / size
				iBottom = 0 - ( ( ( img.height() / iScale ) - size ) / 2 )
				iLeft = 0

			img.css
				borderWidth 	: 0
				maxWidth		: "none"
				maxHeight		: "none"
				left			: iLeft
				width 			: iWidth
				height 			: iHeight
				transition 		: "none"
				bottom 			: iBottom

			anchor.css
				borderWidth 	: settings.borderWidth
				borderStyle 	: settings.borderStyle
				margin 			: 0 - settings.borderWidth + "px" 
				overflow 		: "hidden"

		
		detach = () ->
			j(item).remove()
			attached = false

		load = () ->
			preloader.setState "loading"
			img.attr "src" : source

		onComplete = () ->
			detach() if attached and not visible

		render = (x) ->
			if not attached
				item = j "<div class='coffeeflowItem'></div>"
				anchor = j "<a href='#{source}' />"
				img = j '<img />'

				img.load (e) =>
					item.addClass "coffeeflowItem_ready"
					
					anchor.width(size).height(size)
					anchor.css
						"transition" : "#{prefix()}transform #{settings.transitionDuration / 1000}s #{settings.transitionEasing}"
					img.css
						borderWidth 	: settings.borderWidth
						borderColor 	: settings.borderColor
						borderStyle 	: settings.borderStyle
						bottom 			: 0
						maxWidth		: "100%"
						maxHeight		: "100%"
						position 		: "absolute"
						"transition" 	: "transform #{settings.transitionDuration / 1000}s #{settings.transitionEasing}"

					bTarget = img
					if settings.crop
						setTimeout crop, 10
						bTarget = anchor

					img.mouseover (e) =>
						if item.is ".coffeeflowItem_selected"
							bTarget.css
								borderColor : settings.borderColorSelected
						else
							bTarget.css
								borderColor : settings.borderColorHover

						setTransform true if settings.pull
							
						

					img.mouseout (e) =>
						if item.is ".coffeeflowItem_selected"
							bTarget.css
								borderColor : settings.borderColorSelected
						else
							bTarget.css
								borderColor : settings.borderColor
						setTransform false if settings.pull

					preloader.detach()
					self.setContent img
					align xPos

				img.error (e) =>
					preloader.setState "error"
					settings.error p


				if Hammer?
					hammer = new Hammer anchor[0],
						prevent_default: false
						drag: false
						swipe: false
						transform: false
						tap_double: false
						hold: false
					hammer.ontap = (e) =>
						if item.is ".coffeeflowItem_current"
							select()
						else
							p.slideTo i
						return false
				else
					anchor.click (e) =>
						if item.is ".coffeeflowItem_current"
							select()
						else
							p.slideTo i
				anchor.click (e) =>
					e.preventDefault()
				
				item.css
					background		: "none"
					width 			: 0
					height 			: 0
					position		: "absolute"
					left 			: 0
					
				if compatible
					item.css
						transition 		: "#{prefix()}transform #{settings.transitionDuration / 1000}s #{settings.transitionEasing}"
						transform 		: "translate(#{xPos}px)"
				else
					item.css
						left : xPos + "px"
				anchor.css
					marginLeft		: "-50%"
					width			: size
					height			: size
					left			: "-50%"
					top				: 0
					position		: "absolute"
				item.appendTo p.getCanvas()

				item.append anchor

				preloader = new Preloader self

				attach()
				
			
		select = () ->
			item.addClass "coffeeflowItem_selected"
			if settings.crop
				anchor.css
					borderColor 	: settings.borderColorSelected
			else
				img.css
					borderColor 	: settings.borderColorSelected
			settings.select p

		setTransform = (mouseover = false) ->
			translate = 0
			translate = size / 4 if mouseover
			switch state
				when "before"
					transform = "perspective(#{settings.transitionPerspective}) scale(#{settings.transitionScale}) rotateY(#{settings.transitionRotation}deg) translate(-#{translate}px)"
					if j.browser.opera
						transform = "scale(#{settings.transitionScale}) skew(0deg, -20deg)"
					iX = 0
				when "after"
					transform = "perspective(#{settings.transitionPerspective}) scale(#{settings.transitionScale}) rotateY(-#{settings.transitionRotation}deg) translate(#{translate}px)"
					if j.browser.opera
						transform = "scale(#{settings.transitionScale}) skew(0deg, 20deg)"
					iX = anchor.width() - img.width()
				when "current"
					transform = "perspective(#{settings.transitionPerspective}) scale(1) rotateY(0deg)"
					if j.browser.opera
						transform = "scale(1)"
					iX = ( anchor.width() - img.width() ) / 2
			anchor.css
				"transform" : transform
			if !settings.crop
				img.css
					transform : "translate(#{iX}px)"
class Preloader
	constructor: (parent) ->
		parent = parent

		bg = "#F0F0F0"

		preloader = j("<div/>").css
			background		: bg
			border 			: "1px solid #9E9E9E"
			margin			: "-1px"
			width			: "100%"
			height			: "100%"
			overflow 		: "hidden"
			position 		: "relative"
		
		parent.setContent preloader

		@detach = () ->
			preloader.remove()
			preloader = 0

		@setState = (state) ->
			switch state
				when "loading"
					i = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve">
<rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/>
<g>
	<g opacity="0.5">
		<g><path fill="#FFFFFF" d="M40.047,36.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248
				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722
				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96
				c0,0,0,0.36,0,4.249C47.031,30.974,40.047,34.214,40.047,36.951z M41.561,31.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801
				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392
				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375
				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375
				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C37.887,34.791,39.688,33.422,41.561,31.55z M29.174,24.134
				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08
				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C29.678,23.125,28.527,23.702,29.174,24.134z"/>
		</g>
	</g>
	<g>
		<g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="35.9507" y1="17.9497" x2="35.9507" y2="53.9526">
				<stop  offset="0" style="stop-color:#4D4D4D"/>
				<stop  offset="0.3078" style="stop-color:#454545"/>
				<stop  offset="0.7719" style="stop-color:#313131"/>
				<stop  offset="1" style="stop-color:#242424"/></linearGradient><path fill="url(#SVGID_1_)" d="M39.047,35.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248
				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722
				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96
				c0,0,0,0.36,0,4.249C46.031,29.974,39.047,33.214,39.047,35.951z M40.561,30.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801
				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392
				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375
				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375
				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C36.887,33.791,38.688,32.422,40.561,30.55z M28.174,23.134
				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08
				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C28.678,22.125,27.527,22.702,28.174,23.134z"/>
		</g></g></g></svg>'
				else
					i = '<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve">
<rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/>
<g>
	<g opacity="0.5">
		<g>
			<path fill="#FFFFFF" d="M26.501,43.627c-1.343-2.053-2.107-4.535-2.107-7.126c0-7.272,5.833-13.177,13.105-13.177
				c2.656,0,5.106,0.768,7.188,2.117l0.165-0.165c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177
				c0,3.097,1.08,6.048,2.952,8.281L26.501,43.627z"/>
			<path fill="#FFFFFF" d="M47.554,28.318c-0.26-0.406-0.532-0.801-0.83-1.17L28.219,45.654c0.365,0.307,0.754,0.584,1.153,0.846
				L47.554,28.318z"/>
			<path fill="#FFFFFF" d="M49.207,23.792c2.833,3.076,4.573,7.176,4.573,11.708c0,9.505-7.704,17.283-17.281,17.283
				c-4.499,0-8.598-1.758-11.681-4.602c3.163,3.432,7.675,5.602,12.681,5.602c9.577,0,17.281-7.777,17.281-17.283
				C54.78,31.457,52.63,26.946,49.207,23.792z"/>
		</g>
	</g>
	<g>
		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="36.4985" y1="18.2192" x2="36.4985" y2="52.7837">
			<stop  offset="0" style="stop-color:#4D4D4D"/>
			<stop  offset="0.3078" style="stop-color:#454545"/>
			<stop  offset="0.7719" style="stop-color:#313131"/>
			<stop  offset="1" style="stop-color:#242424"/>
		</linearGradient>
		<path fill="url(#SVGID_1_)" d="M53.78,35.5c0,9.505-7.704,17.283-17.281,17.283c-9.505,0-17.281-7.777-17.281-17.283
			c0-9.576,7.776-17.281,17.281-17.281C46.076,18.219,53.78,25.924,53.78,35.5z M26.346,43.781l18.506-18.505
			c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177C23.394,38.598,24.474,41.549,26.346,43.781z
			 M49.676,35.5c0-3.168-1.151-6.12-2.952-8.353L28.219,45.654c2.231,1.871,5.112,2.951,8.28,2.951
			C43.771,48.605,49.676,42.701,49.676,35.5z"/>
	</g>
</g>
</svg>'
			icon = j("<div/>").css
				position		: "relative"
				top 			: "50%"
				width 			: "100%"
				height 			: "73px"
				marginTop		: "-37px"
				textAlign 		: "center"

			icon.html i
			preloader.empty().html icon	
			
