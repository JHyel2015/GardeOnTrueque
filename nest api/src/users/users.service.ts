import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUsers } from './users.entity';
import { UserInterface } from './interfaces/user';

@Injectable()
export class UsersService {

    constructor(
      @InjectRepository(EntityUsers)
      private userRepository: Repository<EntityUsers>) {
        this.user = [
            {
              id: 1,
              uid: 'AAAAAAAA',
              username: 'elgeorh',
              email: 'elgeorh@gmail.com',
              password: 'JHeredia95',
            },
            {
              id: 2,
              uid: 'BBBBBBB',
              username: 'chris',
              email: 'chris@gardeontruque.com',
              password: 'secret',
            },
            {
              id: 3,
              uid: 'CCCCCCC',
              username: 'maria',
              email: 'maria@gardeontrueque.com',
              password: 'guess',
            },
          ];
    }
    user: UserInterface[];
    // async findOne(username: string): Promise<UserInterface> {
    //     return this.user.find(user => user.username === username);
    // }

    async findAll(): Promise<UserInterface[]> {
      return await this.userRepository.find();
    }

    async findOne(id: string): Promise<UserInterface> {
      // return await this.userRepository.findOne(id);
      const user = await this.userRepository.findOne({ uid: id });
      return user;
    }

    async createUser(user: UserInterface): Promise<UserInterface> {
      const newUser = await this.userRepository.create(user);
      // await this.userRepository.save(newUser);
      return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, user: UserInterface): Promise<UserInterface> {
      const updatedUser = await this.userRepository.findOne({ uid: id });
      await this.userRepository.update({ uid: id }, user);
      return updatedUser;
    }
}
