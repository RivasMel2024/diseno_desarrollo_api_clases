import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { googleId } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createFromGoogle(profile: GoogleProfile): Promise<User> {
    if (!profile.googleId?.trim() || !profile.email?.trim() || !profile.name?.trim()) {
      throw new BadRequestException('Datos de Google incompletos para crear usuario');
    }

    const user = this.usersRepository.create({
      googleId: profile.googleId,
      email: profile.email,
      name: profile.name,
      role: UserRole.CUSTOMER,
    });
    return this.usersRepository.save(user);
  }

  async findOrCreateFromGoogle(profile: GoogleProfile): Promise<User> {
    const existing =
      (await this.findByGoogleId(profile.googleId)) ??
      (await this.findByEmail(profile.email));

    if (existing) {
      return existing;
    }

    return this.createFromGoogle(profile);
  }
}
