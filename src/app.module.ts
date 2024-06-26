import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./Auth/auth.module";
import * as path from 'path'
import { ConfigModule } from "@nestjs/config";
import * as Joi from '@hapi/joi'
import { DatabaseModule } from "./database/database";
import { StripeModule } from "./stripe/stripe.module";
import { ProductModule } from "./product/product.module";

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true
      }),
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
      ConfigModule.forRoot({
        validationSchema: Joi.object({
          POSTGRES_HOST: Joi.string().required(),
          POSTGRES_PORT: Joi.number().required(),
          POSTGRES_USER: Joi.string().required(),
          POSTGRES_PASSWORD: Joi.string().required(),
          POSTGRES_DB: Joi.string().required(),
          PORT: Joi.number(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION_TIME: Joi.string().required(),
          STRIPE_SECRET_KEY: Joi.string(),
          STRIPE_CURRENCY: Joi.string(),
          FRONTEND_URL: Joi.string(),
        })
      }),
        AuthModule,
        DatabaseModule,
        StripeModule,
        ProductModule
      ]
})
export class AppModule{

}