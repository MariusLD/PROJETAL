import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('mail-service') private readonly client: ClientProxy,
      ) {}
      public async send(pattern: string, to: string, from: string, subject: string, body: string): Promise<any> { 
        this.client.send(
          pattern, JSON.stringify({
            to: to,
            from: from, 
            subject: subject,
            body: body
          })).subscribe((data) => {return data});
      }

}
