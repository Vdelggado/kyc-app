import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('session', { schema: 'dbo' })
export class Session {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'datetime2', precision: 3 })
  expiresAt: Date;

  @Column({ type: 'varchar', length: 255, unique: true })
  token: string;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  createdAt: Date;

  @Column({ type: 'datetime2', precision: 3 })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  userAgent: string;

  @Column({ type: 'varchar', length: 36 })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  impersonatedBy: string;
}
