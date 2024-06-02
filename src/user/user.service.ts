import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from '../entity/user.entity';
import { toUserDto } from "src/shared/mapper";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "src/Auth/jwt.strategy";
import Role from "src/enum/role.enum";
import { UserDto } from "src/dto/user-dto";
import { LoginUserDto } from "src/dto/user-login-dto";
import { CreateUserDto } from "src/dto/user-create-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepo: Repository<UserEntity> ) {}
    
    async findOne(options?: object): Promise<UserDto> {
        const user =  await this.userRepo.findOne(options);    
        return toUserDto(user);  
    }

    async getByUsername(username: string): Promise<UserEntity> {
        const user =  await this.userRepo.findOne({where: {username}});    
        return user;  
    }
   
    async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepo.findOne({ where: { email } });
        
        
        if (!user) {
            throw new HttpException('User not found',  HttpStatus.UNAUTHORIZED);    
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async findByPayload({ username }: JwtPayload): Promise<UserDto> { 
        return await this.findOne({ 
            where:  { username } });  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email, role } = userDto;
        
        const userInDb = await this.userRepo.findOne({ 
            where: { username } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); //refactor exception   
        }
        const roles = (<any>Role)[role];
        const user: UserEntity = await this.userRepo.create({ username, password, email, roles});
        await this.userRepo.save(user);

        return toUserDto(user);  
    }
}