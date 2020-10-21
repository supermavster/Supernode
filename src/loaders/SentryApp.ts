// Add Library
import * as Sentry from '@sentry/node';

import config from '../config';

export class SentryApp {
  init = async () => {
    // eslint-disable-next-line no-console
    console.info('Start Sentry');
    await Sentry.init(this.getConfig());
    // await this.configScopes();
    // myUndefinedFunction();
  };

  getConfig = () => {
    const configSentry = {dsn: config.SENTRY_DSN};
    if (config.SENTRY_CONSOLE) {
      Object.assign(configSentry, {
        integrations(integrations: any) {
          // integrations will be all default integrations
          return integrations.filter(function (integration: any) {
            return integration.name !== 'Console';
          });
        }
      });
    }
    return configSentry;
  };

  configScopes = () => {
    this.configureScope();
    this.withScope();
  };

  configureScope = () => {
    // This will be set globally for every succeeding event send
    Sentry.configureScope(function (scope) {
      scope.addEventProcessor(function (event, hint) {
        // Add anything to the event here
        // returning null will drop the event
        return event;
      });
    });
  };

  withScope = () => {
    // Using withScope, will only call the event processor for all "sends"
    // that happen within withScope
    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event, hint) {
        // Add anything to the event here
        // returning null will drop the event
        return event;
      });
      Sentry.captureMessage('Test');
    });
  };
}
