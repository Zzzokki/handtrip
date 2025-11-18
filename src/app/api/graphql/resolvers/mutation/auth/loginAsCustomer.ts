import { verifyPassword } from "@/lib/utils/password";
import { generateToken } from "@/lib/utils/jwt";
import { db } from "../../../database";
import type { MutationResolvers } from '../../../types/generated.ts/types.generated';

export const loginAsCustomer: NonNullable<MutationResolvers['loginAsCustomer']> = async (_parent, { username, password }) => {
        const customer = await db.query.customerTable.findFirst({
                where: (table, { eq }) => eq(table.username, username),
        });

        if (!customer) {
                throw new Error("Invalid username or password");
        }

        const isPasswordValid = await verifyPassword(password, customer.passwordHash);

        if (!isPasswordValid) {
                throw new Error("Invalid username or password");
        }

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
