CoffeeFlow
==========

Simple and powerful coverflow JavaScript component written in CoffeeScript. [See the demo](http://droganov.github.com/Coffee-Flow/).

Bower
-----
```
bower install coffee-flow
```

Setup
-----

```html
<!-- jQuery library required. It may not work with earlier jQuery versions -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

<!-- Include EightMedia hammer.js if you want touchevents support -->
<script type="text/javascript" src="js/hammer.js"></script>

<!-- CoffeeFlow component -->
<script type="text/javascript" src="js/coffeeflow.js"></script>

<!-- HTML -->
<div class="coffeeflow">
  <a href="img/1.jpg"><img src="img/1.jpg" alt=""></a>
  <a href="img/2.jpg"><img src="img/2.jpg" alt=""></a>
  <a href="img/3.jpg"><img src="img/3.jpg" alt=""></a>
</div>

<!-- Init -->
<script>
	var coffeeFlow = new Coffeeflow(".coffeeflow", {});
	// or
	$(".coffeeflow").coffeeflow({});
</script>
```
Options
-------
Please [visit the demo page](http://droganov.github.com/Coffee-Flow/).

License
-------

© 2012 Serge Droganov under the MIT License
