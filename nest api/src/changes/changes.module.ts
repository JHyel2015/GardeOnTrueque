import { Module } from '@nestjs/common';
import { ChangesController } from './changes.controller';
import { ChangesService } from './changes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityChanges} from './changes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityChanges])],
  controllers: [ChangesController],
  providers: [ChangesService],
  exports: [ChangesService],
})
export class ChangesModule {}
