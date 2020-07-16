import Boom from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';
import {OK, BAD_REQUEST, getStatusText} from 'http-status-codes';

import {CODE_OK, CODE_ERROR} from '../../../resources/constants/codes.constant';
import {OnboardingService} from '../../services';
import config from '../../../config';
import {UploadAnyFiles} from '../../../utils/UploadFiles';
import {IUser} from '../../../resources/interfaces';
import MailerService from '../../../utils/MailerService';

// Language
const language = `../../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export class OnboardingController {
  private onboardingService = new OnboardingService();
  private mailer: MailerService = new MailerService();

  generateAccessToken = (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ): void => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let message: any = lang.Onboarding.ACCESS_TOKEN.MAKE;
    // To send response
    const body = this.onboardingService.generateAccessToken();
    if (typeof body === 'undefined' || !body) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      message = lang.Onboarding.ACCESS_TOKEN.ERROR.MAKE;
      nextOrError(Boom.badRequest(message));
    }
    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });
  };

  checkAccessToken = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;

    // To send response
    let body: any;
    const content: any = await this.onboardingService.checkAccessToken(request);
    body = content!.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
      response.status(codeResponse).json({
        success: getStatusText(codeResponse),
        code,
        message,
        body
      });
      nextOrError(Boom.badRequest(message));
    }
    nextOrError();
  };

  checkAuthToken = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;

    // To send response
    let body: any;
    const content: any = await this.onboardingService.checkAuthToken(request);
    body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
      response.status(codeResponse).json({
        success: getStatusText(codeResponse),
        code,
        message,
        body
      });
      nextOrError(Boom.badRequest(message));
    }
    nextOrError();
  };

  signUp = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let message: any = lang.Onboarding.SIGNUP.MAKE_USER;

    // To send response
    let body: any;
    const data: IUser.SignUpDTO = request.body;
    const content = await this.onboardingService.signUp(data);
    body = content.data;
    message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
    }

    await this.mailer.SendWelcomeEmail(body);

    // Upload File
    new UploadAnyFiles().uploadFiles(request.files, 'users', body.slug);

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });

    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };

  confirmEmail = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let body: any;
    // Generate Logic
    const content = await this.onboardingService.confirmEmail(
      request.params.uid
    );
    // body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
    }

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });

    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };

  recoveryPassword = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let body: any;
    // Generate Logic
    const content = await this.onboardingService.recoveryPassword(
      request.body.email
    );
    body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
    }

    await this.mailer.SendRecoveryEmail(body);

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });

    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };

  checkCode = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let body: any;
    // Generate Logic
    const content = await this.onboardingService.checkCode(request.body.code);
    // body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
    }

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });

    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };

  changePassword = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    let body: any;
    // Generate Logic
    const content = await this.onboardingService.changePassword(
      request.body as IUser.RecoveryDTO
    );
    // body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
    }

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });

    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };

  login = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    // To send response
    let body: any;
    const content = await this.onboardingService.login(
      request.body as IUser.SignInDTO
    );
    body = content.data;
    const message = content.message;
    if (!content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
      body = undefined;
      if (content.code === 402) {
        await this.mailer.SendWelcomeEmail(body);
      }
    }
    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });
    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  };
}
