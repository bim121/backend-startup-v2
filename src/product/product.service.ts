import { Injectable, HttpException, HttpStatus, ForbiddenException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "src/dto/create-product-dto";
import { ProductEntity } from "src/entity/product.entity";
import { Repository } from "typeorm";
import * as streamifier from 'streamifier';
import {UploadApiErrorResponse, UploadApiResponse, v2} from 'cloudinary';
import { UpdateProductDto } from "src/dto/update-product-dto";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)    
        private readonly productRepo: Repository<ProductEntity>,
    ) {}

    async createProduct(productDto: CreateProductDto, file: Express.Multer.File): Promise<ProductEntity> {    
        const {  name, price } = productDto;
        
        const productInDb = await this.productRepo.findOne({ 
            where: { name } 
        });

        if (productInDb) {
            throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);    
        }

        const image = await new Promise<UploadApiErrorResponse | UploadApiResponse>(
            (resolve, reject) => {
                const upload = v2.uploader.upload_stream((error, result) => {
                    if(error) reject(error);
                    resolve(result);
                });
                streamifier.createReadStream(file.buffer).pipe(upload);
            }
        );

        const productObject: ProductEntity = this.productRepo.create({ name, price, image: image.secure_url });
        await this.productRepo.save(productObject);

        return productObject;  
    }

    async getAll(): Promise<ProductEntity[]> {
        return this.productRepo.find();
    }

    async getOne(id: number): Promise<ProductEntity> {
        return this.productRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        this.productRepo.delete({ id });
    }

    async updateProduct(productDto: UpdateProductDto, file: Express.Multer.File): Promise<ProductEntity> {
        const { name, price, id } = productDto;

        const product = await this.productRepo.findOne({ where: { id } });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        const image = await new Promise<UploadApiErrorResponse | UploadApiResponse>(
            (resolve, reject) => {
                const upload = v2.uploader.upload_stream((error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
                streamifier.createReadStream(file.buffer).pipe(upload);
            }
        );

        product.image = image.secure_url;
        product.name = name;
        product.price = price;

        await this.productRepo.save(product);

        return product;
    }
}