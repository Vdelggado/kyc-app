import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { RiskService } from '../risk/risk.service';
import { AlertsService } from '../alerts/alerts.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly riskService: RiskService,
    private readonly alertsService: AlertsService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // 1. Save the basic client data
    const client = this.clientRepository.create(createClientDto);
    const savedClient = await this.clientRepository.save(client);

    // 2. Delegate Risk logic (SRP)
    const { level, alerts } = this.riskService.evaluateRisk(createClientDto);

    // 3. Save calculated risk
    await this.riskService.saveRiskEvaluation(savedClient.id, level);

    // 4. Delegate Alert creation (SRP)
    for (const alert of alerts) {
      await this.alertsService.createAlert(savedClient.id, alert.type, alert.message);
    }

    return savedClient;
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ order: { id: 'DESC' } });
  }

 async findOne(id: number): Promise<Client | null> {
  return await this.clientRepository.findOne({ where: { id } });
}
}
