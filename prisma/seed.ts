import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const existingManager = await prisma.employee.findFirst({
        where: { role: Role.Inventory_Manager },
    });

    if (existingManager) {
        console.log('Inventory_Manager already exists. Skipping seed.');
        return;
    }

    await prisma.employee.create({
        data: {
            firstname: 'Admin',
            lastname: 'Manager',
            email: 'admin.manager@example.com',
            role: Role.Inventory_Manager,
        },
    });

    console.log('Initial Inventory_Manager (Employee) created successfully. Please sign up to create a User account.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });