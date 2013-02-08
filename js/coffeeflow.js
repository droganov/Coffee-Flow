// Generated by CoffeeScript 1.4.0
(function(){var e,t,n,r,i,s,o;s=jQuery;i=function(){var e,t,n,r,i,s;r=!1;n=document.createElement("div");t=["WebkitTransition","MozTransition","msTransition","OTransition","Transition"];for(i=0,s=t.length;i<s;i++){e=t[i];!(0+n.style[e])||(r=!0)}return r};r=i();o=function(){var e;s.browser.webkit&&(e="-webkit-");s.browser.mozilla&&(e="-moz-");s.browser.msie&&(e="-ms-");s.browser.opera&&(e="-o-");return e};e=function(){function e(e,n){var r,i,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L=this;u=s(e);S={blur:function(e){return d("CoffeeFlow blured")},change:function(e){return d("CoffeeFlow change")},error:function(e){return d("CoffeeFlow image load error")},focus:function(e){return d("CoffeeFlow focused")},ready:function(e){return d("CoffeeFlow ready")},select:function(e){return d("CoffeeFlow select")},borderWidth:0,borderColor:"rgba(255,255,255, .3)",borderColorHover:"rgba(0,175,255, .8)",borderColorSelected:"rgba(250,210,6, .8)",borderStyle:"solid",crop:!1,debug:!1,defaultItem:"auto",density:3.2,height:"auto",hideOverflow:!0,minHeight:120,pull:!0,selectOnChange:!1,transitionDuration:500,transitionEasing:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",transitionPerspective:"600px",transitionScale:.7,transitionRotation:45,width:"auto"};S=s.extend(S,u.data());S=s.extend(S,n);w=this;T="";o=0;x=[];i=s('<div class="coffeeflowCanvas"></div>');i.css({position:"relative"});S.hideOverflow&&u.css({overflow:"hidden"});p=u.find("a");S.defaultItem==="auto"?a=Math.floor(p.length/2-1):a=S.defaultItem;this.getCanvas=function(){return i};this.getHeight=function(){return i.height()};this.getIndex=function(){return a};this.getItem=function(e){e==null&&(e=a);return x[e]};this.getLength=function(){return x.length};this.getWidth=function(){return i.width()};this.hasFocus=function(){return u.is(".coffeeflowFocuse")};this.resize=function(){var e;e=u.height();S.height!=="auto"&&parseInt(S.height)&&(e=S.height);e<S.minHeight&&(e=S.minHeight);i.height(e);return r()};this.slideTo=function(e){if(e!==a){e>=x.length&&(e=x.length-1);e<0&&(e=0);a=e;r();clearTimeout(o);o=setTimeout(m,S.transitionDuration);if(S.selectOnChange)return x[e].select()}};r=function(){var e,t,n,r,s,o;n=i.width();e=i.height();o=[];for(r=0,s=x.length;r<s;r++){t=x[r];o.push(t.arrange(a,x.length,n,e))}return o};f=function(){return T};d=function(e){if(S.debug)return typeof console!="undefined"&&console!==null?console.log(e):void 0};m=function(){return S.change(w)};g=function(e){var t,n;if(L.hasFocus()){e=e||event;t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));n=a+t;L.slideTo(n);return e.preventDefault?e.preventDefault():e.returnValue=!1}};y=function(){i.addClass("ready");L.resize();return S.ready(w)};E=function(e){return e=e};for(C=0,k=p.length;C<k;C++){c=p[C];e=s(c);v={data:e.data(),link:e.attr("href"),source:e.find("img").attr("src")};e.remove();h=new t(v,C,w,S);x.push(h)}u.empty();S.enableReflections&&u.addClass("coffeeflowReflections");u.append(i);s(window).resize(function(e){return L.resize()});u.mouseover(function(e){if(!u.is(".coffeeflowFocuse")){u.addClass("coffeeflowFocuse");S.focus(w)}return e.stopPropagation()});s("html").mouseover(function(e){if(u.is(".coffeeflowFocuse")){u.removeClass("coffeeflowFocuse");S.blur(w);return e.stopPropagation()}});if(window.addEventListener){window.addEventListener("mousewheel",g,!1);window.addEventListener("DOMMouseScroll",g,!1)}else window.attachEvent("onmousewheel",g);if(typeof Hammer!="undefined"&&Hammer!==null){l=new Hammer(i[0],{prevent_default:!0,swipe_time:200,drag_vertical:!1,transform:!1,hold:!1});N=0;b=a;l.ondragstart=function(e){b=a;return N=(new Date).getTime()};l.ondrag=function(e){var t,n;t=parseInt(e.distanceX/(L.getHeight()/S.density*1.4));n=b-t;L.slideTo(n);return!1};l.onswipe=function(e){var t,n,r;n=e.originalEvent.timeStamp-N;t=Math.floor(e.distance/(n/S.density*2));r=a;switch(e.direction){case"left":r+=t;break;case"right":r-=t}L.slideTo(r);return!1}}setTimeout(y,10)}typeof window!="undefined"&&window!==null&&(window.Coffeeflow=e);jQuery.fn.extend({coffeeflow:function(t){return this.each(function(){return new e(this,t)})}});return e}();t=function(){function e(e,t,i,u){var a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M;t=t;i=i;C=this;v=e.data;w=e.link;L=e.source;A=b=f=y=M=m=h=p=x=T=l=0;O=!0;this.arrange=function(e,n,r,i){var s,o,l,c,v;c=C.getWidth();o=C.getHeight();l=c/u.density;if(t===e){A="current";m=n+1;v=r/2;O=!0}else if(t<e){A="before";m=t;v=r/2-l-(e-t)*l;s=0-c;O=v>s}else{A="after";m=n-t;v=r/2+l+(t-e)*l;s=r+c;O=v<s}O&&!h&&N(v);if(h){f.width(c).height(o).css({left:""+(0-c/2)+"px"});b.removeClass("coffeeflowItem_before");b.removeClass("coffeeflowItem_current");b.removeClass("coffeeflowItem_after");A!=="current"&&b.removeClass("coffeeflowItem_selected");b.addClass("coffeeflowItem_"+A);b.css("z-index",m);d();a(v);p=setTimeout(S,u.transitionDuration)}return M=v};this.getData=function(){return v};this.getLink=function(){return w};this.getSource=function(){return L};this.getHeight=function(){return u.height==="auto"?i.getHeight():u.height};this.getWidth=function(){return u.width==="auto"?C.getHeight():u.width};this.select=function(){b.addClass("coffeeflowItem_selected");u.crop?f.css({borderColor:u.borderColorSelected}):y.css({borderColor:u.borderColorSelected});return u.select(i)};this.setContent=function(e){return f.append(e)};a=function(e){var t;e==null&&(e=M);if(r){b.css(o()+"transform","translate("+e+"px)");b.css({zIndex:m});k();t=y;u.crop&&(t=f);return b.is(".coffeeflowItem_selected")?t.css({borderColor:u.borderColorSelected}):t.css({borderColor:u.borderColor})}b.css({zIndex:m});return b.animate({left:e},"fast")};c=function(){E();return h=!0};d=function(e){var t,n,r,i,s,o,a,c,h,p;e==null&&(e=T);T=e;if(T){h=y.width();n=y.height();p=C.getWidth();r=C.getHeight();l||(l=h/n);c=p/r;t=u.borderWidth*2;if(u.crop){if(l>c){a=Math.round(r*l);s=r;i=0;o=Math.round(0-(a-p)/2)}else{a=p;s=Math.round(p/l);i=Math.round(0-(s-r)/2);o=0}a-=t;s-=t;y.css({borderWidth:0,maxWidth:"none",maxHeight:"none",transition:"none",left:o+"px",width:a+"px",height:s+"px",bottom:i+"px"});return f.css({borderWidth:u.borderWidth,borderStyle:u.borderStyle,height:r-t,width:p-t,overflow:"hidden"})}if(l>c){a=p;s=Math.round(p/l)}else{a=Math.round(r*l);s=r}a-=t;s-=t;return y.css({maxWidth:"none",maxHeight:"none",width:a+"px",height:s+"px"})}};g=function(){s(b).remove();return h=T=l=0};E=function(){x.setState("loading");return y.attr({src:L})};S=function(){if(h&&!O)return g()};N=function(e){var l=this;if(!h){b=s("<div class='coffeeflowItem'></div>");f=s("<a href='"+L+"' />");y=s("<img />");y.load(function(e){var t;b.addClass("coffeeflowItem_ready");f.width(C.getWidth()).height(C.getHeight());f.css({transition:""+o()+"transform "+u.transitionDuration/1e3+"s "+u.transitionEasing});y.css({borderWidth:u.borderWidth,borderColor:u.borderColor,borderStyle:u.borderStyle,bottom:0,maxWidth:"100%",maxHeight:"100%",position:"absolute",transition:"transform "+u.transitionDuration/1e3+"s "+u.transitionEasing});x.detach();C.setContent(y);t=y;u.crop&&(t=f);d(!0);a(M);y.mouseover(function(e){b.is(".coffeeflowItem_selected")?t.css({borderColor:u.borderColorSelected}):t.css({borderColor:u.borderColorHover});if(u.pull)return k(!0)});return y.mouseout(function(e){b.is(".coffeeflowItem_selected")?t.css({borderColor:u.borderColorSelected}):t.css({borderColor:u.borderColor});if(u.pull)return k(!1)})});y.error(function(e){x.setState("error");return u.error(i)});f.click(function(e){b.is(".coffeeflowItem_current")?C.select():i.slideTo(t);return e.preventDefault()});b.css({background:"none",width:0,height:0,position:"absolute",left:0});if(r){b.css(o()+"transition",""+o()+"transform "+u.transitionDuration/1e3+"s "+u.transitionEasing);b.css(o()+"transform","translate("+M+"px)")}else b.css({left:M+"px"});f.css({marginLeft:"-50%",width:C.getWidth(),height:C.getHeight(),left:"-50%",top:0,position:"absolute"});f.css(o()+"transition",""+o()+"transform "+u.transitionDuration/1e3+"s "+u.transitionEasing);b.appendTo(i.getCanvas());b.append(f);x=new n(C,u);return c()}};k=function(e){var t,n,r;e==null&&(e=!1);r=0;e&&(r=C.getWidth()/4);switch(A){case"before":n="perspective("+u.transitionPerspective+") scale("+u.transitionScale+") rotateY("+u.transitionRotation+"deg) translate(-"+r+"px)";s.browser.opera&&(n="scale("+u.transitionScale+") skew(0deg, -20deg)");t=0;break;case"after":n="perspective("+u.transitionPerspective+") scale("+u.transitionScale+") rotateY(-"+u.transitionRotation+"deg) translate("+r+"px)";s.browser.opera&&(n="scale("+u.transitionScale+") skew(0deg, 20deg)");t=f.width()-(y.width()+u.borderWidth*2);break;case"current":n="perspective("+u.transitionPerspective+") scale(1) rotateY(0deg)";s.browser.opera&&(n="scale(1)");t=(f.width()-y.width())/2}f.css(o()+"transform",n);if(!u.crop)return y.css(o()+"transform","translate("+t+"px)")}}return e}();n=function(){function e(e,t){var n,r,i;e=e;n="#F0F0F0";r=t.borderWidth*2;i=s("<div/>").css({background:n,borderWidth:t.borderWidth,borderColor:t.borderColor,borderStyle:t.borderStyle,width:e.getWidth()-r,height:e.getHeight()-r,overflow:"hidden",position:"relative"});e.setContent(i);this.detach=function(){i.remove();return i=0};this.setState=function(e){var t,n;switch(e){case"loading":t='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve"><rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/><g>	<g opacity="0.5">		<g><path fill="#FFFFFF" d="M40.047,36.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96				c0,0,0,0.36,0,4.249C47.031,30.974,40.047,34.214,40.047,36.951z M41.561,31.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C37.887,34.791,39.688,33.422,41.561,31.55z M29.174,24.134				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C29.678,23.125,28.527,23.702,29.174,24.134z"/>		</g>	</g>	<g>		<g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="35.9507" y1="17.9497" x2="35.9507" y2="53.9526">				<stop  offset="0" style="stop-color:#4D4D4D"/>				<stop  offset="0.3078" style="stop-color:#454545"/>				<stop  offset="0.7719" style="stop-color:#313131"/>				<stop  offset="1" style="stop-color:#242424"/></linearGradient><path fill="url(#SVGID_1_)" d="M39.047,35.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96				c0,0,0,0.36,0,4.249C46.031,29.974,39.047,33.214,39.047,35.951z M40.561,30.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C36.887,33.791,38.688,32.422,40.561,30.55z M28.174,23.134				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C28.678,22.125,27.527,22.702,28.174,23.134z"/>		</g></g></g></svg>';break;default:t='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve"><rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/><g>	<g opacity="0.5">		<g>			<path fill="#FFFFFF" d="M26.501,43.627c-1.343-2.053-2.107-4.535-2.107-7.126c0-7.272,5.833-13.177,13.105-13.177				c2.656,0,5.106,0.768,7.188,2.117l0.165-0.165c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177				c0,3.097,1.08,6.048,2.952,8.281L26.501,43.627z"/>			<path fill="#FFFFFF" d="M47.554,28.318c-0.26-0.406-0.532-0.801-0.83-1.17L28.219,45.654c0.365,0.307,0.754,0.584,1.153,0.846				L47.554,28.318z"/>			<path fill="#FFFFFF" d="M49.207,23.792c2.833,3.076,4.573,7.176,4.573,11.708c0,9.505-7.704,17.283-17.281,17.283				c-4.499,0-8.598-1.758-11.681-4.602c3.163,3.432,7.675,5.602,12.681,5.602c9.577,0,17.281-7.777,17.281-17.283				C54.78,31.457,52.63,26.946,49.207,23.792z"/>		</g>	</g>	<g>		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="36.4985" y1="18.2192" x2="36.4985" y2="52.7837">			<stop  offset="0" style="stop-color:#4D4D4D"/>			<stop  offset="0.3078" style="stop-color:#454545"/>			<stop  offset="0.7719" style="stop-color:#313131"/>			<stop  offset="1" style="stop-color:#242424"/>		</linearGradient>		<path fill="url(#SVGID_1_)" d="M53.78,35.5c0,9.505-7.704,17.283-17.281,17.283c-9.505,0-17.281-7.777-17.281-17.283			c0-9.576,7.776-17.281,17.281-17.281C46.076,18.219,53.78,25.924,53.78,35.5z M26.346,43.781l18.506-18.505			c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177C23.394,38.598,24.474,41.549,26.346,43.781z			 M49.676,35.5c0-3.168-1.151-6.12-2.952-8.353L28.219,45.654c2.231,1.871,5.112,2.951,8.28,2.951			C43.771,48.605,49.676,42.701,49.676,35.5z"/>	</g></g></svg>'}n=s("<div/>").css({position:"relative",top:"50%",width:"100%",height:"73px",marginTop:"-37px",textAlign:"center"});n.html(t);return i.empty().html(n)}}return e}()}).call(this);