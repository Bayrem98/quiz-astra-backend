import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from './user.interceptor';
import { LocalStrategy } from './local.strategy';
import { AdminuserModule } from 'src/adminuser/adminuser.module';

export const jwtConstants = {
  secret: 'g§ueve45u§eyvZeicne',
};

@Module({
  imports: [
    AdminuserModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 8 + 's' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CurrentUserInterceptor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
