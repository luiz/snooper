(function(ET) {
	"use strict";

	var originalAdd = ET.prototype.addEventListener;

	var values = function(obj) {
		var vals = [];
		for (var key in obj) {
			vals.push(obj[key]);
		}
		return vals;
	};

	var flatten = function(array) {
		var flattened = [];
		for (var i = 0; i < array.length; i++) {
			flattened = flattened.concat(array[i]);
		}
		return flattened;
	};

	ET.prototype.addEventListener = function() {
		var evt      = arguments[0],
		    listener = arguments[1];

		if (!this.listeners) {
			this.listeners = {};
		}
		if (!(evt in this.listeners)) {
			this.listeners[evt] = [];
		}

		this.listeners[evt].push(listener);

		originalAdd.apply(this, arguments);
	};

	ET.prototype.getEventListeners = function() {
		if (arguments.length) {
			var evt = arguments[0];
			return this.listeners[evt] || [];
		}
		return flatten(values(this.listeners));
	};

	ET.prototype.getEventsWithListeners = function() {
		if (this.listeners) {
			return Object.keys(this.listeners);
		}
		return [];
	};
}(Node));
