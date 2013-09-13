(function($) {
	"use strict";

	//the default settings for awesome tree.
	var settings = {
		cursorAt: {left: 10, top: 10},
		movingClass: "tree_moving"
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
		var target = $(e.target);
		target.addClass(getOptions(target).movingClass);
		$("body").css("cursor", "default");
	};

	var handleDraggableStop = function(e, ui) {
		debug("drag event stop...");
		var target = $(e.target);
		$("li", getContext(target)).unbind("mousemove").removeClass(getOptions(target).movingClass);
		$("body").css("cursor", "auto");
	};


	var handleDroppableOver = function(e, ui) {
		debug("drop event over...");
		var target = $(e.target);
		if(target.is("li")) {
			target.bind("mousemove", function(me) {
				var mtarget = $(me.target);
				debug(mtarget);
			});
		}
	};

	var handleDroppableDrop = function(e, ui) {
		debug("drop event drop...");
	};

	$.fn.awesomeTree = function(options) {
		
		//extend the default options for awesome tree
		var opts = $.extend({}, settings, options);
		
		return this.each(function() {
			var $this = $(this);

			//bind drag and drop event for the element
			$("li", $this).draggable({
				addClasses: true,
				helper: "clone",
				appendTo: "body",
				opacity: 0.8,
				delay: 10,
				cursorAt: settings.cursorAt,
				start: handleDraggableStart,
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