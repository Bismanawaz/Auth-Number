import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    userId:number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}