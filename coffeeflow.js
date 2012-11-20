// Generated by CoffeeScript 1.4.0
(function(){var e,t,n,r,i,s,o,u,a,f;o=jQuery;u=function(e){if(f.debug)return typeof console!="undefined"&&console!==null?console.log(e):void 0};f={};i={blur:function(e){return u("CoffeeFlow blured")},change:function(e){return u("CoffeeFlow change")},ready:function(e){return u("CoffeeFlow ready")},select:function(e){return u("CoffeeFlow select")},focus:function(e){return u("CoffeeFlow focused")},borderWidth:1,debug:!1,density:3.2,defaultItem:2,enableReflections:!1,minHeight:200,selectOnChange:!1,transitionDuration:600,transitionEasing:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",transitionPerspective:"600px",transitionScale:.7,transitionRotation:45};s=function(){var e,t,n,r,i,s;r=!1;n=document.createElement("div");t=["WebkitTransition","MozTransition","msTransition","OTransition","Transition"];for(i=0,s=t.length;i<s;i++){e=t[i];!(0+n.style[e])||(r=!0)}return r};r=s();a=function(){var e;o.browser.webkit&&(e="-webkit-");o.browser.mozilla&&(e="-moz-");o.browser.msie&&(e="-ms-");o.browser.opera&&(e="-o-");return e};e=function(){function e(e,n){var r,s,a,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k=this;l=o(e);f=o.extend(i,l.data());f=o.extend(f,n);w=this;x="";a=0;c=f.defaultItem;S=[];s=o('<div class="coffeeflowCanvas"></div>');s.css({position:"relative"});m=l.find("a");u(m.length);this.getCanvas=function(){return s};this.getData=function(){return s.data()};this.getHeight=function(){return s.height()};this.getIndex=function(){return c};this.getItem=function(e){e==null&&(e=c);return S[e]};this.getWidth=function(){return s.width()};this.hasFocus=function(){return l.is(".coffeeflowFocuse")};this.resize=function(){var e;l.height()>f.minHeight?e=l.height():e=f.minHeight;s.height(e);return r()};this.slideTo=function(e){if(e!==c){e>=S.length&&(e=S.length-1);e<0&&(e=0);c=e;r();clearTimeout(a);a=setTimeout(g,f.transitionDuration);if(f.selectOnChange)return S[e].select()}};r=function(){var e,t,n,r,i,o;n=s.width();e=s.height();o=[];for(r=0,i=S.length;r<i;r++){t=S[r];o.push(t.arrange(c,S.length,n,e))}return o};h=function(){return x};g=function(){return f.change(w)};y=function(e){var t,n;if(k.hasFocus()){e=e||event;t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));n=c+t;k.slideTo(n);return e.preventDefault?e.preventDefault():e.returnValue=!1}};b=function(){s.addClass("ready");k.resize();return f.ready(w)};E=function(e){return e=e};for(N=0,C=m.length;N<C;N++){d=m[N];v=new t(d,N,w);S.push(v)}f.enableReflections&&l.addClass("coffeeflowReflections");l.append(s);this.resize();o(window).resize(function(e){return k.resize()});l.mouseover(function(e){if(!l.is(".coffeeflowFocuse")){l.addClass("coffeeflowFocuse");k.resize();f.focus(w)}return e.stopPropagation()});o("html").mouseover(function(e){if(l.is(".coffeeflowFocuse")){l.removeClass("coffeeflowFocuse");k.resize();f.blur(w);return e.stopPropagation()}});if(window.addEventListener){window.addEventListener("mousewheel",y,!1);window.addEventListener("DOMMouseScroll",y,!1)}else window.attachEvent("onmousewheel",y);if(typeof Hammer!="undefined"&&Hammer!==null){p=new Hammer(s[0],{prevent_default:!0,swipe_time:5e3,drag_min_distance:50,drag_vertical:!1,transform:!1,hold:!1});T=0;p.ondragstart=function(e){return T=(new Date).getTime()};p.onswipe=function(e){var t,n,r;n=e.originalEvent.timeStamp-T;t=Math.ceil(e.distance/n);r=c;switch(e.direction){case"left":r+=t;break;case"right":r-=t}return k.slideTo(r)}}setTimeout(b,10)}typeof window!="undefined"&&window!==null&&(window.Coffeeflow=e);return e}();t=function(){function e(e,t,i){var s,u,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A;e=o(e);t=t;i=i;T=this;p=o.data(e);y=e.attr("href");C=e.find("img").attr("src");k=g=u=m=A=d=N=c=h=E=0;L=!0;e.remove();this.arrange=function(e,n,r,i){var o,a,l;N=i;a=N/f.density;if(t===e){k="current";d=n+1;l=r/2;L=!0}else if(t<e){k="before";d=t;l=r/2-a-(e-t)*a;o=0-N;L=l>o}else{k="after";d=n-t;l=r/2+a+(t-e)*a;o=r+N/2;L=l<o}L&&!c&&S(l);if(c){u.width(N).height(N).css({left:""+(0-N/2)+"px"});g.removeClass("coffeeflowItem_before");g.removeClass("coffeeflowItem_current");g.removeClass("coffeeflowItem_after");k!=="current"&&g.removeClass("coffeeflowItem_selected");g.addClass("coffeeflowItem_"+k);g.css("z-index",d);s(l);h=setTimeout(w,f.transitionDuration)}return A=l};this.setContent=function(e){return u.append(e)};s=function(e){var t;if(r){g.css({transform:"translate("+e+"px)","z-index":d});switch(k){case"before":t="perspective("+f.transitionPerspective+") scale("+f.transitionScale+") rotateY("+f.transitionRotation+"deg)";o.browser.opera&&(t="scale("+f.transitionScale+") skew(0deg, 20deg)");m.css({left:0});break;case"after":u.css({transform:"perspective("+f.transitionPerspective+") scale("+f.transitionScale+") rotateY(-"+f.transitionRotation+"deg)"});o.browser.opera&&(t="scale("+f.transitionScale+") skew(0deg, 20deg)");m.css({right:0});break;case"current":u.css({transform:"perspective("+f.transitionPerspective+") scale(1) rotateY(0deg)"});o.browser.opera&&(t="scale(1)");m.css({left:(u.width()-m.width())/2})}return u.css({transform:t})}g.css({"z-index":d});return g.animate({left:e},"fast")};l=function(){b();return c=!0};v=function(){o(g).remove();return c=!1};b=function(){E.setState("loading");return m.attr({src:C})};w=function(){if(c&&!L)return v()};S=function(e){var h,p=this;if(!c){g=o("<div class='coffeeflowItem'></div>");u=o("<a href='"+C+"' />");m=o("<img />");m.load(function(e){g.addClass("coffeeflowItem_ready");u.width(N).height(N);u.css({transition:""+a()+"transform "+f.transitionDuration/1e3+"s "+f.transitionEasing});m.css({transition:""+f.transitionDuration/1e3+"s "+f.transitionEasing});E.detach();T.setContent(m);return s(A)});m.error(function(e){return E.setState("error")});if(typeof Hammer!="undefined"&&Hammer!==null){h=new Hammer(u[0],{prevent_default:!1,drag:!1,swipe:!1,transform:!1,tap_double:!1,hold:!1});h.ontap=function(e){g.is(".current")?x():i.slideTo(t);return!1}}else u.click(function(e){return g.is(".current")?x():i.slideTo(t)});u.click(function(e){return e.preventDefault()});g.css({background:"none",width:0,height:0,position:"absolute"});r?g.css({transition:""+a()+"transform "+f.transitionDuration/1e3+"s "+f.transitionEasing,transform:"translate("+A+"px)"}):g.css({left:A+"px"});u.css({"margin-left":"-50%",width:N,height:N,left:0,top:0,position:"absolute"});g.appendTo(i.getCanvas());g.append(u);E=new n(T);return l()}};x=function(){g.addClass("coffeeflowItem_selected");return f.select(i)}}return e}();n=function(){function e(e){var t,n;e=e;t="#F0F0F0";n=o("<div/>").css({background:t,border:"1px solid #9E9E9E",margin:"-1px",width:"100%",height:"100%",overflow:"hidden",position:"relative"});e.setContent(n);this.detach=function(){n.remove();return n=0};this.setState=function(e){var t,r;switch(e){case"loading":t='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve"><rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/><g>	<g opacity="0.5">		<g><path fill="#FFFFFF" d="M40.047,36.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96				c0,0,0,0.36,0,4.249C47.031,30.974,40.047,34.214,40.047,36.951z M41.561,31.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C37.887,34.791,39.688,33.422,41.561,31.55z M29.174,24.134				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C29.678,23.125,28.527,23.702,29.174,24.134z"/>		</g>	</g>	<g>		<g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="35.9507" y1="17.9497" x2="35.9507" y2="53.9526">				<stop  offset="0" style="stop-color:#4D4D4D"/>				<stop  offset="0.3078" style="stop-color:#454545"/>				<stop  offset="0.7719" style="stop-color:#313131"/>				<stop  offset="1" style="stop-color:#242424"/></linearGradient><path fill="url(#SVGID_1_)" d="M39.047,35.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96				c0,0,0,0.36,0,4.249C46.031,29.974,39.047,33.214,39.047,35.951z M40.561,30.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C36.887,33.791,38.688,32.422,40.561,30.55z M28.174,23.134				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C28.678,22.125,27.527,22.702,28.174,23.134z"/>		</g></g></g></svg>';break;default:t='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve"><rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/><g>	<g opacity="0.5">		<g>			<path fill="#FFFFFF" d="M26.501,43.627c-1.343-2.053-2.107-4.535-2.107-7.126c0-7.272,5.833-13.177,13.105-13.177				c2.656,0,5.106,0.768,7.188,2.117l0.165-0.165c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177				c0,3.097,1.08,6.048,2.952,8.281L26.501,43.627z"/>			<path fill="#FFFFFF" d="M47.554,28.318c-0.26-0.406-0.532-0.801-0.83-1.17L28.219,45.654c0.365,0.307,0.754,0.584,1.153,0.846				L47.554,28.318z"/>			<path fill="#FFFFFF" d="M49.207,23.792c2.833,3.076,4.573,7.176,4.573,11.708c0,9.505-7.704,17.283-17.281,17.283				c-4.499,0-8.598-1.758-11.681-4.602c3.163,3.432,7.675,5.602,12.681,5.602c9.577,0,17.281-7.777,17.281-17.283				C54.78,31.457,52.63,26.946,49.207,23.792z"/>		</g>	</g>	<g>		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="36.4985" y1="18.2192" x2="36.4985" y2="52.7837">			<stop  offset="0" style="stop-color:#4D4D4D"/>			<stop  offset="0.3078" style="stop-color:#454545"/>			<stop  offset="0.7719" style="stop-color:#313131"/>			<stop  offset="1" style="stop-color:#242424"/>		</linearGradient>		<path fill="url(#SVGID_1_)" d="M53.78,35.5c0,9.505-7.704,17.283-17.281,17.283c-9.505,0-17.281-7.777-17.281-17.283			c0-9.576,7.776-17.281,17.281-17.281C46.076,18.219,53.78,25.924,53.78,35.5z M26.346,43.781l18.506-18.505			c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177C23.394,38.598,24.474,41.549,26.346,43.781z			 M49.676,35.5c0-3.168-1.151-6.12-2.952-8.353L28.219,45.654c2.231,1.871,5.112,2.951,8.28,2.951			C43.771,48.605,49.676,42.701,49.676,35.5z"/>	</g></g></svg>'}r=o("<div/>").css({position:"relative",top:"50%",width:"100%",height:"73px","margin-top":"-37px","text-align":"center"});r.html(t);return n.empty().html(r)}}return e}()}).call(this);