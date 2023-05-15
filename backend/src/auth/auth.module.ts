import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Admin } from '../admin/entities/admin.entity';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { AdminLocalAuthGuard } from './guards/admin-local.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './serializers/session.serializer';
import { AdminModule } from 'src/admin/admin.module';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AdminModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AdminLocalStrategy,
    AdminLocalAuthGuard,
    AuthenticatedGuard,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
