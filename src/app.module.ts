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
import { HomeModule } from './home/home.module';
import { Home } from './home/entities/home.entities';
import { AboutModule } from './about/about.module';
import { About } from './about/entities/about.entities';
import { PortalsPageModule } from './portals_page/portals-page.module';
import { PortalsPage } from './portals_page/entities/PortalsPage.entities';
import { AuthModule } from './auth/auth.module';
import { Users } from './auth/entities/users.entities';
import { FeaturesPageModule } from './features_page/features_page.module';
import { FeaturesPage } from './features_page/entities/FeaturesPage.entities';
import { ModulesPageModule } from './modules_page/modules_page.module';
import { ModulesPage } from './modules_page/entities/modulesPage.entitites';

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
      entities: [
        Pages , 
        Features , 
        Statistics , 
        Clients , 
        Portals , 
        Faq,
        Home,
        About,
        PortalsPage,
        Users,
        FeaturesPage,
        ModulesPage
      ],
    }),
    PagesModule,
    FeaturesModule,
    StatisticsModule,
    ClientsModule,
    PortalsModule,
    FaqModule,
    HomeModule,
    AboutModule,
    PortalsPageModule,
    AuthModule,
    FeaturesPageModule,
    ModulesPageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
