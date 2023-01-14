import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MailInput } from './mail.input';
import { RabbitMQService } from './rabbit-mq.service';

@ApiTags('mail')
@Controller()
export class RabbitMQController {
    constructor(
        private service: RabbitMQService,
    ) {}

    @Post()
    @ApiCreatedResponse({
        description: 'The message has been sent.'
    })
    public async create(@Body() input: MailInput): Promise<any>{
        console.warn(input);
        return this.service.send('mail', input.from, input.to, input.subject, input.body);
    }
}
