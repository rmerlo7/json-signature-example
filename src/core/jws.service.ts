import { Injectable } from '@nestjs/common';
import * as jws from 'jws';
import * as fs from 'fs';
import { SignatureDTO } from './signature.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class JwsService {
  // TODO: llevar a un archivo de configuración .env
  // TODO: las llaves deberían estar en un contenedor .p12
  private readonly privateKeyPath = './keys/privada.pem';
  private readonly publicKeyPath = './keys/publica.pem';

  // Crear un token firmado con la clave privada
  async sign(payload: any) {
    const privateKey = await this.readFileAsync(this.privateKeyPath);
    const options = {
      header: { alg: 'RS512' },
      payload,
      secret: privateKey,
    };
    const signature: string = jws.sign(options);
    const signatureArray = signature.split('.');
    const result: SignatureDTO = {
      payload: signatureArray[1],
      protected: signatureArray[0],
      header: { kid: uuid() },
      signature: signatureArray[2],
    };
    return result;
  }

  // Verificar y decodificar un token utilizando la clave pública
  async verify(signature, algorithm) {
    try {
      const publicKey = await this.readFileAsync(this.publicKeyPath);
      return jws.verify(signature, algorithm, publicKey);
    } catch (error) {
      // Manejo de errores en caso de que el token no sea válido
      throw new Error('Firma inválido');
    }
  }

  async readFileAsync(filePath: string) {
    try {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
