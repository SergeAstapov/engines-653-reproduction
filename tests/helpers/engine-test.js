import RSVP from 'rsvp';
import { getContext } from '@ember/test-helpers/setup-context';

// const DEPS = [
//   'session'
// ];

async function loadEngine (mountPoint) {
  let context = getContext();
  const { owner } = context;

  // Engine construction happens in/on the router of the application
  // Engines use the application registry as a fallback, which means
  // any mocked services, etc that are injected won't get picked up.
  const router = owner.lookup('router:main');

  // Idempotent router setup, would otherwise be triggered by calling `visit()`
  router.setupRouter();

  if (!(mountPoint in router._engineInfoByRoute)) {
    throw new Error(`No engine is mounted at ${mountPoint}`);
  }

  // Create the engine instance using the engineInfo loaded by calling `setupRouter`
  const instance = await router._loadEngineInstance(
    router._engineInfoByRoute[mountPoint]
  );

  return instance;
}

/**
 * Used to set up engine test. Must be called after one of the
 * `ember-qunit` `setup*Test()` methods.
 *
 * Responsible for:
 *  - create an engine object and set it on the provided context (e.g. `this.engine`).
 *
 * @param {NestedHooks} hooks
 * @param {string} engineName
 * @param {string} mountPoint
 * @public
 */
export function setupEngineTest (hooks, engineName, mountPoint) {
  hooks.beforeEach(function () {
    // console.log(
    //   "this.owner.hasRegistration(`engine:${engineName}`)",
    //   this.owner.hasRegistration(`engine:${engineName}`)
    // );
    // debugger;
    let engineLoadPromise = this.owner.hasRegistration(`engine:${engineName}`)
      ? RSVP.Promise.resolve(this.owner.buildChildEngineInstance(engineName))
      : loadEngine(mountPoint);
    return engineLoadPromise.then((engineInstance) => {
      return engineInstance.boot().then(() => {
        this.engine = engineInstance;
      });
    });
  });
}
