import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsNotEmpty()
  economicActivity: string;

  @IsString()
  @IsNotEmpty()
  sourceOfFunds: string;

  @IsNumber()
  @Min(0)
  estimatedMonthlyAmount: number;

  @IsBoolean()
  @IsOptional()
  useOfThirdParties?: boolean;
}
