(function($) {
	"use strict";

	//the default settings for awesome tree.
	var settings = {
		cursorAt: {left: 10, top: -40}
	};

	var debug = function(obj) {
		if(window.console && window.console.log) {
			window.console.log(obj);
		}
	};

	var handleDraggableStart = function(event, ui) {
		debug("drag event start...");
	};

	var handleDraggableStop = function(event, ui) {
		debug("drag event stop...");
	};

	var handleDroppableDrop = function(event, ui) {
		debug("drop event drop...");
	};

	var handleDroppableOver = function(event, ui) {
		debug("drop event over...");
	};

	var handleDrppableOut = function(event, ui) {
		debug("drop event out...");
	};

	$.fn.awesomeTree = function(options) {
		
		//extend the default options for awesome tree
		var opts = $.extend({}, settings, options);
		
		return this.each(function() {
			var $this = $(this);

			//bind drag and drop event for the element
			$("li", $this).draggable({
				addClasses: false,
				helper: "clone",
				appendTo: "body",
				opacity: 0.2,
				delay: 10,
				cursorAt: settings.cursorAt,
				start: handleDraggableStart,
				stop: handleDraggableStop
			}).droppable({
				addClasses: false,
				greedy: false,
				tolerance: "pointer",
				drop: handleDroppableDrop,
				over: handleDroppableOver,
				out: handleDrppableOut
			});

			//bind option parmeters to context
			$this.data("options", opts);
		});
	};
}(jQuery));