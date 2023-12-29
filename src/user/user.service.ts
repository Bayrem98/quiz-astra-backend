import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { QuizResponse } from 'src/quizresponse/schemas/quizresponse.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password').exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByUsername(createUserDto.username);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await bcrypt.hash(createdUser.password, 10);
    return createdUser.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise</*UpdateResult*/ any> {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.userModel.deleteOne({ _id: id });
  }

  async saveQuizAnswers(
    id: string,
    quizResponses: QuizResponse[],
  ): Promise<User> {
    // ... (Vérifiez l'ID, validez les réponses, etc.)
    if (!Array.isArray(quizResponses)) {
      throw new HttpException(
        'Invalid quizResponses format',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Récupérez les réponses existantes de l'utilisateur
    const existingUser = await this.userModel.findOne({ _id: id }).exec();
    const existingResponses = existingUser
      ? existingUser.quizResponses || []
      : [];

    // Fusionnez les nouvelles réponses avec les anciennes
    const mergedResponses = [...existingResponses, ...quizResponses];

    // Mettez à jour les réponses de l'utilisateur
    const result = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { quizResponses: mergedResponses } },
      { new: true },
    );

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async getQuizAnswers(id: string): Promise<User> {
    const isValidObjectId = Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      throw new NotFoundException('Invalid user ID');
    }
    // Retrieve the user by ID
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUseranswer(id: string, updatedUser: User): Promise<User> {
    const isValidObjectId = Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedUser },
        { new: true },
      );

      if (!result) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      console.error('Error in updateQuizAnswers:', error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
