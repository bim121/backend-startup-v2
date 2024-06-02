import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('product')
export class ProductEntity {  
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;
    @Column({ 
        type: 'varchar',  
    }) 
    name: string;
    @Column({ 
        type: 'varchar', 
    }) 
    price: number;  
    @Column({ 
        type: 'varchar', 
        nullable: true
    }) 
    image: string;
}