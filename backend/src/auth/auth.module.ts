import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Admin } from '../admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { SessionSerializer } from './serializers/session.serializer';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AdminModule,
    PassportModule.register({ session: true }),
  ],
  providers: [
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
