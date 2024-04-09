import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
 
@Injectable()
export default class StripeService {
  private stripe: Stripe;
  private customerId: string = "";
  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  public async createCustomer(name: string, email: string) {
    const customer = this.stripe.customers.create({
      name,
      email
    });
    this.customerId = (await customer).id;
    return customer;
  }
  
  public async charge(amount: number, paymentMethodId: string, name: string, email: string) {
    await this.createCustomer(name, email);
    return this.stripe.paymentIntents.create({
      amount,
      customer: this.customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirm: true,
      return_url: "http://localhost:3000/shop"
    })
  }
}