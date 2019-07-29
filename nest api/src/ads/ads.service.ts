import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityAds } from '../ads/ads.entity';
import { CreateAdDTO } from './dto/ad.dto';

@Injectable()
export class AdsService {

    constructor(
      @InjectRepository(EntityAds)
      private adRepository: Repository<EntityAds>) {
    }
    // ad: AdInterface[];
    // async findOne(adname: string): Promise<AdInterface> {
    //     return this.ad.find(ad => ad.adname === adname);
    // }

    async findAll(): Promise<EntityAds[]> {
      return await this.adRepository.find({ relations: ['user', 'plant']});
    }

    async findOne(id: string): Promise<EntityAds> {
      return await this.adRepository.findOne(id, { relations: ['user', 'plant']});
    }

    async createAd(createAdDTO: CreateAdDTO): Promise<EntityAds> {
      const newAd = await this.adRepository.create(createAdDTO);
      await this.adRepository.save(newAd);
      return newAd;
    }

    async updateAd(id: string, createAdDTO: Partial<CreateAdDTO>): Promise<EntityAds> {
      const updatedAd = await this.adRepository.findOne(id);
      await this.adRepository.update(id, createAdDTO);
      return updatedAd;
    }
}
