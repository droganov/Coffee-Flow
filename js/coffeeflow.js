// Generated by CoffeeScript 1.4.0
(function() {
  var Coffeeflow, CoffeeflowItem, Preloader, compatible, isCompatible, j, prefix;

  j = jQuery;

  isCompatible = function() {
    var i, props1, rat, test1, _i, _len;
    test1 = false;
    rat = document.createElement('div');
    props1 = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition'];
    for (_i = 0, _len = props1.length; _i < _len; _i++) {
      i = props1[_i];
      if (!!(0 + rat.style[i])) {
        test1 = true;
      }
    }
    return test1;
  };

  compatible = isCompatible();

  prefix = function() {
    var r;
    if (j.browser.webkit) {
      r = "-webkit-";
    }
    if (j.browser.mozilla) {
      r = "-moz-";
    }
    if (j.browser.msie) {
      r = "-ms-";
    }
    if (j.browser.opera) {
      r = "-o-";
    }
    return r;
  };

  Coffeeflow = (function() {

    if (typeof window !== "undefined" && window !== null) {
      window.Coffeeflow = Coffeeflow;
    }

    function Coffeeflow(el, options) {
      var arrange, canvas, changeTimeout, container, currentItem, getState, hammer, i, item, items, log, onChange, onMouseWheel, ready, sItem, self, setState, settings, stack, state, ts, _i, _len,
        _this = this;
      container = j(el);
      settings = {
        blur: function(e) {
          return log("CoffeeFlow blured");
        },
        change: function(e) {
          return log("CoffeeFlow change");
        },
        error: function(e) {
          return log("CoffeeFlow image load error");
        },
        focus: function(e) {
          return log("CoffeeFlow focused");
        },
        ready: function(e) {
          return log("CoffeeFlow ready");
        },
        select: function(e) {
          return log("CoffeeFlow select");
        },
        borderWidth: 0,
        borderColor: "rgba(255,255,255, .3)",
        borderColorHover: "rgba(0,175,255, .8)",
        borderColorSelected: "rgba(250,210,6, .8)",
        borderStyle: "solid",
        crop: false,
        debug: false,
        defaultItem: "auto",
        density: 3.2,
        height: "auto",
        hideOverflow: true,
        minHeight: 120,
        pull: true,
        selectOnChange: false,
        transitionDuration: 500,
        transitionEasing: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
        transitionPerspective: "600px",
        transitionScale: .70,
        transitionRotation: 45,
        width: "auto"
      };
      settings = j.extend(settings, container.data());
      settings = j.extend(settings, options);
      self = this;
      state = "";
      changeTimeout = 0;
      stack = [];
      canvas = j('<div class="coffeeflowCanvas"></div>');
      canvas.css({
        position: "relative"
      });
      if (settings.hideOverflow) {
        container.css({
          overflow: "hidden"
        });
      }
      items = container.find("a");
      if (settings.defaultItem === "auto") {
        currentItem = Math.floor(items.length / 2 - 1);
      } else {
        currentItem = settings.defaultItem;
      }
      this.getCanvas = function() {
        return canvas;
      };
      this.getHeight = function() {
        return canvas.height();
      };
      this.getIndex = function() {
        return currentItem;
      };
      this.getItem = function(i) {
        if (i == null) {
          i = currentItem;
        }
        return stack[i];
      };
      this.getWidth = function() {
        return canvas.width();
      };
      this.hasFocus = function() {
        return container.is(".coffeeflowFocuse");
      };
      this.resize = function() {
        var height;
        height = container.height();
        if (settings.height !== "auto" && parseInt(settings.height)) {
          height = settings.height;
        }
        if (height < settings.minHeight) {
          height = settings.minHeight;
        }
        canvas.height(height);
        return arrange();
      };
      this.slideTo = function(i) {
        if (i !== currentItem) {
          if (i >= stack.length) {
            i = stack.length - 1;
          }
          if (i < 0) {
            i = 0;
          }
          currentItem = i;
          arrange();
          clearTimeout(changeTimeout);
          changeTimeout = setTimeout(onChange, settings.transitionDuration);
          if (settings.selectOnChange) {
            return stack[i].select();
          }
        }
      };
      arrange = function() {
        var h, i, w, _i, _len, _results;
        w = canvas.width();
        h = canvas.height();
        _results = [];
        for (_i = 0, _len = stack.length; _i < _len; _i++) {
          i = stack[_i];
          _results.push(i.arrange(currentItem, stack.length, w, h));
        }
        return _results;
      };
      getState = function() {
        return state;
      };
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      onChange = function() {
        return settings.change(self);
      };
      onMouseWheel = function(e) {
        var delta, i;
        if (_this.hasFocus()) {
          e = e || event;
          delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
          i = currentItem + delta;
          _this.slideTo(i);
          if (e.preventDefault) {
            return e.preventDefault();
          } else {
            return e.returnValue = false;
          }
        }
      };
      ready = function() {
        canvas.addClass("ready");
        _this.resize();
        return settings.ready(self);
      };
      setState = function(state) {
        return state = state;
      };
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        i = items[_i];
        item = new CoffeeflowItem(i, _i, self, settings);
        stack.push(item);
      }
      container.empty();
      if (settings.enableReflections) {
        container.addClass("coffeeflowReflections");
      }
      container.append(canvas);
      j(window).resize(function(e) {
        return _this.resize();
      });
      container.mouseover(function(e) {
        if (!container.is(".coffeeflowFocuse")) {
          container.addClass("coffeeflowFocuse");
          settings.focus(self);
        }
        return e.stopPropagation();
      });
      j("html").mouseover(function(e) {
        if (container.is(".coffeeflowFocuse")) {
          container.removeClass("coffeeflowFocuse");
          settings.blur(self);
          return e.stopPropagation();
        }
      });
      if (window.addEventListener) {
        window.addEventListener("mousewheel", onMouseWheel, false);
        window.addEventListener("DOMMouseScroll", onMouseWheel, false);
      } else {
        window.attachEvent("onmousewheel", onMouseWheel);
      }
      if (typeof Hammer !== "undefined" && Hammer !== null) {
        hammer = new Hammer(canvas[0], {
          prevent_default: true,
          swipe_time: 200,
          drag_vertical: false,
          transform: false,
          hold: false
        });
        ts = 0;
        sItem = currentItem;
        hammer.ondragstart = function(e) {
          sItem = currentItem;
          return ts = new Date().getTime();
        };
        hammer.ondrag = function(e) {
          var offset, pos;
          offset = parseInt(e.distanceX / (_this.getHeight() / settings.density * 1.4));
          pos = sItem - offset;
          return _this.slideTo(pos);
        };
        hammer.onswipe = function(e) {
          var impulse, period, pos;
          period = e.originalEvent.timeStamp - ts;
          impulse = Math.floor(e.distance / (period / settings.density * 2));
          pos = currentItem;
          switch (e.direction) {
            case "left":
              pos = pos + impulse;
              break;
            case "right":
              pos = pos - impulse;
          }
          return _this.slideTo(pos);
        };
      }
      setTimeout(ready, 10);
    }

    return Coffeeflow;

  })();

  CoffeeflowItem = (function() {

    function CoffeeflowItem(el, i, p, settings) {
      var align, anchor, aspect, attach, attached, completeTimeout, crop, data, depth, detach, img, item, link, load, onComplete, preloader, ready, render, self, setTransform, source, state, visible, xPos;
      el = j(el);
      i = i;
      p = p;
      self = this;
      data = j.data(el);
      link = el.attr("href");
      source = el.find("img").attr("src");
      state = item = anchor = img = xPos = depth = attached = completeTimeout = preloader = ready = aspect = 0;
      visible = true;
      el.remove();
      this.arrange = function(currentItem, totalItems, canvasWidth, canwasHeight) {
        var c, height, margin, width, x;
        width = self.getWidth();
        height = self.getHeight();
        margin = width / settings.density;
        if (i === currentItem) {
          state = "current";
          depth = totalItems + 1;
          x = canvasWidth / 2;
          visible = true;
        } else if (i < currentItem) {
          state = "before";
          depth = i;
          x = (canvasWidth / 2) - margin - ((currentItem - i) * margin);
          c = 0 - width;
          visible = x > c;
        } else {
          state = "after";
          depth = totalItems - i;
          x = (canvasWidth / 2) + margin + ((i - currentItem) * margin);
          c = canvasWidth + width;
          visible = x < c;
        }
        if (visible && !attached) {
          render(x);
        }
        if (attached) {
          anchor.width(width).height(height).css({
            left: "" + (0 - width / 2) + "px"
          });
          item.removeClass("coffeeflowItem_before");
          item.removeClass("coffeeflowItem_current");
          item.removeClass("coffeeflowItem_after");
          if (state !== "current") {
            item.removeClass("coffeeflowItem_selected");
          }
          item.addClass("coffeeflowItem_" + state);
          item.css("z-index", depth);
          crop();
          align(x);
          completeTimeout = setTimeout(onComplete, settings.transitionDuration);
        }
        return xPos = x;
      };
      this.getData = function() {
        return data;
      };
      this.getLink = function() {
        return link;
      };
      this.getSource = function() {
        return source;
      };
      this.getHeight = function() {
        if (settings.height === "auto") {
          return p.getHeight();
        } else {
          return settings.height;
        }
      };
      this.getWidth = function() {
        if (settings.width === "auto") {
          return self.getHeight();
        } else {
          return settings.width;
        }
      };
      this.select = function() {
        item.addClass("coffeeflowItem_selected");
        if (settings.crop) {
          anchor.css({
            borderColor: settings.borderColorSelected
          });
        } else {
          img.css({
            borderColor: settings.borderColorSelected
          });
        }
        return settings.select(p);
      };
      this.setContent = function(content) {
        return anchor.append(content);
      };
      align = function(x) {
        var bTarget;
        if (x == null) {
          x = xPos;
        }
        if (compatible) {
          item.css({
            "transform": "translate(" + x + "px)",
            "z-index": depth
          });
          setTransform();
          bTarget = img;
          if (settings.crop) {
            bTarget = anchor;
          }
          if (item.is(".coffeeflowItem_selected")) {
            return bTarget.css({
              borderColor: settings.borderColorSelected
            });
          } else {
            return bTarget.css({
              borderColor: settings.borderColor
            });
          }
        } else {
          item.css({
            "z-index": depth
          });
          return item.animate({
            left: x
          }, "fast");
        }
      };
      attach = function() {
        load();
        return attached = true;
      };
      crop = function(r) {
        var b2, h, height, iBottom, iHeight, iLeft, iWidth, parentAspect, w, width;
        if (r == null) {
          r = ready;
        }
        ready = r;
        if (ready) {
          w = img.width();
          h = img.height();
          width = self.getWidth();
          height = self.getHeight();
          if (!aspect) {
            aspect = w / h;
          }
          parentAspect = width / height;
          b2 = settings.borderWidth * 2;
          if (settings.crop) {
            if (aspect > parentAspect) {
              iWidth = Math.round(height * aspect);
              iHeight = height;
              iBottom = 0;
              iLeft = Math.round(0 - ((iWidth - width) / 2));
            } else {
              iWidth = width;
              iHeight = Math.round(width / aspect);
              iBottom = Math.round(0 - ((iHeight - height) / 2));
              iLeft = 0;
            }
            iWidth = iWidth - b2;
            iHeight = iHeight - b2;
            img.css({
              borderWidth: 0,
              maxWidth: "none",
              maxHeight: "none",
              transition: "none",
              left: iLeft + "px",
              width: iWidth + "px",
              height: iHeight + "px",
              bottom: iBottom + "px"
            });
            return anchor.css({
              borderWidth: settings.borderWidth,
              borderStyle: settings.borderStyle,
              height: height - b2,
              width: width - b2,
              overflow: "hidden"
            });
          } else {
            if (aspect > parentAspect) {
              iWidth = width;
              iHeight = Math.round(width / aspect);
            } else {
              iWidth = Math.round(height * aspect);
              iHeight = height;
            }
            iWidth = iWidth - b2;
            iHeight = iHeight - b2;
            return img.css({
              maxWidth: "none",
              maxHeight: "none",
              width: iWidth + "px",
              height: iHeight + "px"
            });
          }
        }
      };
      detach = function() {
        j(item).remove();
        return attached = ready = aspect = 0;
      };
      load = function() {
        preloader.setState("loading");
        return img.attr({
          "src": source
        });
      };
      onComplete = function() {
        if (attached && !visible) {
          return detach();
        }
      };
      render = function(x) {
        var hammer,
          _this = this;
        if (!attached) {
          item = j("<div class='coffeeflowItem'></div>");
          anchor = j("<a href='" + source + "' />");
          img = j('<img />');
          img.load(function(e) {
            var bTarget;
            item.addClass("coffeeflowItem_ready");
            anchor.width(self.getWidth()).height(self.getHeight());
            anchor.css({
              "transition": "" + (prefix()) + "transform " + (settings.transitionDuration / 1000) + "s " + settings.transitionEasing
            });
            img.css({
              borderWidth: settings.borderWidth,
              borderColor: settings.borderColor,
              borderStyle: settings.borderStyle,
              bottom: 0,
              maxWidth: "100%",
              maxHeight: "100%",
              position: "absolute",
              "transition": "transform " + (settings.transitionDuration / 1000) + "s " + settings.transitionEasing
            });
            preloader.detach();
            self.setContent(img);
            bTarget = img;
            if (settings.crop) {
              bTarget = anchor;
            }
            crop(true);
            align(xPos);
            img.mouseover(function(e) {
              if (item.is(".coffeeflowItem_selected")) {
                bTarget.css({
                  borderColor: settings.borderColorSelected
                });
              } else {
                bTarget.css({
                  borderColor: settings.borderColorHover
                });
              }
              if (settings.pull) {
                return setTransform(true);
              }
            });
            return img.mouseout(function(e) {
              if (item.is(".coffeeflowItem_selected")) {
                bTarget.css({
                  borderColor: settings.borderColorSelected
                });
              } else {
                bTarget.css({
                  borderColor: settings.borderColor
                });
              }
              if (settings.pull) {
                return setTransform(false);
              }
            });
          });
          img.error(function(e) {
            preloader.setState("error");
            return settings.error(p);
          });
          if (typeof Hammer !== "undefined" && Hammer !== null) {
            hammer = new Hammer(anchor[0], {
              prevent_default: false,
              drag: false,
              swipe: false,
              transform: false,
              tap_double: false,
              hold: false
            });
            hammer.ontap = function(e) {
              if (item.is(".coffeeflowItem_current")) {
                self.select();
              } else {
                p.slideTo(i);
              }
              return false;
            };
          } else {
            anchor.click(function(e) {
              if (item.is(".coffeeflowItem_current")) {
                return self.select();
              } else {
                return p.slideTo(i);
              }
            });
          }
          anchor.click(function(e) {
            return e.preventDefault();
          });
          item.css({
            background: "none",
            width: 0,
            height: 0,
            position: "absolute",
            left: 0
          });
          if (compatible) {
            item.css({
              transition: "" + (prefix()) + "transform " + (settings.transitionDuration / 1000) + "s " + settings.transitionEasing,
              transform: "translate(" + xPos + "px)"
            });
          } else {
            item.css({
              left: xPos + "px"
            });
          }
          anchor.css({
            marginLeft: "-50%",
            width: self.getWidth(),
            height: self.getHeight(),
            left: "-50%",
            top: 0,
            position: "absolute",
            transition: "" + (prefix()) + "transform " + (settings.transitionDuration / 1000) + "s " + settings.transitionEasing
          });
          item.appendTo(p.getCanvas());
          item.append(anchor);
          preloader = new Preloader(self, settings);
          return attach();
        }
      };
      setTransform = function(mouseover) {
        var iX, transform, translate;
        if (mouseover == null) {
          mouseover = false;
        }
        translate = 0;
        if (mouseover) {
          translate = self.getWidth() / 4;
        }
        switch (state) {
          case "before":
            transform = "perspective(" + settings.transitionPerspective + ") scale(" + settings.transitionScale + ") rotateY(" + settings.transitionRotation + "deg) translate(-" + translate + "px)";
            if (j.browser.opera) {
              transform = "scale(" + settings.transitionScale + ") skew(0deg, -20deg)";
            }
            iX = 0;
            break;
          case "after":
            transform = "perspective(" + settings.transitionPerspective + ") scale(" + settings.transitionScale + ") rotateY(-" + settings.transitionRotation + "deg) translate(" + translate + "px)";
            if (j.browser.opera) {
              transform = "scale(" + settings.transitionScale + ") skew(0deg, 20deg)";
            }
            iX = anchor.width() - img.width();
            break;
          case "current":
            transform = "perspective(" + settings.transitionPerspective + ") scale(1) rotateY(0deg)";
            if (j.browser.opera) {
              transform = "scale(1)";
            }
            iX = (anchor.width() - img.width()) / 2;
        }
        anchor.css({
          "transform": transform
        });
        if (!settings.crop) {
          return img.css({
            transform: "translate(" + iX + "px)"
          });
        }
      };
    }

    return CoffeeflowItem;

  })();

  Preloader = (function() {

    function Preloader(parent, settings) {
      var bg, m, preloader;
      parent = parent;
      bg = "#F0F0F0";
      m = settings.borderWidth * 2;
      preloader = j("<div/>").css({
        background: bg,
        borderWidth: settings.borderWidth,
        borderColor: settings.borderColor,
        borderStyle: settings.borderStyle,
        width: parent.getWidth() - m,
        height: parent.getHeight() - m,
        overflow: "hidden",
        position: "relative"
      });
      parent.setContent(preloader);
      this.detach = function() {
        preloader.remove();
        return preloader = 0;
      };
      this.setState = function(state) {
        var i, icon;
        switch (state) {
          case "loading":
            i = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve">\
<rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/>\
<g>\
	<g opacity="0.5">\
		<g><path fill="#FFFFFF" d="M40.047,36.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248\
				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722\
				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96\
				c0,0,0,0.36,0,4.249C47.031,30.974,40.047,34.214,40.047,36.951z M41.561,31.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801\
				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392\
				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375\
				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375\
				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C37.887,34.791,39.688,33.422,41.561,31.55z M29.174,24.134\
				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08\
				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C29.678,23.125,28.527,23.702,29.174,24.134z"/>\
		</g>\
	</g>\
	<g>\
		<g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="35.9507" y1="17.9497" x2="35.9507" y2="53.9526">\
				<stop  offset="0" style="stop-color:#4D4D4D"/>\
				<stop  offset="0.3078" style="stop-color:#454545"/>\
				<stop  offset="0.7719" style="stop-color:#313131"/>\
				<stop  offset="1" style="stop-color:#242424"/></linearGradient><path fill="url(#SVGID_1_)" d="M39.047,35.951c0,2.666,6.984,5.906,6.984,9.722c0,3.887,0,4.248,0,4.248\
				c0,1.439-4.535,4.031-10.08,4.031s-10.08-2.592-10.08-4.031c0,0,0-0.361,0-4.248c0-3.816,6.984-7.057,6.984-9.722\
				c0-2.736-6.984-5.977-6.984-9.792c0-3.889,0-4.249,0-4.249c0-1.368,4.535-3.96,10.08-3.96s10.08,2.592,10.08,3.96\
				c0,0,0,0.36,0,4.249C46.031,29.974,39.047,33.214,39.047,35.951z M40.561,30.55c1.367-1.368,3.311-3.168,3.311-4.392l0.072-1.801\
				c-1.871,1.008-4.824,1.944-7.992,1.944s-6.121-0.937-7.992-1.944l0.143,1.801c0,1.224,1.873,3.023,3.242,4.392\
				c1.943,1.872,3.744,3.24,3.744,5.4c0,2.089-1.801,3.529-3.744,5.33c-1.369,1.367-3.242,3.24-3.242,4.393v2.375\
				c1.729-0.863,6.914-1.729,6.914-4.465c0-1.439,1.871-1.439,1.871,0c0,2.736,5.186,3.602,6.984,4.465v-2.375\
				c0-1.152-1.943-3.025-3.311-4.393c-1.873-1.801-3.674-3.24-3.674-5.33C36.887,33.791,38.688,32.422,40.561,30.55z M28.174,23.134\
				c1.514,0.863,4.393,1.872,7.777,1.872c3.457,0,6.408-0.937,7.92-1.801c0.648-0.432-0.359-0.936-0.576-1.08\
				c0,0-3.455-1.943-7.271-1.943c-3.744,0-6.121,1.151-7.346,1.943C28.678,22.125,27.527,22.702,28.174,23.134z"/>\
		</g></g></g></svg>';
            break;
          default:
            i = '<?xml version="1.0" encoding="utf-8"?>\
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
	 width="72.902px" height="72.902px" viewBox="0 0 72.902 72.902" enable-background="new 0 0 72.902 72.902" xml:space="preserve">\
<rect opacity="0" fill="#FFFFFF" width="72.902" height="72.902"/>\
<g>\
	<g opacity="0.5">\
		<g>\
			<path fill="#FFFFFF" d="M26.501,43.627c-1.343-2.053-2.107-4.535-2.107-7.126c0-7.272,5.833-13.177,13.105-13.177\
				c2.656,0,5.106,0.768,7.188,2.117l0.165-0.165c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177\
				c0,3.097,1.08,6.048,2.952,8.281L26.501,43.627z"/>\
			<path fill="#FFFFFF" d="M47.554,28.318c-0.26-0.406-0.532-0.801-0.83-1.17L28.219,45.654c0.365,0.307,0.754,0.584,1.153,0.846\
				L47.554,28.318z"/>\
			<path fill="#FFFFFF" d="M49.207,23.792c2.833,3.076,4.573,7.176,4.573,11.708c0,9.505-7.704,17.283-17.281,17.283\
				c-4.499,0-8.598-1.758-11.681-4.602c3.163,3.432,7.675,5.602,12.681,5.602c9.577,0,17.281-7.777,17.281-17.283\
				C54.78,31.457,52.63,26.946,49.207,23.792z"/>\
		</g>\
	</g>\
	<g>\
		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="36.4985" y1="18.2192" x2="36.4985" y2="52.7837">\
			<stop  offset="0" style="stop-color:#4D4D4D"/>\
			<stop  offset="0.3078" style="stop-color:#454545"/>\
			<stop  offset="0.7719" style="stop-color:#313131"/>\
			<stop  offset="1" style="stop-color:#242424"/>\
		</linearGradient>\
		<path fill="url(#SVGID_1_)" d="M53.78,35.5c0,9.505-7.704,17.283-17.281,17.283c-9.505,0-17.281-7.777-17.281-17.283\
			c0-9.576,7.776-17.281,17.281-17.281C46.076,18.219,53.78,25.924,53.78,35.5z M26.346,43.781l18.506-18.505\
			c-2.304-1.872-5.185-2.952-8.353-2.952c-7.272,0-13.105,5.904-13.105,13.177C23.394,38.598,24.474,41.549,26.346,43.781z\
			 M49.676,35.5c0-3.168-1.151-6.12-2.952-8.353L28.219,45.654c2.231,1.871,5.112,2.951,8.28,2.951\
			C43.771,48.605,49.676,42.701,49.676,35.5z"/>\
	</g>\
</g>\
</svg>';
        }
        icon = j("<div/>").css({
          position: "relative",
          top: "50%",
          width: "100%",
          height: "73px",
          marginTop: "-37px",
          textAlign: "center"
        });
        icon.html(i);
        return preloader.empty().html(icon);
      };
    }

    return Preloader;

  })();

}).call(this);
