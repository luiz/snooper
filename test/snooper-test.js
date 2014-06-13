function sayHi() {
	alert('hi');
}
function sayBye() {
	alert('bye');
}
function noop() {}

var clickMe    = document.getElementById('click-me');
var clickMeToo = document.getElementById('click-me-too');

clickMe.addEventListener('click', sayHi);
clickMe.addEventListener('click', sayBye);

describe('getEventListeners()', function() {

	it('returns an empty list for an element with no listeners attached', function() {
		var listeners = clickMeToo.getEventListeners();
		expect(listeners).to.have.length(0);
	});

	it('lists all listeners of an element', function() {
		var listeners = clickMe.getEventListeners();

		expect(listeners).to.have.length(2);
		expect(listeners).to.contain(sayHi, sayBye);
	});

	it('works with the document object too', function() {
		document.addEventListener('DOMContentLoaded', noop);

		var listeners = document.getEventListeners();

		expect(listeners).to.have.length(1);
		expect(listeners).to.contain(noop);
	});

	it('still calls the original listener', function() {
		var called = false;

		clickMeToo.addEventListener('test', function() {
			called = true;
		});

		clickMeToo.dispatchEvent(new Event('test'));

		expect(called).to.be.ok();
	});

	it('lists listeners of a specific event', function() {
		clickMe.addEventListener('blur', noop);

		var blurListeners = clickMe.getEventListeners('blur');
		expect(blurListeners).to.have.length(1);
		expect(blurListeners).to.contain(noop);

		var clickListeners = clickMe.getEventListeners('click');
		expect(clickListeners).to.have.length(2);
		expect(clickListeners).to.contain(sayHi, sayBye);

		var focusListeners = clickMe.getEventListeners('focus');
		expect(focusListeners).to.have.length(0);
	});
});

describe('getEventsWithListeners()', function() {
	it('lists all events with listeners', function() {
		clickMe.addEventListener('blur', noop);

		var evts = clickMe.getEventsWithListeners();
		expect(evts).to.have.length(2);
		expect(evts).to.contain('click', 'blur');

		var bodyEvts = document.body.getEventsWithListeners();
		expect(bodyEvts).to.have.length(0);
	});
});
