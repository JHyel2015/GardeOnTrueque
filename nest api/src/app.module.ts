import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AdsModule } from './ads/ads.module';
import { ChangesModule } from './changes/changes.module';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    AdsModule,
    ChangesModule,
    PlantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
