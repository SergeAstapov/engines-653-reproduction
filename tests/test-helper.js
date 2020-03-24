import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import preloadAssets from 'ember-asset-loader/test-support/preload-assets';
import manifest from 'dummy/config/asset-manifest';
import Application from '../app';
import config from '../config/environment';

setApplication(Application.create(config.APP));
// start();
preloadAssets(manifest).then(start);
