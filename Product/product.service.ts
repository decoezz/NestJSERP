/*
https://docs.nestjs.com/providers#services
*/
import { HttpException,HttpStatus,Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-Product.dto';
import { Brand } from '@prisma/client';
@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService){}
    
    async createProduct(dto:CreateProductDto){
        return this.prisma.product.create({data:{
            brand: dto.brand,
            modelnumber: dto.modelnumber,
            coolingCapacity: dto.coolingCapacity,
            powerConsumption: dto.powerConsumption,
            price: dto.price,
            inventoryStock: dto.inventoryStock,
            StoreStock: dto.StoreStock,
            unitSold: dto.unitSold ?? 0, // Use default if undefined
            inStore: dto.inStore ?? false, // Use default if undefined
            photo: dto.photo ?? "doesn't exist", // Use default if undefined
        }})
    }
    async GetAllProducts(){
        return this.prisma.product.findMany()
    }
    async GetProductWithId(modelnumber:string){
        const result =  await this.prisma.product.findUnique({where:{modelnumber:modelnumber}})
        if(!result){
            throw new HttpException('No AC found with this model number.Please try again',HttpStatus.BAD_REQUEST)
        }
        return result
    }
    async DeleteProduct(modelnumber:string){
        const result =  await this.prisma.product.findUnique({where:{modelnumber:modelnumber}})
        if(!result){
            throw new HttpException('No AC found with this model number.Please try again',HttpStatus.BAD_REQUEST)
        }
        return await this.prisma.product.delete({where:{modelnumber}})
    }
    async getProductByBrand(brand:Brand){
        const results = await this.prisma.product.findMany({where:{brand}})
        if(!results || results.length === 0){
            throw new HttpException('No AC found for this brand.Please try again',HttpStatus.BAD_REQUEST)
        }
        return results
    }
    
}
