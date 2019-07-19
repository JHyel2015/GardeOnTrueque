import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUsers } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityUsers], 'default')],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
