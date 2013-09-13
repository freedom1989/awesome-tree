(function($) {
	"use strict";

	$.awesomeTree = {

		//the default parameter option for awesome tree.
		defaults: {

		};

	};

	$.fn.awesomeTree = function(options) {
		
		//extend the default options for awesome tree
		options = $.extend({}, $.awesomeTree.defaults, options);

		return this.each(function() {
			var context = $(this);
			$("li", context).draggable();
		});
	};
}(jQuery));