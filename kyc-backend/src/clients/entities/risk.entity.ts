import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('risks', { schema: 'dbo' })
export class Risk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  clientId: number;

  @Column({ type: 'nvarchar', length: 50 })
  riskLevel: string;

  @Column({ type: 'datetime', default: () => 'getdate()' })
  evaluatedAt: Date;
}
