import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { saltAndHashPassword } from "./src/lib/utils/password";

config({ path: ".env.local" });

async function seedAdminAndManager() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Seeding admin and manager...");

  // Create admin user
  const adminPasswordHash = await saltAndHashPassword("admin123");

  try {
    await sql`
      INSERT INTO admin (first_name, last_name, email, username, password_hash)
      VALUES ('System', 'Admin', 'admin@handtrip.com', 'admin', ${adminPasswordHash})
      ON CONFLICT (username) DO NOTHING
    `;
    console.log("✓ Admin user created (username: admin, password: admin123)");
  } catch (error: any) {
    console.error("✗ Error creating admin:", error.message);
  }

  // Create manager user
  const managerPasswordHash = await saltAndHashPassword("manager123");

  try {
    await sql`
      INSERT INTO manager (first_name, last_name, email, phone_number, username, password_hash, company_id)
      VALUES ('Demo', 'Manager', 'manager@handtrip.com', '99999999', 'manager', ${managerPasswordHash}, NULL)
      ON CONFLICT (username) DO NOTHING
    `;
    console.log("✓ Manager user created (username: manager, password: manager123)");
  } catch (error: any) {
    console.error("✗ Error creating manager:", error.message);
  }

  console.log("\n✓ Seeding completed!");
}

seedAdminAndManager().catch(console.error);
