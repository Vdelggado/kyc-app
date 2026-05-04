import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('risk_alerts', { schema: 'dbo' })
export class RiskAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  clientId: number;

  @Column({ type: 'nvarchar', length: 100 })
  type: string;

  @Column({ type: 'nvarchar', length: 255 })
  message: string;

  @Column({ type: 'bit', default: 1 })
  isActive: boolean;

  @Column({ type: 'datetime', default: () => 'getdate()' })
  createdAt: Date;
}
