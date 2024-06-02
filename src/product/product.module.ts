import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entity/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CloudnianaryProvider } from "./cloudinary";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    controllers: [ProductController],
    providers: [ProductService, CloudnianaryProvider],
    exports: [ProductService]
})
export class ProductModule{
    
}