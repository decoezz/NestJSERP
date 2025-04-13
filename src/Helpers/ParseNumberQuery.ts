import { HttpException,HttpStatus } from "@nestjs/common";

export function parseId(id : string,paramName : string = 'id') : number{
    const parsedID = parseInt(id,10)
    if(isNaN(parsedID)){
        throw new HttpException('Expected Number not found',HttpStatus.BAD_REQUEST)
    }
    return parsedID
}