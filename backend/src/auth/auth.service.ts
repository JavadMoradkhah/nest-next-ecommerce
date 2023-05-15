import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { SessionAdminUser } from 'src/interfaces/session-admin-user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminsRepo: Repository<Admin>,
  ) {}

  async validateAdminCredentials(
    username: string,
    password: string,
  ): Promise<SessionAdminUser | null> {
    const admin = await this.adminsRepo.findOneBy({ username });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      return {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      };
    }

    return null;
  }

  async login(req: Express.Request) {
    return req.user;
  }

  me(req: Express.Request) {
    return req.user;
  }
}
