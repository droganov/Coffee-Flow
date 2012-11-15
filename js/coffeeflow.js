// Generated by CoffeeScript 1.4.0
(function(){jQuery.fn.extend({coffeeflow:function(e){var t,n,r,i,s;r=jQuery;s={blur:function(e){return i("CoffeeFlow blured")},change:function(e){return i("CoffeeFlow change")},ready:function(e){return i("CoffeeFlow ready")},select:function(e){return i("CoffeeFlow select")},focus:function(e){return i("CoffeeFlow focused")},borderWidth:2,debug:!1,density:3.2,defaultItem:2,minHeight:200,selectOnChange:!1,scrollSensitivity:50};s=r.extend(s,e);i=function(e){if(s.debug)return typeof console!="undefined"&&console!==null?console.log(e):void 0};t=function(){function e(e){var t,i,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w=this;d=this;g="";o=r(e);u=s.defaultItem;m=[];i=r('<div class="coffeeflowCanvas"></div>');c=o.find("a");this.getCanvas=function(){return i};this.getData=function(){return i.data()};this.getIndex=function(){return u};this.getItem=function(e){e==null&&(e=u);return m[e]};this.getWidth=function(){return i.width()};this.hasFocus=function(){return o.is(".coffeeflowFocuse")};this.resize=function(){var e;o.height()>s.minHeight?e=o.height():e=s.minHeight;i.height(e);return t()};this.slideTo=function(e){e>=m.length&&(e=m.length-1);e<0&&(e=0);u=e;t();s.change(d);if(s.selectOnChange)return m[e].select()};t=function(){var e,t,n,r,o,a,f;f=[];for(o=0,a=m.length;o<a;o++){t=m[o];t.resize();n=i.height()/s.density;if(o===u){g="current";e=m.length+1;r=i.width()/2}else if(o<u){g="before";e=o;r=i.width()/2-n/2-(u-o)*n}else{g="after";e=m.length-o;r=i.width()/2+n/2+(o-u)*n}t.setDepth(e);t.setState(g);f.push(t.moveTo(r))}return f};a=function(){return g};h=function(e){var t;if(w.hasFocus()){e=e||event;e.wheelDelta||(e.wheelDelta=-40*e.detail);t=u+parseInt(e.wheelDelta/s.scrollSensitivity);w.slideTo(t);return e.preventDefault?e.preventDefault():e.returnValue=!1}};p=function(){i.addClass("ready");w.resize();return s.ready(d)};v=function(e){return e=e};for(y=0,b=c.length;y<b;y++){f=c[y];l=new n(f,y,d);m.push(l);l.appendTo(i)}o.append(i);this.resize();r(window).resize(function(e){return w.resize()});o.mouseover(function(e){if(!o.is(".coffeeflowFocuse")){o.addClass("coffeeflowFocuse");w.resize();s.focus(d)}return e.stopPropagation()});r("html").mouseover(function(e){if(o.is(".coffeeflowFocuse")){o.removeClass("coffeeflowFocuse");w.resize();s.blur(d);return e.stopPropagation()}});if(window.addEventListener){window.addEventListener("mousewheel",h,!1);window.addEventListener("DOMMouseScroll",h,!1)}else window.attachEvent("onmousewheel",h);setTimeout(p,10)}return e}();n=function(){function e(e,t,n){var i,o,u,a,f,l=this;f="";n=n;a=r(e).addClass("coffeeflowItem");o=a.find("img");a.css({top:s.borderWidth+"px"});o.css({"border-width":s.borderWidth+"px",margin:-s.borderWidth+"px"});o.load(function(e){return i()});a.click(function(e){e.preventDefault();return a.is(".current")?u():n.slideTo(t)});this.appendTo=function(e){return a.appendTo(e)};this.setDepth=function(e){return a.css("z-index",e)};this.setState=function(e){a.removeClass("before");a.removeClass("current");a.removeClass("after");e!=="current"&&a.removeClass("selected");a.addClass(e);f=e;return i()};this.moveTo=function(e){var t;e-=a.width()/2;t=!0;switch(f){case"before":t=e>0-a.width();break;case"after":t=e<0+n.getWidth()}t?a.show():a.hide();return a.css({left:e+"px"})};this.resize=function(){var e;e=n.getCanvas().height()-s.borderWidth*2;return a.height(e).width(e)};i=function(){switch(f){case"current":return o.css({left:(a.height()-o.width())/2+"px"});case"before":return o.css({left:0});case"after":return o.css({right:0})}};u=function(){a.addClass("selected");return s.select(n)}}return e}();return this.each(function(){return new t(this)})}})}).call(this);