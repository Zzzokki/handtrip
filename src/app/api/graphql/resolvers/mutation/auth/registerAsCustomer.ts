import { saltAndHashPassword } from "@/lib/utils/password";
import { generateToken } from "@/lib/utils/jwt";
import { db } from "../../../database";
import { customerTable } from "../../../database/schemas/customer.schema";
import type { MutationResolvers } from '../../../types/generated.ts/types.generated';

export const registerAsCustomer: NonNullable<MutationResolvers['registerAsCustomer']> = async (_parent, { input }) => {
        if (!input) {
                throw new Error("Registration input is required");
        }

        // Check if username already exists
        const existingUser = await db.query.customerTable.findFirst({
                where: (table, { eq }) => eq(table.username, input.username),
        });

        if (existingUser) {
                throw new Error("Username already exists");
        }

        // Check if email already exists
        const existingEmail = await db.query.customerTable.findFirst({
                where: (table, { eq }) => eq(table.email, input.email),
        });

        if (existingEmail) {
                throw new Error("Email already exists");
        }

        // Hash password
        const passwordHash = await saltAndHashPassword(input.password);

        // Create customer
        const [customer] = await db.insert(customerTable).values({
                username: input.username,
                firstName: input.firstName,
                lastName: input.lastName,
                phoneNumber: input.phoneNumber,
                email: input.email,
                passwordHash,
        }).returning();

        const token = generateToken({
                id: customer.id.toString(),
                email: customer.email,
                type: "customer",
        });

        return {
                token,
                user: customer,
        };
};
