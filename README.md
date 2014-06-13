Snooper
=======

Snooper lets you retrieve listeners previously added to elements using `addEventListener` (and `attachEvent` on the future).

Usage
-----

You can use (http://bower.io)[bower] to add it to your project or you can download it from this repository. Load it before any other script that you want to be able to monitor. Example:

	<script src="snooper.js"></script>
	<script src="main.js"></script>
	<script src="modal.js"></script>

When loaded, you will be able to use the following API:

### getEventListeners([eventName])

When called with no arguments, returns all the functions that are listening to events. When called with an event name, returns only functions listening to that event.

Example:

	function foo() {}
	function bar() {}

	document.addEventListener('DOMContentLoaded', foo);
	document.addEventListener('anotherEvent', bar);

	document.getEventListeners(); // [ foo(), bar() ]
	document.getEventListeners('anotherEvent'); // [ bar() ]

### getEventsWithListeners()

Lists events which have listeners attached. Example:

	function foo() {}
	function bar() {}

	document.addEventListener('DOMContentLoaded', foo);
	document.addEventListener('anotherEvent', bar);

	document.getEventsWithListeners(); // [ 'DOMContentLoaded', 'anotherEvent' ]
