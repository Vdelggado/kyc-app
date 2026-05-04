import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { RiskAlert } from './entities/risk-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskAlert])],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
