import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private adminService: AdminService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error | null, user: any) => void,
  ): Promise<void> {
    const user = await this.adminService.findOne(id);
    done(null, user);
  }
}
