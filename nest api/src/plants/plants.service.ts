import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityPlants } from '../plants/plants.entity';
import { CreatePlantDTO } from './dto/plant.dto';

@Injectable()
export class PlantsService {

    constructor(
      @InjectRepository(EntityPlants)
      private plantRepository: Repository<EntityPlants>) {
    }
    // plant: PlantInterface[];
    // async findOne(plantname: string): Promise<PlantInterface> {
    //     return this.plant.find(plant => plant.plantname === plantname);
    // }

    async findAll(): Promise<EntityPlants[]> {
      return await this.plantRepository.find();
    }

    async findOne(id: string): Promise<EntityPlants> {
      return await this.plantRepository.findOne(id);
    }

    async createPlant(createPlantDTO: CreatePlantDTO): Promise<EntityPlants> {
      const newPlant = await this.plantRepository.create(createPlantDTO);
      await this.plantRepository.save(newPlant);
      return newPlant;
    }

    async updatePlant(id: string, createPlantDTO: Partial<CreatePlantDTO>): Promise<EntityPlants> {
      const updatedPlant = await this.plantRepository.findOne(id);
      await this.plantRepository.update(id, createPlantDTO);
      return updatedPlant;
    }
}
