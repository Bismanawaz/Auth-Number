import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { IsNotEmpty } from "class-validator";

@Entity('product-entity')

export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column('decimal')
    price: number;

    @Column()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;


    @Column({ nullable: false, type: 'int'})
    userId:number;

    // @Column({ type: 'varchar', nullable:false })
    // title:string;

    // @Column({ type: 'varchar', nullable: false })
    // imageUrl:string;

    // @Column({ type: 'varchar', nullable: false })
    // category: string;

}