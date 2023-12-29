import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { User } from './user.interface';
import UpdateUserDto from './dto/update-user.dto';
import { UserService } from './user.service';
import { QuizResponse } from 'src/quizresponse/schemas/quizresponse.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.userService.findOne(_id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('saveanswers/:id')
  async saveAnswers(
    @Param('id') id: string,
    @Body() body: { quizResponses: QuizResponse[] },
  ): Promise<User> {
    return this.userService.saveQuizAnswers(id, body.quizResponses);
  }

  @Get('quizanswers/:id')
  userAnswers(@Param('id') id: string): Promise<User> {
    return this.userService.getQuizAnswers(id);
  }

  @Put('updateanswers/:id')
  async updateUseranswer(
    @Param('id') id: string,
    @Body() updatedUser: User,
  ): Promise<User> {
    return this.userService.updateUseranswer(id, updatedUser);
  }
}
