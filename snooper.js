/*
 * Copyright (c) 2014 Luiz Fernando Oliveira Corte Real
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
