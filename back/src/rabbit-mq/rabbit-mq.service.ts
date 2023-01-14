import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('mail-service') private readonly client: ClientProxy,
      ) {}
      public async send(pattern: string, from: string, to: string, subject: string, body: string): Promise<any> { 
        this.client.send(
          pattern, JSON.stringify({
            from: from,
            to: to, 
            subject: subject,
            body: body
          })).subscribe((data) => {return data});
      }

}
