import { ApiProperty } from "@nestjs/swagger";

export class MailInput {
    @ApiProperty({
        description: 'The sender',
        example: "admin@les-petits-filous.fr",
        type: String,
    })
    public from: string;

    @ApiProperty({
        description: 'The receiver',
        example: "john.doe@gmail.com",
        type: String,
    })
    public to: string;

    @ApiProperty({
        description: 'The subject',
        example: "You have been invited for an event",
        type: String,
    })
    public subject: string;

    @ApiProperty({
        description: 'The body',
        example: "You should come, it will be fun.\n\nRegards,\nAdmin",
        type: String
    })
    public body: string;
}