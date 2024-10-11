import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]),HttpModule,PassportModule],
    providers: [ProductService],
    controllers: [ProductController],

})
export class ProductModule { }
