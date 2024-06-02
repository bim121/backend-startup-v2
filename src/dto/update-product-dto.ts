import { IsNotEmpty } from "class-validator";

export class UpdateProductDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    id: number;
}