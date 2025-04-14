/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Get,Post,Body,HttpCode,Delete,Query,HttpException,HttpStatus,Param,Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { parseId } from 'src/Helpers/ParseNumberQuery';
import { CreateProductDto } from './dto/create-Product.dto';
@Controller('products')
export class ProductController {
    constructor(private readonly Product:ProductService){}
    @Post('CreateProduct')
    @HttpCode(201)
    async createProduct(@Body() body:CreateProductDto){
        return this.Product.createProduct(body)
    }
    @Get('GetAllProducts')
    @HttpCode(200)
    async getAllProducts(){
        return this.Product.GetAllProducts()
    }
    @Get('GetProduct/:modelnumber')
    @HttpCode(200)
    async GetProductWithId(@Param('modelnumber') modelnumber :string){
        return this.Product.GetProductWithId(modelnumber)
    }
}
