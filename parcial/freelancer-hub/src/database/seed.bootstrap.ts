import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class SeedBootstrap implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  onApplicationBootstrap(): Promise<void> | void {
    if (process.env.SKIP_AUTO_SEED === 'true') {
      return;
    }

    return this.seedService.run();
  }
}
