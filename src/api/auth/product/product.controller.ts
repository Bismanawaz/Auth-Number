import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Request } from 'express';
import { RequestWithUser } from 'src/interface/requestwithuser-interface';

@Controller('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductController {
    // private readonly logger = new Logger(ProductController.name);
    constructor(private readonly productService: ProductService) { }

    @Get('all')
    findAll() {
        return this.productService.findAll();
    }
    @Get('find/:id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Get()
    async getUserProducts(@Req() req: RequestWithUser) {
        const userId = Number(req.user.userId); // Extracted from JWT
        console.log('User ID from token:', userId);
        return this.productService.getProductsByUserId(userId); // Make sure this function uses userId correctly
    }
    // @Post('create-FakeApi')
    // async createFakeApiProduct(createProductDto:CreateProductDto) {
    // return this.productService.createFakeApiProduct(createFakeApiProduct);
    // }
    // @Get('fetch')
    // async getAndSave() {
    //     return await this.productService.getAndSaveToDb();
    // }
    @Post('create-fake')
    async createFake() {
        return this.productService.createFakeApiProduct();  
    }
    @Get('fetch')
    async getAllFakeProduct(){
        return this.productService.fetchFakeProduct();
    }

    @Post('create/:id')
    create(@Body() createProductDto: CreateProductDto, @Param('id', ParseIntPipe) userId: number) {
        return this.productService.create(createProductDto, userId);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Id of the user whose account you want to delete.',
    })
    remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }


}
