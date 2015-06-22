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
		component.state[key] = LQ.docs;
		LQ.on('any', function() {
			component.setState({key: LQ.docs});
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