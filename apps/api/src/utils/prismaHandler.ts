import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface HandlerHttp {
  type: keyof typeof HttpStatus;
  message: string;
}

export class ErrorHandler extends Error {
  constructor({ type, message }: HandlerHttp) {
    super(`${type}:${message}`);
  }

  static handleError(error: any) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          status = HttpStatus.BAD_REQUEST;
          message = `El campo '${error.meta?.target}' ya está en uso`;
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Violación de clave foránea, asegúrate de que la referencia existe';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Registro no encontrado o ya ha sido eliminado';
          break;
        case 'P2014':
          status = HttpStatus.BAD_REQUEST;
          message = 'No se puede eliminar porque tiene dependencias relacionadas';
          break;
        default:
          message = 'Error desconocido en la base de datos';
      }
    } else if (typeof error === 'string' && error.includes(':')) {
      const [statusKey, ...msgParts] = error.split(':');
      const errorMessage = msgParts.join(':').trim();

      if (HttpStatus[statusKey as keyof typeof HttpStatus]) {
        status = HttpStatus[statusKey as keyof typeof HttpStatus];
        message = errorMessage;
      }
    }

    throw new HttpException(message, status);
  }
}
