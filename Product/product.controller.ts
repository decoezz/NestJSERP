/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Get,Post,Body,HttpCode,Delete,Query,HttpException,HttpStatus,Param,Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-Product.dto';
import { QueryBrandDto } from './dto/query-brand.dto';
@Controller('products')
export class ProductController {
    constructor(private readonly Product:ProductService){}
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
    @Post('CreateProduct')
    @HttpCode(201)
    async createProduct(@Body() body:CreateProductDto){
        return this.Product.createProduct(body)
    }
    @Delete('DeleteProduct')
    @HttpCode(204)
    async deleteProduct(@Query('modelnumber') modelnumber:string){
        return this.Product.DeleteProduct(modelnumber)
    }
    @Get('GetProductByBrand')
    @HttpCode(200)
    async getProductByBrand(@Query() query:QueryBrandDto){
        return this.Product.getProductByBrand(query.brand)
    }
}
