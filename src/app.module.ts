import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RuralProducerModule } from './modules/rural-producer/rural-producer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsModule } from './modules/planted-crops/planted-crops.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      poolSize: 5,
      extra: {
        connectionLimit: 5,
        idleTimeoutMillis: 10000,
      },
    }),
    RuralProducerModule,
    PlantedCropsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
