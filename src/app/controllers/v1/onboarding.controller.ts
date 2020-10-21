import {Request, Response, NextFunction} from 'express';

import {OnboardingService} from '../../services';
import {IUser} from '../../../resources/interfaces';
import MailerService from '../../../utils/MailerService';
import {Controller as ComplementResponse} from '../generic';

export class OnboardingController {
  private complementResponse = new ComplementResponse();
  private onboardingService = new OnboardingService();
  private mailer: MailerService = new MailerService();

  getRouterFile = () => {
    return `users`;
  };

  getDataFormat = async (content: any) => {
    const response: any = await this.complementResponse.getNewSlug(
      content,
      this.getRouterFile()
    );
    return response;
  };

  generateAccessToken = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // To send response
    const content = this.onboardingService.generateAccessToken();
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  checkAccessToken = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    const content: any = await this.onboardingService.checkAccessToken(request);
    await this.complementResponse.returnData(
      response,
      nextOrError,
      content,
      undefined,
      true
    );
    nextOrError();
  };

  checkAuthToken = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    const content: any = await this.onboardingService.checkAuthToken(request);
    await this.complementResponse.returnData(
      response,
      nextOrError,
      content,
      undefined,
      true
    );
    nextOrError();
  };

  signUp = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // To send response
    const data: IUser.SignUpDTO = request.body;
    const content = await this.onboardingService.signUp(data);
    if (content.status) {
      // Send Email
      await this.mailer.SendWelcomeEmail(content.data);
      // Add Files Data
      if (request.files) {
        await this.complementResponse.returnData(
          response,
          nextOrError,
          content,
          {
            upload: true,
            router: this.getRouterFile(),
            files: request.files
          }
        );
      } else {
        await this.complementResponse.returnData(
          response,
          nextOrError,
          content
        );
      }
    } else {
      await this.complementResponse.returnData(response, nextOrError, content);
    }
  };

  validationEmail = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content: any = await this.onboardingService.validationEmail(
      request.body.email
    );
    // Send Email
    if (content.status) {
      await this.mailer.SendWelcomeEmail(content.data.dataValues);
      delete content.data;
    }
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  confirmEmail = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.onboardingService.confirmEmail(
      request.params.suid
    );
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  recoveryPassword = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.onboardingService.recoveryPassword(
      request.body.email
    );
    if (typeof content !== 'undefined' && content.status) {
      await this.mailer.SendRecoveryEmail(content.data);
    }
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  checkCode = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.onboardingService.checkCode(request.body.code);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  changePassword = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IUser.RecoveryDTO = request.body;
    const content = await this.onboardingService.changePassword(data);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  login = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    const data: IUser.SignInDTO = request.body;
    const content = await this.onboardingService
      .login(data)
      // eslint-disable-next-line shopify/prefer-early-return
      .catch(async (error) => {
        if (error.code === 402) {
          const body = error.data;
          await this.mailer.SendWelcomeEmail(body);
        }
      });
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      addUrl: true
    });
  };

  profile = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    let content: any = await this.onboardingService.profile(request);
    // Add Files Data
    content = await this.getDataFormat(content);
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      addUrl: true
    });
  };
}
