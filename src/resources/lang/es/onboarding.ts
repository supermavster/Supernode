// eslint-disable-next-line import/no-anonymous-default-export
export default {
  HEADER: {
    NOT_FOUND: 'El Header no pudo ser encontrado'
  },

  TOKEN: {
    INVALID: 'Token Invalido'
  },

  ACCESS_TOKEN: {
    MAKE: 'Se genero correctamente el access token',
    ERROR: {
      MAKE: 'Hubo un problema al generar el access token'
    }
  },

  AUTH_TOKEN: {
    MAKE: 'Se genero correctamente el auth token',
    ERROR: {
      MAKE: 'Hubo un problema al generar el auth token'
    }
  },

  SIGNUP: {
    MAKE_USER: 'El usuario se creo correctamente',
    ERROR: {
      MAKE_USER: 'El usuario no se pudo crear correctamente',
      EMAIL_EXIST: 'Este email ya se encuentra registrado'
    }
  },

  SIGNIN: {
    SUCCESS: 'Ingreso exitoso',
    ERROR: {
      PASSWORD: 'Contraseña Incorrecta',
      VERIFY_EMAIL: 'El correo debe ser verificado para proseguir',
      INACTIVE: 'El usuario ha sido desactivado',
      EMAIL: 'El correo no existe'
    }
  },

  RECOVERY: {
    CHANGE_PASSWORD: 'La contrasenia se a cambiado exitosamente',
    SUCCESS: '¡Listo! Se ha enviado el correo',
    CODE: {
      SUCCESS: 'El codigo es valido',
      ERROR: {
        NOT_FOUND: 'El codigo no existe en la base de datos'
      }
    }
  },

  USER: {
    CHECK_EMAIL: {
      SUCCESS: 'Se verifico la cuenta correctamente'
    },
    ERROR: {
      NOT_FOUND_TOKEN: 'El usuario no esta asociado a ese token',
      NOT_FOUND: 'El usuario no existe'
    }
  }
};
