import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk } from '../clients/entities/risk.entity';
import { Client } from '../clients/entities/client.entity';

export interface RiskEvaluationResult {
  level: 'BAJO' | 'MEDIO' | 'ALTO';
  alerts: Array<{ type: string; message: string }>;
}

@Injectable()
export class RiskService {
  constructor(
    @InjectRepository(Risk)
    private readonly riskRepository: Repository<Risk>,
  ) {}

  evaluateRisk(client: Partial<Client>): RiskEvaluationResult {
    let level: 'BAJO' | 'MEDIO' | 'ALTO' = 'BAJO';
    const alerts: Array<{ type: string; message: string }> = [];

    const isForeign = !!client.nationality && client.nationality.toLowerCase() !== 'panamá' && client.nationality.toLowerCase() !== 'panama';
    const isCash = !!client.sourceOfFunds && client.sourceOfFunds.toLowerCase() === 'efectivo';
    const amount = Number(client.estimatedMonthlyAmount) || 0;

    // Rule: Missing information
    if (!client.nationality || !client.economicActivity || !client.sourceOfFunds) {
      level = 'ALTO';
      alerts.push({ type: 'DATOS_INCOMPLETOS', message: 'Falta de información clave (Nacionalidad, Actividad u Origen de fondos).' });
    }

    // Rule: Explicit Use of Third Parties
    if (client.useOfThirdParties) {
      level = 'ALTO';
      alerts.push({ type: 'USO_TERCEROS', message: 'El cliente declaró uso indirecto de fondos de terceros.' });
    }

    // Rule: Foreign + High Cash
    if (isForeign && isCash && amount > 10000) {
      level = 'ALTO';
      alerts.push({ type: 'RIESGO_GEOGRAFICO_EFECTIVO', message: 'Cliente extranjero con alto uso de efectivo.' });
    }

    // Rule: High Cash Only
    if (isCash && amount > 5000) {
      if (level !== 'ALTO') level = 'MEDIO';
      alerts.push({ type: 'EFECTIVO_ALTO', message: 'Monto de efectivo supera umbral regular.' });
    }

    return { level, alerts };
  }

  async saveRiskEvaluation(clientId: number, level: string): Promise<Risk> {
    const risk = this.riskRepository.create({ clientId, riskLevel: level, });
    return await this.riskRepository.save(risk);
  }
}
