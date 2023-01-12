import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MailInput } from './mail.input';
import { RabbitMQService } from './rabbit-mq.service';

@ApiTags('rabbit-mq')
@Controller('rabbit-mq')
export class RabbitMQController {
    constructor(
        private service: RabbitMQService,
    ) {}

    @Post()
    @ApiCreatedResponse({
        description: 'The message has been sent.'
    })
    public async create(@Body() input: MailInput): Promise<any>{
        return this.service.send('mail', input);
    }
}
