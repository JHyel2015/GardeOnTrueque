import { Controller, Get, Post, Res, Body, Param, Put, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { ChangesService } from './changes.service';
import { EntityChanges } from './changes.entity';
import { CreateChangeDTO } from './dto/change.dto';

@Controller('changes')
export class ChangesController {

    constructor(private changeService: ChangesService) {

    }

    @Get()
    async findAll( @Res() res): Promise<EntityChanges[]> {
        const changes = await this.changeService.findAll();
        return res.status(HttpStatus.OK).json(changes);
    }

    @Get(':id')
    async findOne(
        @Res() res,
        @Param('id') id: string,
    ) {
        const change = await this.changeService.findOne(id);
        if (!change) { throw new NotFoundException('Change does not exist!'); }
        return res.status(HttpStatus.OK).json(change);
    }

    @Post('/create')
    async createChange(
        @Res() res,
        @Body() createChangeDTO: CreateChangeDTO,
    ) {
        const change = await this.changeService.createChange(createChangeDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Change created Successfully',
            change,
        });
    }

    @Put('/update')
    async updateChange(
        @Res() res,
        @Body() createChangeDTO: CreateChangeDTO,
        @Query('id') id: string,
    ) {
        const updatedChange = await this.changeService.updateChange(id, createChangeDTO);
        if (!updatedChange) { throw new NotFoundException('Change does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Change updated successfully',
            updatedChange,
        });
    }
}
