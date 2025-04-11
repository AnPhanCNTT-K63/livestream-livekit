import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LivekitService } from './livekit.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly livekitService: LivekitService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('livestream')
  async getToken(@Query('room') room: string, @Query('user') user: string) {
    const token = await this.livekitService.generateToken(user, room);
    return { token };
  }
}
