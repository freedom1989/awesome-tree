(function($) {
	"use strict";

	//the default defaults for awesome tree.
	var defaults = {
		cursorAt: {left: 0, top: 0},
		selectedClass: "node-selected",
		threshhold: 25,
		marker: $("<div></div>"),
		beforeClass: "tdd-before", 
		afterClass: "tdd-after"
	};

	var debug = function(obj) {
		if(window.console && window.console.log) {
			window.console.log(obj);
		}
	};

	var getOptions = function(el) {
		return el.closest(".awesomeTree").data("options");
	};

	var getContext = function(el) {
		return el.closest(".awesomeTree");
	};

	var handleDraggableStart = function(e, ui) {
		debug("drag event start...");
		var target = $(e.target),
			options = getOptions(target);
			
		target.addClass(options.selectedClass);
		// $(ui.helper).addClass("ui-draggable-helper");
		$("body").css("cursor", "default");
	};

	var handleDraggableDrag = function(e, ui) {
		debug("draggable drag event ...");
	};

	var handleDraggableStop = function(e, ui) {
		debug("drag event stop...");
		var target = $(e.target);
		$("li", getContext(target)).unbind("mousemove").removeClass(getOptions(target).selectedClass);
		$("body").css("cursor", "auto");
	};


	var handleDroppableOver = function(e, ui) {
		debug("drop event over...");
		var options = getOptions($(e.target)),
			selectedClass = options.selectedClass,
			beforeClass = options.beforeClass,
			afterClass = options.afterClass,
			marker = options.marker;		

		if($(e.target).is("li")) {
			$(e.target).bind("mousemove", function(mme) {
				var target = $(mme.target),
					x = mme.pageX - target.offset().left,
					y = mme.pageY - target.offset().top,
					threshhold = options.threshhold;

				if(target.find("ul").length !== 0) {
					threshhold = Math.min(options.threshhold * (target.find("ul").length + 1), target.width() * 0.75);
				}

				if(target.hasClass(selectedClass) || target.parents("." + selectedClass).length !== 0) {
					marker.detach();
				}else {

					// debug("x -- > " + x + ", threshhold -- > " + threshhold);
					if(x > threshhold) {
						debug("x > threshhold");
						if (target.is("li") && target.children("ul").length !== 0) {
							target.children("ul").append(marker);
						} else if (target.is("li")) {
							target.append(marker);
						}
					} else if(y < target.height() / 2) {
						debug("y < height / 2");
						marker.addClass(beforeClass);
						target.before(marker);
					} else {
						debug("x < threshhold || y > height / 2");
						marker.addClass(afterClass);
						target.after(marker);
					}
				}
			});
		}
	};

	var handleDroppableDrop = function(e, ui) {
		debug("drop event drop...");
	};

	$.fn.awesomeTree = function(options) {
		
		//extend the default options for awesome tree
		var opts = $.extend({}, defaults, options);
		
		return this.each(function() {
			var $this = $(this);

			//bind drag and drop event for the element
			$("li", $this).draggable({
				addClasses: false,
				helper: "clone",
				appendTo: "body",
				opacity: 0.8,
				delay: 10,
				cursorAt: defaults.cursorAt,
				start: handleDraggableStart,
				drag: handleDraggableDrag,
				stop: handleDraggableStop
			}).droppable({
				addClasses: false,
				greedy: false,
				tolerance: "pointer",
				drop: handleDroppableDrop,
				over: handleDroppableOver
			});

			//bind option parmeters to context
			$this.data("options", opts);
		});
	};
}(jQuery));