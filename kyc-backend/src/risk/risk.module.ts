import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskService } from './risk.service';
import { Risk } from '../clients/entities/risk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Risk])],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
