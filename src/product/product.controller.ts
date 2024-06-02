import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductDto } from "src/dto/create-product-dto";
import { ProductService } from "./product.service";
import { UpdateProductDto } from "src/dto/update-product-dto";

@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    async addProduct(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateProductDto) {
       return await this.productService.createProduct(dto, file);
    }

    @Get()
    async getAll(){
        return this.productService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.productService.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async update(@UploadedFile() file: Express.Multer.File, @Body() dto: UpdateProductDto) {
        return this.productService.updateProduct(dto, file);
    }
}