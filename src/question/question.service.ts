import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import CreateQuestionDto from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  async search(category: string, quizType: string) {
    const query = { category, quizType };
    return this.questionModel.find(query).exec();
  }

  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel({
      ...createQuestionDto,
    });
    return createdQuestion.save();
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise</*UpdateResult*/ any> {
    return this.questionModel.updateOne({ _id: id }, updateQuestionDto);
  }

  async findOne(id: string): Promise<Question> {
    return this.questionModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.questionModel.deleteOne({ _id: id });
  }
}
