import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {
    @ApiProperty({
        description: 'The list of users\'s ids',
        example: "[1, 2, 3]",
        type: [Number],
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Les ptits filous",
        type: String,
    })
    public name: string;
}