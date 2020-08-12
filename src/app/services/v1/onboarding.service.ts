import moment from 'moment';
import sha1 from 'crypto-js/sha1';
import jwt from 'jsonwebtoken';
import {Request} from 'express';
import {v4 as uid} from 'uuid';

import config from '../../../config';
import {
  UserTokenRepository,
  UsersRepository,
  PasswordResetRepository
} from '../../repository';
import {IUser, IComplements} from '../../../resources/interfaces';
// Language
const language = `../../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export class OnboardingService {
  usersRepository = new UsersRepository();
  userTokenRepository = new UserTokenRepository();

  generateAccessToken = (): Object => {
    const payload = {
      iat: moment().unix()
    };
    const accessToken: string = jwt.sign({data: payload}, this.signature(), {
      expiresIn: '1y'
    });
    return {status: true, data: {accessToken}};
  };

  checkAccessToken = async (request: Request) => {
    const header =
      request.header(`X-${config.SHORT_NAME}-Access-Token`) || 'ERROR';

    if (typeof header === 'undefined') {
      return {
        status: false,
        message: lang.Onboarding.HEADER.NOT_FOUND
      };
    }
    try {
      const verify = await jwt.verify(header, this.signature());
      return {
        status: true,
        message: lang.Onboarding.ACCESS_TOKEN.MAKE
      };
    } catch (error) {
      return {
        status: false,
        message: lang.Onboarding.TOKEN.INVALID,
        data: {name: error.name, message: error.message}
      };
    }
  };

  generateAuthToken = async (user: IUser.AuthTokenDTO) => {
    let authToken: any;
    // eslint-disable-next-line no-shadow
    const uid = user.uid;
    if (uid) {
      const userExists = await this.userTokenRepository.findByUID(uid);
      // eslint-disable-next-line no-console
      console.log(userExists);
      if (typeof userExists !== 'undefined' && userExists !== null) {
        authToken = userExists.get('authToken');
      } else {
        const payload = {
          iat: moment().unix(),
          user
        };
        authToken = jwt.sign({data: payload}, this.signature(), {
          expiresIn: '1y'
        });
      }
      const date = new Date();
      const authTokenDTO: IUser.AuthDTO = {
        ...user,
        authToken,
        maxDate: new Date(date.setFullYear(date.getFullYear() + 1)),
        updated: false
      };
      await this.userTokenRepository.create(authTokenDTO);
    }
    return authToken;
  };

  checkAuthToken = async (request: Request, getData?: Boolean) => {
    const header =
      request.header(`X-${config.SHORT_NAME}-Auth-Token`) || 'ERROR';

    if (typeof header === 'undefined') {
      return {
        status: false,
        message: lang.Onboarding.HEADER.NOT_FOUND
      };
    }

    try {
      return await jwt.verify(
        header,
        this.signature(),
        async (err, decoded: any) => {
          const errorObject = {
            status: false,
            message: lang.Onboarding.USER.ERROR.NOT_FOUND_TOKEN
          };

          if (
            typeof decoded === 'undefined' ||
            typeof decoded.data === 'undefined'
          ) {
            return errorObject;
          }

          const userExists = await this.userTokenRepository.findUserByAuthToken(
            header
          );
          if (!userExists) {
            return errorObject;
          }

          if (getData) {
            const data = await this.usersRepository.findStudentByUID(
              userExists.get('uid')
            );
            return {
              status: true,
              data
            };
          }
          return {
            status: true,
            message: lang.Onboarding.AUTH_TOKEN.MAKE
          };
        }
      );
    } catch (error) {
      return {
        status: false,
        message: lang.Onboarding.TOKEN.INVALID,
        data: {name: error.name, message: error.message}
      };
    }
  };

  signUp = async (userSignUpDTO: IUser.SignUpDTO) => {
    // Format Data
    const email = userSignUpDTO.email.toLowerCase();
    // eslint-disable-next-line no-param-reassign
    userSignUpDTO.email = email;
    // Check if User Exist
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      return {
        status: false,
        message: lang.Onboarding.SIGNUP.ERROR.EMAIL_EXIST
      };
    }
    // Generate Password
    const hashedPassword = userSignUpDTO.password
      ? sha1(userSignUpDTO.password).toString()
      : null;
    // Set New Data
    const getUID = uid();
    const data: IUser.SignUpDTO = {
      ...userSignUpDTO,
      email,
      password: hashedPassword ?? '',
      slug: sha1(email + getUID).toString(),
      uid: getUID,
      checkUserId: 1,
      status: 'inactive'
    };
    // Make User
    const userRecord = await this.usersRepository.create(data);
    if (this.usersRepository.isEmpty(userRecord)) {
      return {
        status: false,
        message: lang.Onboarding.SIGNUP.ERROR.MAKE_USER
      };
    }
    // Get Response - User
    return {
      status: true,
      data,
      message: lang.Onboarding.SIGNUP.MAKE_USER
    };
  };

  createClient = async (request: IUser.SignUpDTO | IComplements.CRUDImage) => {
    const data = await this.usersRepository.createClient(request);
    if (this.usersRepository.isEmpty(data)) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.MAKE
      };
    }
    return {
      status: true,
      data: request,
      message: lang.STACK.CRUD.MAKE
    };
  };

  // eslint-disable-next-line no-shadow
  confirmEmail = async (uid: string) => {
    // Check if User Exist
    const usersRepository = new UsersRepository();
    const userExists = await usersRepository.findByUID(uid);
    if (!userExists) {
      return {
        status: false,
        message: lang.Onboarding.USER.ERROR.NOT_FOUND
      };
    }
    // eslint-disable-next-line no-warning-comments
    // TODO: User Re Check

    await usersRepository.changeCheckUserUID(uid, 2);
    return {
      status: true,
      message: lang.Onboarding.USER.CHECK_EMAIL.SUCCESS
    };
  };

  recoveryPassword = async (email: string) => {
    // Check if User Exist
    const passwordResetRepository = new PasswordResetRepository();
    const usersRepository = new UsersRepository();
    const userExists: any = await usersRepository.singleCondition({
      email
    });

    if (typeof userExists !== 'undefined' || !userExists) {
      return {
        status: false,
        message: lang.Onboarding.USER.ERROR.NOT_FOUND
      };
    }
    // Logic
    // eslint-disable-next-line no-shadow
    const uid = userExists!.get('uid');
    await passwordResetRepository.destroy({uid});
    const code = this.getRndInteger(1000, 9999);
    const userRecord = await passwordResetRepository.create({
      code,
      uid
    });

    return {
      status: true,
      data: {
        user: {
          email: userExists!.get('email'),
          fullName: userExists!.get('fullName')
        },
        code
      },
      message: lang.Onboarding.RECOVERY.SUCCESS
    };
  };

  checkCode = async (code: string) => {
    // Check if User Exist
    const passwordResetRepository = new PasswordResetRepository();
    const codeExist = await passwordResetRepository.singleCondition({
      code
    });
    if (!codeExist) {
      return {
        status: false,
        message: lang.Onboarding.RECOVERY.CODE.ERROR.NOT_FOUND
      };
    }
    return {
      status: true,
      message: lang.Onboarding.RECOVERY.CODE.SUCCESS
    };
  };

  changePassword = async (IUserRecoveryDTO: IUser.RecoveryDTO) => {
    // Check if User Exist
    const passwordResetRepository = new PasswordResetRepository();
    const usersRepository = new UsersRepository();
    const code = IUserRecoveryDTO.code;
    const codeExist = await passwordResetRepository.singleCondition({
      code
    });
    if (!codeExist) {
      return {
        status: false,
        message: lang.Onboarding.RECOVERY.CODE.ERROR.NOT_FOUND
      };
    }
    // Generate Password
    // eslint-disable-next-line no-shadow
    const uid = codeExist.uid;
    const hashedPassword = IUserRecoveryDTO.password
      ? sha1(IUserRecoveryDTO.password).toString()
      : null;

    const userRecord = await usersRepository.update(
      {password: hashedPassword, checkUserId: 2, status: 'active'},
      uid
    );

    // Remode data
    await passwordResetRepository.destroy({code});
    return {
      status: true,
      message: lang.Onboarding.RECOVERY.CHANGE_PASSWORD
    };
  };

  login = async (userSignInDTO: IUser.SignInDTO, route: string = 'users') => {
    if (!userSignInDTO.email) {
      return {
        status: false,
        message: lang.Onboarding.SIGNIN.ERROR.SIGNIN
      };
    }
    // Check if User Exist
    const user: any = await this.usersRepository.findByEmail(
      userSignInDTO.email
    );
    if (!user) {
      return {
        status: false,
        message: lang.Onboarding.USER.ERROR.NOT_FOUND
      };
    }
    // Check Password
    const hashedPassword = await sha1(userSignInDTO.password).toString();

    if (hashedPassword !== user!.get('password')) {
      return {
        status: false,
        message: lang.Onboarding.SIGNIN.ERROR.PASSWORD
      };
    }

    // Check Inactive
    if (user!.get('checkUserId') === 1) {
      return {
        status: false,
        code: 402,
        message: lang.Onboarding.SIGNIN.ERROR.VERIFY_EMAIL
      };
    }

    if (user!.get('status') === 'inactive') {
      return {
        status: false,
        message: lang.Onboarding.SIGNIN.ERROR.INACTIVE
      };
    }

    const data: IUser.AuthTokenDTO = userSignInDTO;
    data.uid = user.get('uid');
    const authToken = await this.generateAuthToken(data);

    user.setDataValue('authToken', authToken);
    user.setDataValue('slug', `${route}/${user.get('slug')}`);
    return {
      status: true,
      message: lang.Onboarding.SIGNIN.SUCCESS,
      data: user as IUser.SigInDTO
    };
  };

  profile = async (request: Request) => {
    const data = await this.checkAuthToken(request, true);
    return data;
  };

  private getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private signature() {
    const encryptKey = Buffer.from(
      JSON.stringify(config.PROJECT + config.SHORT_NAME),
      'utf-8'
    ).toString('base64');
    return sha1(encryptKey).toString();
  }
}
