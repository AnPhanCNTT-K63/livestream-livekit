import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivekitService } from './livekit.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 this loads .env
  ],
  controllers: [AppController],
  providers: [AppService, LivekitService],
})
export class AppModule {}
