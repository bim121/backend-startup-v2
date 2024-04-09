import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
 
export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
 
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
 
export default CreateChargeDto;