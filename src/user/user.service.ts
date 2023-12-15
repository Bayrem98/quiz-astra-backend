import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
    userId: string,
    quizResponses: object[],
  ): Promise<User> {
    const isValidObjectId = Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    if (!quizResponses || quizResponses.length === 0) {
      throw new HttpException(
        'Quiz responses are empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Utilisez la méthode du modèle pour mettre à jour les réponses du quiz
    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { ...quizResponses, ...quizResponses } },
        { new: true },
      );

      if (!result) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      console.error('Error in saveQuizAnswers:', error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
