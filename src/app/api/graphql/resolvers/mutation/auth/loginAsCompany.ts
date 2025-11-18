import { verifyPassword } from "@/lib/utils/password";
import { generateToken } from "@/lib/utils/jwt";
import { db } from "../../../database";
import type { MutationResolvers } from '../../../types/generated.ts/types.generated';

export const loginAsCompany: NonNullable<MutationResolvers['loginAsCompany']> = async (_parent, { username, password }) => {
        const company = await db.query.companyTable.findFirst({
                where: (table, { eq }) => eq(table.username, username),
        });

        if (!company) {
                throw new Error("Invalid username or password");
        }

        const isPasswordValid = await verifyPassword(password, company.passwordHash);

        if (!isPasswordValid) {
                throw new Error("Invalid username or password");
        }

        const token = generateToken({
                id: company.id.toString(),
                email: company.email,
                type: "company",
        });

        return {
                token,
                user: company,
        };
};
