import { Controller, Get, Post, Res, Body, Param, Put, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { EntityPlants } from './plants.entity';
import { CreatePlantDTO } from './dto/plant.dto';

@Controller('plants')
export class PlantsController {

    constructor(private plantService: PlantsService) {

    }

    @Get()
    async findAll( @Res() res): Promise<EntityPlants[]> {
        const plants = await this.plantService.findAll();
        return res.status(HttpStatus.OK).json(plants);
    }

    @Get(':id')
    async findOne(
        @Res() res,
        @Param('id') id: string,
    ) {
        const plant = await this.plantService.findOne(id);
        if (!plant) { throw new NotFoundException('Plant does not exist!'); }
        return res.status(HttpStatus.OK).json(plant);
    }

    @Post('/create')
    async createPlant(
        @Res() res,
        @Body() createPlantDTO: CreatePlantDTO,
    ) {
        const plant = await this.plantService.createPlant(createPlantDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Plant created Successfully',
            plant,
        });
    }

    @Put('/update')
    async updatePlant(
        @Res() res,
        @Body() createPlantDTO: CreatePlantDTO,
        @Query('id') id: string,
    ) {
        const updatedPlant = await this.plantService.updatePlant(id, createPlantDTO);
        if (!updatedPlant) { throw new NotFoundException('Plant does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Plant updated successfully',
            updatedPlant,
        });
    }
}
