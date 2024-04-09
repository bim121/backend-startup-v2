
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import CreateChargeDto from 'src/dto/createCharge.dto';
 
@Controller('charge')
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}
 
  @Post()
  async createCharge(@Body() charge: CreateChargeDto) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, charge.name, charge.email);
  }
}