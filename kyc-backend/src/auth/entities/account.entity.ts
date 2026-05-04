import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('account', { schema: 'dbo' })
export class Account {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 'MAX' })
  accountId: string;

  @Column({ type: 'varchar', length: 'MAX' })
  providerId: string;

  @Column({ type: 'varchar', length: 36 })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  accessToken: string;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  idToken: string;

  @Column({ type: 'datetime2', precision: 3, nullable: true })
  accessTokenExpiresAt: Date;

  @Column({ type: 'datetime2', precision: 3, nullable: true })
  refreshTokenExpiresAt: Date;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  scope: string;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  password: string;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  createdAt: Date;

  @Column({ type: 'datetime2', precision: 3 })
  updatedAt: Date;
}
