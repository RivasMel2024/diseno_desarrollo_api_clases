import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe: InstanceType<typeof Stripe>;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new InternalServerErrorException(
        'STRIPE_SECRET_KEY no está configurado en .env',
      );
    }
    this.stripe = new Stripe(secretKey);
  }

  async createDepositIntent(
    amountCents: number,
    rentalId: string,
    userEmail: string,
  ): Promise<{ paymentIntentId: string; clientSecret: string }> {
    const intent = await this.stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      metadata: { rentalId },
      receipt_email: userEmail,
      automatic_payment_methods: { enabled: true },
    });

    if (!intent.client_secret) {
      throw new InternalServerErrorException(
        'Stripe no devolvió client_secret',
      );
    }

    return {
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
    };
  }

  async getPaymentIntentStatus(paymentIntentId: string): Promise<string> {
    const intent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return intent.status;
  }
}
