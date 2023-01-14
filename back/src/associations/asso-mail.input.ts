import { ApiProperty } from "@nestjs/swagger";

export class AssoMailInput {
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