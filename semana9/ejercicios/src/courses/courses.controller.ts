import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  public constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public async findAll() {
    return this.coursesService.findAll();
  }
}