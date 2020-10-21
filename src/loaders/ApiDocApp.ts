import path from 'path';

import YAML from 'yamljs';
import expressOasGenerator from 'express-oas-generator';
import listEndpoints from 'express-list-endpoints';
import _ from 'lodash';

import {FormatData} from '../utils/FormatData';

const pathYaml = path.join(__dirname, '../api/documentation/api.client.yaml');

const swaggerDocument = YAML.load(pathYaml);

export class ApiDocApp {
  response: any | undefined;
  constructor(app: any, appRouter: any) {
    // eslint-disable-next-line no-console
    console.info('Start Auto - ApiDoc');
    expressOasGenerator.handleResponses(app, {
      predefinedSpec(spec: any) {
        const format = new FormatData(swaggerDocument);
        format.response.forEach((element: any[]) => {
          _.set(spec, element[0], element[1]);
        });

        listEndpoints(appRouter).forEach((element: any) => {
          if (
            typeof element !== 'undefined' &&
            typeof element.path !== 'undefined' &&
            typeof element.methods !== 'undefined' &&
            element.path !== '*'
          ) {
            element.methods.forEach((item: string) => {
              const mainTitle: string[] = element.path.split('/');
              const title: string = mainTitle[1];
              _.set(
                spec,
                `paths["${element.path}"].${item.toLocaleLowerCase()}`,
                {
                  tags: [title],
                  description: `Generate Services - ${title.toUpperCase()} - ${item.toUpperCase()}`,
                  produces: ['application/json']
                }
              );
            });
          }
        });
        return spec;
      },
      specOutputPath: path.join(__dirname, '../api/documentation/api.json')
    });
    expressOasGenerator.handleRequests();
  }
}
