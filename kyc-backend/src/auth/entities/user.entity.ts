import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user', { schema: 'dbo' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'smallint' })
  emailVerified: boolean;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  role: string;

  @Column({ type: 'smallint', nullable: true })
  banned: boolean;

  @Column({ type: 'varchar', length: 'MAX', nullable: true })
  banReason: string;

  @Column({ type: 'datetime2', precision: 3, nullable: true })
  banExpires: Date;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  createdAt: Date;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  updatedAt: Date;
}
