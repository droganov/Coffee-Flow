jQuery.fn.extend
	coffeeflow: (options) ->
		return @each ()->
			new Coffeeflow this, options