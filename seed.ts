import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as bcrypt from "bcryptjs";
import {
  categoryTable,
  subCategoryTable,
  companyTable,
  customerTable,
  guideTable,
  destinationTable,
  travelTable,
  agendaTable,
  travelSessionTable,
  seatCostTable,
  seatTable,
} from "./src/app/api/graphql/database/schemas";

// Load environment variables
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Create Categories
    console.log("📁 Creating categories...");
    const categories = await db
      .insert(categoryTable)
      .values([{ name: "Adventure" }, { name: "Cultural" }, { name: "Relaxation" }, { name: "Nature" }, { name: "Urban" }, { name: "Beach" }])
      .returning();
    console.log(`✅ Created ${categories.length} categories`);

    // 2. Create SubCategories
    console.log("📂 Creating subcategories...");
    const subCategories = await db
      .insert(subCategoryTable)
      .values([
        { name: "Hiking", categoryId: categories[0].id },
        { name: "Climbing", categoryId: categories[0].id },
        { name: "Water Sports", categoryId: categories[0].id },
        { name: "Museums", categoryId: categories[1].id },
        { name: "Historical Sites", categoryId: categories[1].id },
        { name: "Local Cuisine", categoryId: categories[1].id },
        { name: "Spa & Wellness", categoryId: categories[2].id },
        { name: "Resort", categoryId: categories[2].id },
        { name: "Wildlife", categoryId: categories[3].id },
        { name: "National Parks", categoryId: categories[3].id },
        { name: "City Tours", categoryId: categories[4].id },
        { name: "Shopping", categoryId: categories[4].id },
        { name: "Tropical", categoryId: categories[5].id },
        { name: "Island Hopping", categoryId: categories[5].id },
      ])
      .returning();
    console.log(`✅ Created ${subCategories.length} subcategories`);

    // 3. Create Destinations
    console.log("🌍 Creating destinations...");
    const destinations = await db
      .insert(destinationTable)
      .values([
        { name: "Swiss Alps", location: "Switzerland" },
        { name: "Paris", location: "France" },
        { name: "Tokyo", location: "Japan" },
        { name: "Bali", location: "Indonesia" },
        { name: "Dubai", location: "United Arab Emirates" },
        { name: "Iceland", location: "Iceland" },
        { name: "New York", location: "United States" },
        { name: "Barcelona", location: "Spain" },
        { name: "Maldives", location: "Maldives" },
        { name: "Machu Picchu", location: "Peru" },
        { name: "Santorini", location: "Greece" },
        { name: "Safari Kenya", location: "Kenya" },
      ])
      .returning();
    console.log(`✅ Created ${destinations.length} destinations`);

    // 4. Create Companies
    console.log("🏢 Creating companies...");
    const passwordHash = await bcrypt.hash("password123", 10);
    const companies = await db
      .insert(companyTable)
      .values([
        {
          name: "Alpine Adventures",
          logo: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          phoneNumber: "+41 44 123 4567",
          email: "info@alpineadventures.com",
          description: "Specialist in mountain and adventure travel experiences",
          username: "alpine_adventures",
          passwordHash,
        },
        {
          name: "Global Explorers",
          logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
          coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
          phoneNumber: "+33 1 45 67 89 00",
          email: "contact@globalexplorers.com",
          description: "Premium worldwide travel and cultural experiences",
          username: "global_explorers",
          passwordHash,
        },
        {
          name: "Tropical Paradise Tours",
          logo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          phoneNumber: "+62 361 123 456",
          email: "hello@tropicalparadise.com",
          description: "Beach and island getaway specialists",
          username: "tropical_paradise",
          passwordHash,
        },
        {
          name: "Urban Discoveries",
          logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
          coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
          phoneNumber: "+1 212 555 0100",
          email: "info@urbandiscoveries.com",
          description: "City tours and urban exploration experts",
          username: "urban_discoveries",
          passwordHash,
        },
      ])
      .returning();
    console.log(`✅ Created ${companies.length} companies`);

    // 5. Create Customers
    console.log("👥 Creating customers...");
    const customers = await db
      .insert(customerTable)
      .values([
        {
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "+1 555 123 4567",
          email: "john.doe@example.com",
          username: "johndoe",
          passwordHash,
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          phoneNumber: "+1 555 987 6543",
          email: "jane.smith@example.com",
          username: "janesmith",
          passwordHash,
        },
        {
          firstName: "Michael",
          lastName: "Johnson",
          phoneNumber: "+1 555 246 8135",
          email: "michael.j@example.com",
          username: "michaelj",
          passwordHash,
        },
      ])
      .returning();
    console.log(`✅ Created ${customers.length} customers`);

    // 6. Create Guides
    console.log("🧑‍🏫 Creating guides...");
    const guides = await db
      .insert(guideTable)
      .values([
        {
          name: "Hans Mueller",
          description: "Expert mountain guide with 15 years experience",
          email: "hans@alpineadventures.com",
          phoneNumber: "+41 79 123 4567",
          profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          companyId: companies[0].id,
        },
        {
          name: "Marie Dubois",
          description: "Passionate cultural guide specializing in European history",
          email: "marie@globalexplorers.com",
          phoneNumber: "+33 6 12 34 56 78",
          profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          companyId: companies[1].id,
        },
        {
          name: "Kenji Tanaka",
          description: "Tokyo local expert and cultural ambassador",
          email: "kenji@globalexplorers.com",
          phoneNumber: "+81 90 1234 5678",
          profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
          companyId: companies[1].id,
        },
        {
          name: "Made Wirawan",
          description: "Bali island guide and surf instructor",
          email: "made@tropicalparadise.com",
          phoneNumber: "+62 812 3456 7890",
          profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          companyId: companies[2].id,
        },
        {
          name: "Sarah Thompson",
          description: "New York City expert and food tour specialist",
          email: "sarah@urbandiscoveries.com",
          phoneNumber: "+1 917 555 0123",
          profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          companyId: companies[3].id,
        },
      ])
      .returning();
    console.log(`✅ Created ${guides.length} guides`);

    // 7. Create Travels with Agendas
    console.log("✈️ Creating travels...");

    const travelsData = [
      {
        travel: {
          name: "Swiss Alps Mountain Adventure",
          description: "Experience the majestic Swiss Alps with guided hiking, mountain climbing, and breathtaking views. Perfect for adventure seekers.",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          duration: 7,
          totalSeatNumber: 12,
          companyId: companies[0].id,
          destinationId: destinations[0].id,
        },
        agenda: {
          name: "7-Day Alpine Experience",
          description: "Day 1: Arrival in Zurich\nDay 2-3: Hiking in Interlaken\nDay 4-5: Mountain climbing workshops\nDay 6: Jungfraujoch excursion\nDay 7: Departure",
        },
      },
      {
        travel: {
          name: "Romantic Paris Getaway",
          description: "Discover the City of Light with exclusive access to museums, wine tasting, and gourmet dining experiences.",
          coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
          duration: 5,
          totalSeatNumber: 20,
          companyId: companies[1].id,
          destinationId: destinations[1].id,
        },
        agenda: {
          name: "5-Day Parisian Romance",
          description: "Day 1: Eiffel Tower and Seine cruise\nDay 2: Louvre and Latin Quarter\nDay 3: Versailles Palace\nDay 4: Wine tasting in Champagne\nDay 5: Shopping and departure",
        },
      },
      {
        travel: {
          name: "Tokyo Culture Immersion",
          description: "Immerse yourself in Japanese culture with temple visits, tea ceremonies, sushi making classes, and traditional experiences.",
          coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
          duration: 8,
          totalSeatNumber: 15,
          companyId: companies[1].id,
          destinationId: destinations[2].id,
        },
        agenda: {
          name: "8-Day Japanese Experience",
          description: "Day 1: Arrival Tokyo\nDay 2-3: Tokyo city tours\nDay 4: Day trip to Mount Fuji\nDay 5-6: Kyoto temples\nDay 7: Osaka food tour\nDay 8: Departure",
        },
      },
      {
        travel: {
          name: "Bali Tropical Paradise",
          description: "Relax on pristine beaches, explore ancient temples, learn to surf, and enjoy world-class spa treatments in beautiful Bali.",
          coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
          duration: 10,
          totalSeatNumber: 18,
          companyId: companies[2].id,
          destinationId: destinations[3].id,
        },
        agenda: {
          name: "10-Day Bali Bliss",
          description: "Day 1-2: Seminyak beach relaxation\nDay 3-4: Ubud culture and temples\nDay 5-6: Surf lessons in Canggu\nDay 7-8: Nusa Penida island\nDay 9: Spa day\nDay 10: Departure",
        },
      },
      {
        travel: {
          name: "Dubai Luxury Experience",
          description: "Experience the height of luxury in Dubai with desert safaris, luxury shopping, world-class dining, and iconic attractions.",
          coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
          duration: 6,
          totalSeatNumber: 16,
          companyId: companies[1].id,
          destinationId: destinations[4].id,
        },
        agenda: {
          name: "6-Day Dubai Luxury",
          description: "Day 1: Burj Khalifa and Dubai Mall\nDay 2: Desert safari\nDay 3: Palm Jumeirah and Atlantis\nDay 4: Abu Dhabi day trip\nDay 5: Shopping and spa\nDay 6: Departure",
        },
      },
      {
        travel: {
          name: "Iceland Northern Lights Safari",
          description: "Chase the Northern Lights while exploring Iceland's stunning landscapes, geothermal pools, and dramatic waterfalls.",
          coverImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
          duration: 7,
          totalSeatNumber: 10,
          companyId: companies[0].id,
          destinationId: destinations[5].id,
        },
        agenda: {
          name: "7-Day Iceland Adventure",
          description: "Day 1: Reykjavik arrival\nDay 2-3: Golden Circle tour\nDay 4: South Coast waterfalls\nDay 5-6: Northern Lights hunt\nDay 7: Blue Lagoon and departure",
        },
      },
      {
        travel: {
          name: "New York City Explorer",
          description: "Explore the Big Apple with Broadway shows, iconic landmarks, world-class museums, and authentic NYC food tours.",
          coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
          duration: 5,
          totalSeatNumber: 25,
          companyId: companies[3].id,
          destinationId: destinations[6].id,
        },
        agenda: {
          name: "5-Day NYC Discovery",
          description: "Day 1: Manhattan highlights\nDay 2: Museums and Central Park\nDay 3: Brooklyn and food tour\nDay 4: Broadway show\nDay 5: Shopping and departure",
        },
      },
      {
        travel: {
          name: "Barcelona Art & Architecture",
          description: "Discover Gaudí's masterpieces, enjoy tapas tours, explore Gothic Quarter, and relax on Mediterranean beaches.",
          coverImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
          duration: 6,
          totalSeatNumber: 20,
          companyId: companies[1].id,
          destinationId: destinations[7].id,
        },
        agenda: {
          name: "6-Day Barcelona Experience",
          description: "Day 1: Sagrada Familia\nDay 2: Park Güell and Gothic Quarter\nDay 3: Beach and Barceloneta\nDay 4: Montjuïc and museums\nDay 5: Day trip to Montserrat\nDay 6: Departure",
        },
      },
      {
        travel: {
          name: "Maldives Island Paradise",
          description: "Ultimate luxury resort experience with overwater bungalows, snorkeling, diving, and pristine white sand beaches.",
          coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
          duration: 9,
          totalSeatNumber: 12,
          companyId: companies[2].id,
          destinationId: destinations[8].id,
        },
        agenda: {
          name: "9-Day Maldives Luxury",
          description: "Day 1: Arrival and resort check-in\nDay 2-4: Beach relaxation and spa\nDay 5-6: Snorkeling and diving\nDay 7-8: Water sports and island hopping\nDay 9: Departure",
        },
      },
      {
        travel: {
          name: "Machu Picchu Adventure",
          description: "Trek the Inca Trail to the ancient citadel of Machu Picchu, explore Cusco, and experience Peruvian culture.",
          coverImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
          duration: 8,
          totalSeatNumber: 14,
          companyId: companies[0].id,
          destinationId: destinations[9].id,
        },
        agenda: {
          name: "8-Day Inca Trail Experience",
          description: "Day 1-2: Cusco acclimatization\nDay 3-6: Inca Trail trek\nDay 7: Machu Picchu tour\nDay 8: Return to Lima",
        },
      },
      {
        travel: {
          name: "Santorini Sunset Romance",
          description: "Experience romantic sunsets, white-washed villages, wine tasting, and Greek cuisine in stunning Santorini.",
          coverImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
          duration: 5,
          totalSeatNumber: 16,
          companyId: companies[1].id,
          destinationId: destinations[10].id,
        },
        agenda: {
          name: "5-Day Santorini Romance",
          description: "Day 1: Arrival in Fira\nDay 2: Oia sunset and wine tour\nDay 3: Boat tour and hot springs\nDay 4: Beach day and dining\nDay 5: Departure",
        },
      },
      {
        travel: {
          name: "Kenya Wildlife Safari",
          description: "Witness the Great Migration, see the Big Five, and experience authentic African safari in Kenya's national parks.",
          coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
          duration: 10,
          totalSeatNumber: 12,
          companyId: companies[0].id,
          destinationId: destinations[11].id,
        },
        agenda: {
          name: "10-Day Safari Adventure",
          description: "Day 1-2: Nairobi and Amboseli\nDay 3-5: Masai Mara safari\nDay 6-8: Lake Nakuru and Samburu\nDay 9: Nairobi National Park\nDay 10: Departure",
        },
      },
    ];

    const travels = [];
    for (const { travel, agenda } of travelsData) {
      const [createdTravel] = await db.insert(travelTable).values(travel).returning();
      await db
        .insert(agendaTable)
        .values({
          ...agenda,
          travelId: createdTravel.id,
        })
        .returning();
      travels.push(createdTravel);
    }
    console.log(`✅ Created ${travels.length} travels with agendas`);

    // 8. Create Travel Sessions
    console.log("📅 Creating travel sessions...");
    const sessions = [];
    for (let i = 0; i < travels.length; i++) {
      const travel = travels[i];
      const guideIndex = i % guides.length;

      // Create 2-3 sessions per travel
      const numSessions = Math.floor(Math.random() * 2) + 2;
      for (let j = 0; j < numSessions; j++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 30 + j * 21); // Sessions 21 days apart

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + travel.duration);

        const [session] = await db
          .insert(travelSessionTable)
          .values({
            startDate,
            endDate,
            travelId: travel.id,
            guideId: guides[guideIndex].id,
          })
          .returning();
        sessions.push(session);
      }
    }
    console.log(`✅ Created ${sessions.length} travel sessions`);

    // 9. Create Seat Costs
    console.log("💰 Creating seat costs...");
    const seatCosts = await db
      .insert(seatCostTable)
      .values([
        { cost: 1200 }, // Budget
        { cost: 2500 }, // Standard
        { cost: 4500 }, // Premium
        { cost: 7500 }, // Luxury
      ])
      .returning();
    console.log(`✅ Created ${seatCosts.length} seat cost tiers`);

    // 10. Create Seats for each session
    console.log("💺 Creating seats...");
    let totalSeats = 0;
    for (const session of sessions) {
      const travel = travels.find((t) => t.id === session.travelId)!;
      const seatCostIndex = Math.floor(Math.random() * seatCosts.length);

      for (let i = 0; i < travel.totalSeatNumber; i++) {
        await db.insert(seatTable).values({
          status: "available",
          travelSessionId: session.id,
          seatCostId: seatCosts[seatCostIndex].id,
        });
        totalSeats++;
      }
    }
    console.log(`✅ Created ${totalSeats} seats`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Categories: ${categories.length}`);
    console.log(`   SubCategories: ${subCategories.length}`);
    console.log(`   Destinations: ${destinations.length}`);
    console.log(`   Companies: ${companies.length}`);
    console.log(`   Customers: ${customers.length}`);
    console.log(`   Guides: ${guides.length}`);
    console.log(`   Travels: ${travels.length}`);
    console.log(`   Sessions: ${sessions.length}`);
    console.log(`   Seat Costs: ${seatCosts.length}`);
    console.log(`   Seats: ${totalSeats}`);
    console.log("\n🔐 Test Credentials:");
    console.log("   Customer: johndoe / password123");
    console.log("   Company: alpine_adventures / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
