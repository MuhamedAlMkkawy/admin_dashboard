import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pages } from './pages/entities/pages.entities';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';
import { Features } from './features/entities/features.entities';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistics } from './statistics/entities/statistics.entities';
import { ClientsModule } from './clients/clients.module';
import { Clients } from './clients/entities/clients.entities';
import { PortalsModule } from './portals/portals.module';
import { Portals } from './portals/entities/portals.entities';
import { FaqModule } from './faq/faq.module';
import { Faq } from './faq/entities/faq.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      synchronize: true, // only for development
      autoLoadEntities: true,
      entities: [Pages , Features , Statistics , Clients , Portals , Faq],
    }),
    PagesModule,
    FeaturesModule,
    StatisticsModule,
    ClientsModule,
    PortalsModule,
    FaqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
