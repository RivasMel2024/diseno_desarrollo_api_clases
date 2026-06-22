import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async create(providerId: number, createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create({
      ...createServiceDto,
      provider: { id: providerId } as User,
    });

    return this.servicesRepository.save(service);
  }

  async findAllPublic(): Promise<
    Array<{ title: string; category: string; price: number; providerName: string }>
  > {
    const services = await this.servicesRepository.find({
      relations: { provider: true },
      order: { id: 'DESC' },
    });

    return services.map((service) => ({
      title: service.title,
      category: service.category,
      price: Number(service.price),
      providerName: service.provider.name,
    }));
  }
}
