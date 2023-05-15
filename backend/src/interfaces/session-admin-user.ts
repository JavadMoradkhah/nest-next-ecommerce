import { AdminRole } from 'src/admin/entities/admin.entity';

export interface SessionAdminUser {
  id: string;
  username: string;
  role: AdminRole;
}
