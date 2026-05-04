import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('verification', { schema: 'dbo' })
export class Verification {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 'MAX' })
  identifier: string;

  @Column({ type: 'varchar', length: 'MAX' })
  value: string;

  @Column({ type: 'datetime2', precision: 3 })
  expiresAt: Date;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  createdAt: Date;

  @Column({ type: 'datetime2', precision: 3, default: () => 'getdate()' })
  updatedAt: Date;
}
