import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class AppService {
  constructor() {}
  async getStatus() {
    // objeto resultado del proceso de consulta
    const data = {
      mensaje: 'Servicio funcionando correctamente',
      fecha: dayjs().valueOf(),
    };
    return data;
  }
}
