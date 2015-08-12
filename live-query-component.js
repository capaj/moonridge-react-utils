module.exports = function LQComponent(component) {
	if (!component.state) {
		component.state = {};
	}
	var iterateQueries = function(fn) {
		var keys = Object.keys(component.queries);
		var key;
		while (key = keys.pop()) {
			fn(key, component.queries[key]);
		}
	};

	iterateQueries(function(key, query) {
    query.exec();
		query.on('any', function() {
      var docsOnKeyProp = {};
      docsOnKeyProp[key] = query.result;
			component.setState(docsOnKeyProp);
		});
	});

	var originalUnmount = component.componentWillUnmount;
	component.componentWillUnmount = function() {
		iterateQueries(function(key, LQ) {
			LQ.stop();
		});
		originalUnmount.apply(component, arguments);
	}
};