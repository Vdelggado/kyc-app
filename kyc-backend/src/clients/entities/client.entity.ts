import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients', { schema: 'dbo' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 120 })
  name: string;

  @Column({ type: 'nvarchar', length: 60, unique: true })
  dni: string;

  @Column({ type: 'nvarchar', length: 80, nullable: true })
  nationality: string;

  @Column({ type: 'nvarchar', length: 160 })
  economicActivity: string;

  @Column({ type: 'nvarchar', length: 160 })
  sourceOfFunds: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  estimatedMonthlyAmount: number;

  @Column({ type: 'bit', default: false })
  useOfThirdParties: boolean;
}
