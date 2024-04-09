
import { IsEmail, IsNotEmpty } from "class-validator";
import Role from "src/enum/role.enum";

export class UserDto {  
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    roles: Role[];
}