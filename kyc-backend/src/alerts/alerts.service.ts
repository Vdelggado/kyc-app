import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskAlert } from './entities/risk-alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(RiskAlert)
    private readonly alertRepository: Repository<RiskAlert>,
  ) {}

  async createAlert(clientId: number, type: string, message: string): Promise<RiskAlert> {
    const alert = this.alertRepository.create({
      clientId,
      type,
      message,
    });
    return await this.alertRepository.save(alert);
  }

  async findAllByClient(clientId: number): Promise<RiskAlert[]> {
    return await this.alertRepository.find({
      where: { clientId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<RiskAlert[]> {
    return await this.alertRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
