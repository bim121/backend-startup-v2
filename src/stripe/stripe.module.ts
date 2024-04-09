import { Module } from '@nestjs/common';
import StripeService from './stripe.service';
import ChargeController from './charge.controller';


@Module({
  imports: [],
  providers: [StripeService],
  controllers: [ChargeController], 
  exports: [StripeService]
})
export class StripeModule {}