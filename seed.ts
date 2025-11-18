import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./src/app/api/graphql/database/schemas";
import {
  companyTable,
  customerTable,
  travelTable,
  categoryTable,
  subCategoryTable,
  destinationTable,
  agendaTable,
} from "./src/app/api/graphql/database/schemas";
import { saltAndHashPassword } from "./src/lib/utils/password";

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create a sample company
    const [company] = await db
      .insert(companyTable)
      .values({
        username: "adventuretours",
        name: "Adventure Tours Co.",
        email: "contact@adventuretours.com",
        phoneNumber: "+1-555-0123",
        passwordHash: await saltAndHashPassword("company123"),
        logo: "https://via.placeholder.com/150",
        coverImage: "https://via.placeholder.com/800x400",
        description: "Leading provider of adventure travel experiences worldwide",
      })
      .returning();

    console.log("✓ Created company:", company.name);

    // Create sample category
    const [category] = await db
      .insert(categoryTable)
      .values({
        name: "Adventure",
      })
      .returning();

    // Create sample subcategory
    const [subCategory] = await db
      .insert(subCategoryTable)
      .values({
        name: "Mountain Hiking",
        categoryId: category.id,
      })
      .returning();

    // Create sample destination
    const [destination] = await db
      .insert(destinationTable)
      .values({
        name: "Swiss Alps",
        location: "Switzerland",
      })
      .returning();

    // Create sample agenda
    const [agenda] = await db
      .insert(agendaTable)
      .values({
        name: "Alpine Adventure",
        description: "5-day mountain adventure",
      })
      .returning();

    // Create sample travels
    const travels = [
      {
        name: "Swiss Alps Adventure",
        description: "Explore the breathtaking Swiss Alps with expert guides. Experience stunning mountain vistas, crystal-clear lakes, and charming alpine villages. Perfect for adventure seekers and nature lovers.",
        price: "1899.00",
        duration: 5,
        maxGuests: 12,
        minAge: 18,
        coverImage: "from-blue-500 to-cyan-400",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
      {
        name: "Romantic Paris Getaway",
        description: "Experience the magic of Paris with our carefully curated 5-day romantic getaway. Walk hand-in-hand along the Seine, marvel at the Eiffel Tower, and indulge in authentic French cuisine.",
        price: "1299.00",
        duration: 5,
        maxGuests: 10,
        minAge: 16,
        coverImage: "from-pink-500 to-purple-500",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
      {
        name: "Tokyo Cultural Experience",
        description: "Immerse yourself in Japanese culture with visits to ancient temples, bustling markets, and traditional tea ceremonies. Experience the perfect blend of old and new in Japan's vibrant capital.",
        price: "2199.00",
        duration: 7,
        maxGuests: 15,
        minAge: 12,
        coverImage: "from-red-500 to-orange-400",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
      {
        name: "Bali Beach Paradise",
        description: "Relax on pristine beaches, explore ancient temples, and enjoy world-class surfing. This tropical paradise offers the perfect blend of adventure and relaxation.",
        price: "1599.00",
        duration: 6,
        maxGuests: 20,
        minAge: 12,
        coverImage: "from-green-500 to-teal-400",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
      {
        name: "Dubai Luxury Escape",
        description: "Experience ultimate luxury in Dubai with stays at 5-star hotels, desert safaris, and visits to iconic landmarks like Burj Khalifa. A perfect blend of modern luxury and Arabian heritage.",
        price: "2899.00",
        duration: 5,
        maxGuests: 8,
        minAge: 18,
        coverImage: "from-yellow-500 to-amber-400",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
      {
        name: "Iceland Northern Lights",
        description: "Witness the spectacular Northern Lights and explore Iceland's dramatic landscapes. Visit geysers, waterfalls, glaciers, and soak in natural hot springs.",
        price: "2499.00",
        duration: 6,
        maxGuests: 12,
        minAge: 16,
        coverImage: "from-indigo-500 to-blue-400",
        companyId: company.id,
        categoryId: category.id,
        subcategoryId: subCategory.id,
        destinationId: destination.id,
        agendaId: agenda.id,
      },
    ];

    const createdTravels = await db.insert(travelTable).values(travels).returning();
    console.log(`✓ Created ${createdTravels.length} travels`);

    // Create a sample customer
    const [customer] = await db
      .insert(customerTable)
      .values({
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "+1-555-0100",
        passwordHash: await saltAndHashPassword("password123"),
      })
      .returning();

    console.log("✓ Created customer:", customer.username);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nTest credentials:");
    console.log("Customer: username=johndoe, password=password123");
    console.log("Company: username=contact@adventuretours.com, password=company123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("\n👋 Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
