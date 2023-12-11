import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Question } from './schemas/question.schema';
import CreateQuestionDto from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly QuestionService: QuestionService) {}
  @Get()
  findAll(@Query('category') category: string) {
    if (!category) return this.QuestionService.findAll();
    return this.QuestionService.search(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.QuestionService.findOne(id);
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.QuestionService.create(createQuestionDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.QuestionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.QuestionService.delete(id);
  }
}
