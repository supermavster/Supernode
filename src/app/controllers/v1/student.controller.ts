import {Request, Response, NextFunction} from 'express';

import {StudentService, OnboardingService} from '../../services';
import {IComplements, IStudent, IUser} from '../../../resources/interfaces';
import {ComplementResponse} from '../generic';

export class StudentController {
  private complementResponse = new ComplementResponse();
  private studentService = new StudentService();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.studentService.all();
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  get = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.studentService.index(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  del = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.studentService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUDImage = request.body;
    const content = await this.studentService.create(data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'students',
      files: request.files
    });
  };

  update = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const data: IComplements.CRUDImage = request.body;
    const content = await this.studentService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'students',
      files: request.files,
      update: true
    });
  };

  signUp = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    const data: IStudent.SignUpDTO = request.body;
    const dataOnboarding: IUser.SignUpDTO = request.body;
    dataOnboarding.fullName = `${data.name} ${data.lastName}`;
    await new OnboardingService()
      .signUp(dataOnboarding)
      .then(async (res) => {
        data!.uid = res.data!.uid;
        const content = await this.studentService.create(data);
        content.data!.slug = res.data!.slug;
        await this.complementResponse.returnData(
          response,
          nextOrError,
          content,
          {
            upload: true,
            router: 'users/students',
            files: request.files
          }
        );
      })
      .catch(async (err) => {
        await this.complementResponse.returnData(response, nextOrError, err);
      });
    // await this.mailer.SendWelcomeEmail(body);
  };

  login = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Context Base
    const dataOnboarding: IUser.SignInDTO = request.body;
    const content = await new OnboardingService().login(
      dataOnboarding,
      'users/students'
    );
    await this.complementResponse.returnData(response, nextOrError, content);
  };
}
