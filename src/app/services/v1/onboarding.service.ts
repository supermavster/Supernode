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
    const suid = user.suid;
    if (suid) {
      const userExists = await this.userTokenRepository.findBySUID(suid);
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
            message: err
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
            const data = await this.usersRepository.findBySUID(
              userExists.get('suid')
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
    // Check if User Exist
    const userExists = await this.usersRepository.findByEmail(email);
    const checkUser = this.usersRepository.isEmpty(userExists);
    if (!checkUser) {
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
    const getSUID = uid();
    const data: IUser.SignUpDTO = {
      ...userSignUpDTO,
      email,
      password: hashedPassword ?? '',
      slug: sha1(email + getSUID).toString(),
      suid: getSUID,
      checkUserId: 2,
      status: 'active'
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

  validationEmail = async (email: any) => {
    // Check if User Exist
    const data = await this.usersRepository.findByEmail(email);
    if (this.usersRepository.isEmpty(data)) {
      return {
        status: false,
        message: lang.Onboarding.SIGNIN.ERROR.EMAIL
      };
    }
    return {
      status: true,
      data,
      message: lang.Onboarding.RECOVERY.SUCCESS
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

  confirmEmail = async (suid: string) => {
    // Check if User Exist
    const usersRepository = new UsersRepository();
    const userExists = await usersRepository.findBySUID(suid);
    if (usersRepository.isEmpty(userExists)) {
      return {
        status: false,
        message: lang.Onboarding.USER.ERROR.NOT_FOUND
      };
    }
    await usersRepository.changeCheckUserSUID(suid, 2);
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

    if (usersRepository.isEmpty(userExists)) {
      return {
        status: false,
        message: lang.Onboarding.USER.ERROR.NOT_FOUND
      };
    }
    // Logic
    const suid = userExists!.get('suid');
    await passwordResetRepository.destroy({suid});
    const code = this.getRndInteger(1000, 9999);
    const userRecord = await passwordResetRepository.create({
      code,
      suid
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
    const code = IUserRecoveryDTO.code;
    const codeExist = await passwordResetRepository.singleCondition({
      code
    });
    if (passwordResetRepository.isEmpty(codeExist)) {
      return {
        status: false,
        message: lang.Onboarding.RECOVERY.CODE.ERROR.NOT_FOUND
      };
    }
    const suid = codeExist.get('suid');
    const hashedPassword = IUserRecoveryDTO.password
      ? sha1(IUserRecoveryDTO.password).toString()
      : null;

    await this.usersRepository.update(
      {password: hashedPassword, checkUserId: 2, status: 'active'},
      {suid}
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
    if (this.usersRepository.isEmpty(user)) {
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
    const suid = user.get('suid');
    data.suid = suid;
    const authToken = await this.generateAuthToken(data);

    user.setDataValue('authToken', authToken);
    user.setDataValue('slug', `${route}/${user.get('slug')}`);

    return {
      status: true,
      message: lang.Onboarding.SIGNIN.SUCCESS,
      data: user
    };
  };

  profile = async (request: Request) => {
    const data = await this.checkAuthToken(request, true);
    return data;
  };

  suid = async (request: Request) => {
    const user: any = await this.profile(request);
    const suid = await user.data.get('suid');
    return suid;
  };

  userClient = async (request: Request) => {
    const user: any = await this.profile(request);
    const userClient = await user.data.get('userClients')[0];
    return userClient;
  };

  userClientId = async (request: Request) => {
    const userClient = await this.userClient(request);
    const userClientId = await userClient.get('id');
    return userClientId;
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
