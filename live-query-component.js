module.exports = function LQComponent(component) {
	if (!component.state) {
		component.state = {};
	}
	var iterateLQs = function(fn) {
		var keys = Object.keys(component.LQs);
		var key;
		while (key = keys.pop()) {
			fn(key, component.LQs[key]);
		}
	};

	iterateLQs(function(key, LQ) {
    LQ.exec();
		component.state[key] = LQ.docs;
		LQ.on('any', function() {
      var docsOnKeyProp = {};
      docsOnKeyProp[key] = LQ.docs;
			component.setState(docsOnKeyProp);
		});
	});

	var originalUnmount = component.componentWillUnmount;
	component.componentWillUnmount = function() {
		iterateLQs(function(key, LQ) {
			LQ.stop();
		});
		originalUnmount.apply(component, arguments);
	}
};