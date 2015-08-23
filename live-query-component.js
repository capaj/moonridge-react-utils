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

  if (component.state === undefined) {
    component.state = {};
  }
  iterateQueries(function(key, query) {

    query = query.exec();
    if (query.indexedByMethods.findOne) {
      component.state[key] = null;
    } else if (query.indexedByMethods.count) {
      component.state[key] = 0;
    } else {
      component.state[key] = [];
    }
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