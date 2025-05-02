import{IsOptional,IsBoolean,IsString,IsEnum} from 'class-validator'
import{Type} from 'class-transformer'

//This class will be extended in other filter dto that will be specific for every Model

export class filterDto{
    @IsOptional()
    @IsString()
    search?:string // For full-text search on specific fields
    // Extend this class for model-specific filters
    getWhere(): any {
        return {};
    }
}