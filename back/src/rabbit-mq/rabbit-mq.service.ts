import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('RABBIT_MQ') private readonly client: ClientProxy,
      ) {}
      public async send(pattern: string, input: any): Promise<any> { 
        this.client.send(pattern, JSON.stringify(input))
          .subscribe((data) => {return data});
      }

}
