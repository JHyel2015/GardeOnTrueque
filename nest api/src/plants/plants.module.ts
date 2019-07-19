import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityPlants } from './plants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityPlants])],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [PlantsService],
})
export class PlantsModule {}
