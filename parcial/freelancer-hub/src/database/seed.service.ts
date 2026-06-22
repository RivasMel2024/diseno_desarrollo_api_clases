import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { USER_SEED_DATA } from './seeds/user.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Ejecutando seed de usuarios...');

    for (const userData of USER_SEED_DATA) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        this.logger.log(`Usuario ya existe: ${userData.email}`);
        continue;
      }

      await this.usersRepository.save(userData);
      this.logger.log(`Usuario creado: ${userData.email}`);
    }

    this.logger.log('Seed de usuarios finalizado');
  }
}
