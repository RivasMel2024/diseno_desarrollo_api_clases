import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServicesService } from '../services/services.service';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  getServices(): Promise<
    Array<{ title: string; category: string; price: number; providerName: string }>
  > {
    return this.servicesService.findAllPublic();
  }
}
