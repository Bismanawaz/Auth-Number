import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Any, Repository } from 'typeorm';
import axios, { AxiosStatic } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ProductEntity } from 'src/entities/product.entity';
import { HttpService } from '@nestjs/axios';



@Injectable()
export class ProductService {
    getAndSaveToDb() {
        throw new Error('Method not implemented.');
    }
    // private readonly logger = new Logger(ProductService.name);
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private readonly httpService: HttpService,

    ) { }

    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<ProductEntity> {
        return this.productRepository.findOneBy({ id });
    }


    async create(createProductDto: CreateProductDto, userId: number): Promise<ProductEntity> {
        const { price, name, description } = createProductDto;
        const product = this.productRepository.create({
            price: price,
            name: name,
            description: description,
            userId: userId
        });
        return this.productRepository.save(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productRepository.update(id, updateProductDto);

        return this.findOne(id); // Return the updated product
    }


    async remove(id: number): Promise<any> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productRepository.delete(id);

        return {
            success: true,
            message: "Product deleted successfully",
        };
    }

    async getProductsByUserId(userId: number): Promise<ProductEntity[]> {
        console.log('Fetching products for userId:', userId); // Logging for debugging
        const products = this.productRepository.find({ where: { userId } });
        return products;
    }


    async createFakeApiProduct(): Promise<any> {
        const url = 'https://fakestoreapi.com/products';
        try {
            const response = await axios.get(url);
            const productsToSave = response.data.map((product: any) => {
                const productToSave: CreateProductDto = {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.image,
                    category: product.category,
                    name: '',
                    userId: 0
                };

                return this.productRepository.create(productToSave);
            });

            return await this.productRepository.save(productsToSave);
        } catch (error) {
            throw new Error(`Error posting data: ${error.message}`);
        }
    }

    async fetchFakeProduct(): Promise<any> {
        const url = 'https://fakestoreapi.com/products';
        try {
          const response = await axios.get(url);
          return response.data; // Return the JSON response data
        } catch (error) {
          throw new Error(`Error fetching data: ${error.message}`);
        }
      }



}
function axiosRetry(axios: AxiosStatic, arg1: { retries: number; retryDelay: any; }) {
    throw new Error('Function not implemented.');
}

