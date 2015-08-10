require('chai').should();
var sinon = require('sinon');

describe('live query component', function() {
	var LQ1;
	var LQ2;
	var comp;
  beforeEach(function() {
    LQ1 = {exec: sinon.spy()};
    LQ2 = {exec: sinon.spy()};

    comp = {
      LQs: {
        first: LQ1,
        second: LQ1
      }
    };
  });

  it('should execute all LQs on the component', function(){

	});

  it('should set state on any event fired on live Query', function() {

	});

	it('should stop live queries on unmount', function() {

	});
});