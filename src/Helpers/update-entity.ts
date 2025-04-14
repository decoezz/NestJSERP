import { HttpException,HttpStatus } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

type PrismaModelDelegate = {
    update: (args: { where: { id: number }; data: any }) => Promise<any>;
};

export async function updateEntity<T>(
    model: PrismaModelDelegate,
    id: number,
    data: Record<string, any>,
    entityName: string = 'entity',
): Promise<T> {
    // Build the data object, excluding undefined values
    const updateData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
            updateData[key] = value;
        }
    }

    // Ensure at least one field is provided
    if (!Object.keys(updateData).length) {
        throw new HttpException(
            `At least one field must be provided to update the ${entityName}`,
            HttpStatus.BAD_REQUEST,
        );
    }
    // Perform the update
    try {
        const updatedEntity = await model.update({
            where: { id },
            data: updateData,
        });

        if (!updatedEntity) {
            throw new HttpException(
                `${entityName} not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return updatedEntity as T;
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new HttpException(
            `Failed to update ${entityName}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}