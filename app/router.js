import EmberRouter from '@ember/routing/router';
import config from 'covsar-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('query', function() {});

  this.route('kreis', { path: "/kreis" }, function() {
    this.route('details', { path: "/details/:kreisname" });
  });
  this.route('highscore');
  this.route('bundesland', function() {
    this.route('details', { path: "/details/:bundesland"});
  });
});
