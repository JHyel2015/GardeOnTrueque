import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityChanges } from '../changes/changes.entity';
import { CreateChangeDTO } from './dto/change.dto';

@Injectable()
export class ChangesService {

    constructor(
      @InjectRepository(EntityChanges)
      private changeRepository: Repository<EntityChanges>) {
    }
    // change: ChangeInterface[];
    // async findOne(changename: string): Promise<ChangeInterface> {
    //     return this.change.find(change => change.changename === changename);
    // }

    async findAll(): Promise<EntityChanges[]> {
      return await this.changeRepository.find();
    }

    async findOne(id: string): Promise<EntityChanges> {
      return await this.changeRepository.findOne(id);
    }

    async createChange(createChangeDTO: CreateChangeDTO): Promise<EntityChanges> {
      const newChange = await this.changeRepository.create(createChangeDTO);
      await this.changeRepository.save(newChange);
      return newChange;
    }

    async updateChange(id: string, createChangeDTO: Partial<CreateChangeDTO>): Promise<EntityChanges> {
      const updatedChange = await this.changeRepository.findOne(id);
      await this.changeRepository.update(id, createChangeDTO);
      return updatedChange;
    }
}
