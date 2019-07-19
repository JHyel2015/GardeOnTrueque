import { Controller, Get, Post, Body, Res, Param, Put, HttpStatus, NotFoundException, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from './interfaces/user';
import { EntityUsers } from './users.entity';
import { CreateUserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    async findAll( @Res() res): Promise<EntityUsers> {
        const users = await this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('create')
    async createUser(
        @Body() user: UserInterface,
        @Res() res,
        @Req() req,
    ) {
        const createdUser = await this.userService.createUser(user);
        return res.status(HttpStatus.OK).json({
            message: 'User created Successfully',
            usuario: createdUser,
        });
    }

    @Put('update')
    async updateUser(
        @Res() res,
        @Body() user: UserInterface,
        @Query('id') id: string,
    ) {
        const updatedUser = await this.userService.updateUser(id, user);
        if (!updatedUser) { throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'User updated successfully',
            updatedUser,
        });
    }
    @Get(':id')
    async findOne(
        @Res() res,
        @Param('id') id: string,
    ) {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(user);
    }
}
