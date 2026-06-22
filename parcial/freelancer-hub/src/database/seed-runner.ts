import 'dotenv/config';

process.env.SKIP_AUTO_SEED = 'true';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function runSeed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  await app.get(SeedService).run();
  await app.close();
}

runSeed().catch((error: unknown) => {
  console.error('Error ejecutando seed:', error);
  process.exit(1);
});
