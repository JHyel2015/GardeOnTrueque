import { Controller, Get, Post, Res, Body, Param, Put, HttpStatus, NotFoundException, Query, Delete } from '@nestjs/common';
import { AdsService } from './ads.service';
import { EntityAds } from './ads.entity';
import { CreateAdDTO} from './dto/ad.dto';

@Controller('ads')
export class AdsController {

    constructor(private adService: AdsService) {

    }

    @Get()
    async findAll( @Res() res): Promise<EntityAds[]> {
        const ads = await this.adService.findAll();
        return res.status(HttpStatus.OK).json(ads);
    }

    @Get(':id')
    async findOne(
        @Res() res,
        @Param('id') id: string,
    ) {
        const ad = await this.adService.findOne(id);
        if (!ad) { throw new NotFoundException('Ad does not exist!'); }
        return res.status(HttpStatus.OK).json(ad);
    }

    @Post('/create')
    async createAd(
        @Res() res,
        @Body() createAdDTO: CreateAdDTO,
    ) {
        const ad = await this.adService.createAd(createAdDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Ad created Successfully',
            ad,
        });
    }

    @Put('/update')
    async updateAd(
        @Res() res,
        @Body() createAdDTO: CreateAdDTO,
        @Query('id') id: string,
    ) {
        const updatedAd = await this.adService.updateAd(id, createAdDTO);
        if (!updatedAd) { throw new NotFoundException('Ad does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Ad updated successfully',
            updatedAd,
        });
    }

    @Delete('/delete')
    async deleteAd(
        @Res() res,
        @Query('id') id: string,
    ) {
        await this.adService.deleteAd(id);
        return res.status(HttpStatus.OK).json({
            message: 'Ad deleted successfully',
        });
    }
}
