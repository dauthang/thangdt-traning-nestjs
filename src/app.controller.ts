import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformInterceptor } from './components/interceptors/transform.interceptor';

@Controller()
@UseInterceptors(new TransformInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
