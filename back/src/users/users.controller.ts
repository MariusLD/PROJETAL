import { Controller, Get, Body, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService
    ) { }

    @ApiResponse({
        description: "Returns a lit of all users",
        type: [UserInput],
    })
    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @ApiResponse({
        description: "Returns a specified user",
        type: UserInput,
    })
    @Get(':id')
    async getByID(@Param('id') parameter: number): Promise<User> {
        return this.service.getByID(parameter);
    }

    @ApiResponse({
        description: "Creates a new user",
        type: UserInput,
    })
    @Post()
    async create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }

    @ApiResponse({
        description: "Update a specified user",
        type: UserInput,
    })
    @Put(':id')
    async edit(@Param('id') parameter: number, @Body() input: UserInput): Promise<User> {
        return this.service.edit(parameter, input.lastname, input.firstname, input.age, input.password);
    }

    @ApiResponse({
        description: "Delete a specified user",
    })
    @Delete(':id')
    async popFromUsers(@Param('id') parameter: number) {
        await this.service.popFromUsers(parameter);
    }
}