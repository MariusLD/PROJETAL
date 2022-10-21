import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    public id: number;
    public lastname: string;
    public firstname: string;
    public age: number;

    constructor(
        id: number,
        lastname: string,
        firstname: string,
        age: number
    ) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
    }
}