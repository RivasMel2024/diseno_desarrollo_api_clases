import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  public constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  public async getStats() {
    return this.dashboardService.getStats();
  }

  @Get(':userId')
  public async getDashboard(@Param('userId') userId: string, @Query('role') role?: string) {
    return this.dashboardService.getDashboard(userId, role);
  }

  @Delete(':userId/cache')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async invalidateCache(@Param('userId') userId: string): Promise<void> {
    await this.dashboardService.invalidate(userId);
  }
}
