import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const existingManager = await prisma.employee.findFirst({
        where: { role: Role.Inventory_Manager },
    });

    if (existingManager) {
        console.log('Inventory_Manager already exists. Skipping seed.');
        return;
    }

    // Create the Employee
    const employee = await prisma.employee.create({
        data: {
            firstname: 'Admin',
            lastname: 'Manager',
            email: 'admin.manager@example.com',
            role: Role.Inventory_Manager,
        },
    });

    // Hash the password for the User
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('adminpassword123', saltRounds); // Default password

    // Create the User linked to the Employee
    await prisma.user.create({
        data: {
            username: 'admin',
            password: hashedPassword,
            employeeFirstname: employee.firstname,
            employeeLastname: employee.lastname,
        },
    });

    console.log('Initial Inventory_Manager (Employee) and User created successfully. You can now log in with username: admin and password: adminpassword123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });