import {expect} from 'chai';
import {Destroyable} from '../src/'

describe('Basic Tests', function() {
  it(`should destroy itself once its scope exits`, function(done) {
    class TestDestroyable extends Destroyable {
      destroy() {
        done();
      }
    }

    setTimeout(function () {
      new TestDestroyable();
    }, 0);
  });

  it(`should destroy itself once its scope and any sub-scopes exits`, function(done) {
    class TestDestroyable extends Destroyable {
      public counter = 0;
      constructor() {
        super();
        this.counter = 0;
      }

      increment() {
        this.counter += 1;
      }

      destroy() {
        try {
          expect(this.counter).to.equal(1);
        } catch (e) {
          return done(e);
        }
        done();
      }
    }

    setTimeout(function() {
      const x = new TestDestroyable();

      setTimeout(function () {
        x.increment();
      }, 0);
    }, 0)
  });
});
