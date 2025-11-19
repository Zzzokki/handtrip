import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Reading migration file...");
  const migrationSQL = readFileSync(join(__dirname, "drizzle/0000_happy_captain_cross.sql"), "utf-8");

  console.log("Applying migration...");
  const statements = migrationSQL
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await sql(statement);
      console.log("✓ Applied statement");
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        console.log("⊘ Table already exists, skipping");
      } else {
        console.error("✗ Error:", error.message);
        throw error;
      }
    }
  }

  console.log("\n✓ Migration completed successfully!");
}

migrate().catch(console.error);
