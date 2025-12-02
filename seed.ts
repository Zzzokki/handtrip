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
  subCategoryToTravelTable,
  categoryToTravelTable,
} from "./src/app/api/graphql/database/schemas";

// Load environment variables
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Starting database seeding with Mongolian data...");

  try {
    // First, clear all existing data
    console.log("🗑️ Clearing existing data...");
    await db.delete(seatTable);
    await db.delete(seatCostTable);
    await db.delete(travelSessionTable);
    await db.delete(agendaTable);
    await db.delete(subCategoryToTravelTable);
    await db.delete(categoryToTravelTable);
    await db.delete(travelTable);
    await db.delete(guideTable);
    await db.delete(customerTable);
    await db.delete(companyTable);
    await db.delete(destinationTable);
    await db.delete(subCategoryTable);
    await db.delete(categoryTable);
    console.log("✅ Database cleared successfully");

    // 1. Create Categories
    console.log("📁 Creating categories...");
    const categories = await db
      .insert(categoryTable)
      .values([
        { name: "Адал явдалт аялал" }, // Adventure
        { name: "Соёлын аялал" }, // Cultural
        { name: "Амрах чиглэлийн" }, // Relaxation
        { name: "Байгалийн аялал" }, // Nature
        { name: "Хотын аялал" }, // Urban
        { name: "Зусланы аялал" }, // Resort
      ])
      .returning();
    console.log(`✅ Created ${categories.length} categories`);

    // 2. Create SubCategories
    console.log("📂 Creating subcategories...");
    const subCategories = await db
      .insert(subCategoryTable)
      .values([
        { name: "Явган аялал", categoryId: categories[0].id },
        { name: "Морь унах", categoryId: categories[0].id },
        { name: "Тэмээн унах", categoryId: categories[0].id },
        { name: "Музей үзэх", categoryId: categories[1].id },
        { name: "Түүхэн дурсгалт газар", categoryId: categories[1].id },
        { name: "Монгол хоол", categoryId: categories[1].id },
        { name: "Рашаан сувилал", categoryId: categories[2].id },
        { name: "Зочид буудал", categoryId: categories[2].id },
        { name: "Зэрлэг амьтан ажиглах", categoryId: categories[3].id },
        { name: "Байгалийн цогцолборт газар", categoryId: categories[3].id },
        { name: "Хотын аялал", categoryId: categories[4].id },
        { name: "Дэлгүүр хэсэх", categoryId: categories[4].id },
        { name: "Нуур орчим", categoryId: categories[5].id },
        { name: "Нуурын эрэг", categoryId: categories[5].id },
      ])
      .returning();
    console.log(`✅ Created ${subCategories.length} subcategories`);

    // 3. Create Destinations
    console.log("🌍 Creating destinations...");
    const destinations = await db
      .insert(destinationTable)
      .values([
        { name: "Хөвсгөл нуур", location: "Хөвсгөл аймаг" },
        { name: "Говь", location: "Өмнөговь аймаг" },
        { name: "Хархорин", location: "Өвөрхангай аймаг" },
        { name: "Тэрэлж", location: "Төв аймаг" },
        { name: "Алтай нуруу", location: "Баян-Өлгий аймаг" },
        { name: "Улаанбаатар", location: "Нийслэл хот" },
        { name: "Хустай нуруу", location: "Төв аймаг" },
        { name: "Орхон хөндий", location: "Өвөрхангай аймаг" },
        { name: "Цагаан нуур", location: "Архангай аймаг" },
        { name: "Хөгнө хан", location: "Булган аймаг" },
        { name: "Завхан нуур", location: "Завхан аймаг" },
        { name: "Дархадын хотгор", location: "Хөвсгөл аймаг" },
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
          name: "Номад Экспедишн",
          logo: "https://images.unsplash.com/photo-1580407196238-dac33f57c410",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          phoneNumber: "+976 7011 5678",
          email: "info@nomadexpedition.mn",
          description: "Монгол орны адал явдалт аяллын тэргүүлэгч байгууллага. Морь, тэмээний аялал болон байгалийн аяллын мэргэжилтэн.",
          username: "nomad_expedition",
          passwordHash,
        },
        {
          name: "Гоёо Травел",
          logo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          coverImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
          phoneNumber: "+976 7022 9999",
          email: "contact@goyotravel.mn",
          description: "Монголын соёл, түүхийг танин мэдүүлэх соёлын аяллын шилдэг байгууллага. Ердийн хоригийн хотын аялал, музейн аялал зэрэг чиглэлээр.",
          username: "goyo_travel",
          passwordHash,
        },
        {
          name: "Монгол Дискавери",
          logo: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3",
          coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
          phoneNumber: "+976 7033 1234",
          email: "hello@mongoldiscovery.mn",
          description: "Говь, Алтай, Хөвсгөл зэрэг байгалийн үзэсгэлэнт газруудаар аялах программууд. Зэрлэг амьтан ажиглах, байгалийн цогцолборт газруудаар аялах.",
          username: "mongol_discovery",
          passwordHash,
        },
        {
          name: "Хаан Турс",
          logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
          coverImage: "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
          phoneNumber: "+976 7044 5555",
          email: "info@khaantours.mn",
          description: "Дээд зэргийн үйлчилгээ үзүүлэгч аялал жуулчлалын компани. VIP аялал, бизнес аялал, тансаг зэрэглэлийн аялал зохион байгуулдаг.",
          username: "khaan_tours",
          passwordHash,
        },
        {
          name: "Алтан Нуруу",
          logo: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          phoneNumber: "+976 7055 7777",
          email: "info@altannuruu.mn",
          description: "Баян-Өлгий, Алтайн нурууны адал явдалт аялал. Нисдэг шувуу агнуур, уулын аялал, казак соёлтой танилцах аялал.",
          username: "altan_nuruu",
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
          firstName: "Бат",
          lastName: "Өлзий",
          phoneNumber: "+976 9911 1234",
          email: "bat.ulzii@gmail.com",
          username: "bat_ulzii",
          passwordHash,
        },
        {
          firstName: "Сарнай",
          lastName: "Доржийн",
          phoneNumber: "+976 9922 5678",
          email: "sarnai.dorj@gmail.com",
          username: "sarnai_dorj",
          passwordHash,
        },
        {
          firstName: "Болд",
          lastName: "Ганболд",
          phoneNumber: "+976 9933 9876",
          email: "bold.ganbold@gmail.com",
          username: "bold_ganbold",
          passwordHash,
        },
        {
          firstName: "Цэцэг",
          lastName: "Мөнх",
          phoneNumber: "+976 9944 4321",
          email: "tsetseg.munkh@gmail.com",
          username: "tsetseg_munkh",
          passwordHash,
        },
        {
          firstName: "Эрдэнэ",
          lastName: "Баатар",
          phoneNumber: "+976 9955 8765",
          email: "erdene.baatar@gmail.com",
          username: "erdene_baatar",
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
          name: "Баясгалан Төмөр",
          description: "15 жилийн туршлагатай Хөвсгөл, Алтайн аяллын мэргэжилтэн хөтөч. Англи, Герман хэл сайн мэддэг.",
          email: "bayasgalan@nomadexpedition.mn",
          phoneNumber: "+976 9911 2345",
          profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          companyId: companies[0].id,
        },
        {
          name: "Энхтуяа Бат",
          description: "Монголын түүх, соёлын мэргэжилтэн. Төв бүсийн түүхэн дурсгалт газрын гүйцэтгэгч хөтөч.",
          email: "enkhtuya@goyotravel.mn",
          phoneNumber: "+976 9922 3456",
          profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          companyId: companies[1].id,
        },
        {
          name: "Ганзориг Цэнд",
          description: "Говийн аяллын мэргэжилтэн. Зэрлэг амьтан, байгалийн онцлог газруудын талаар гүнзгий мэдлэгтэй.",
          email: "ganzorig@mongoldiscovery.mn",
          phoneNumber: "+976 9933 4567",
          profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          companyId: companies[2].id,
        },
        {
          name: "Номин Эрдэнэ",
          description: "VIP аяллын мэргэжилтэн хөтөч. 10 жилийн туршлага, 5 хэл мэддэг. Тансаг зэрэглэлийн үйлчилгээ.",
          email: "nomin@khaantours.mn",
          phoneNumber: "+976 9944 5678",
          profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          companyId: companies[3].id,
        },
        {
          name: "Алтангэрэл Батбаяр",
          description: "Баян-Өлгий, Алтайн нурууны адал явдалт аяллын мэргэжилтэн. Казак хэл мэддэг. Нисдэг шувуу агнуурын уламжлалын мэргэжилтэн.",
          email: "altangerel@altannuruu.mn",
          phoneNumber: "+976 9955 6789",
          profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
          companyId: companies[4].id,
        },
        {
          name: "Сэргэлэн Доржийн",
          description: "Орхон хөндий, Хархорин түүхэн газрын мэргэжилтэн. Археологи, түүхийн мэдлэгтэй.",
          email: "sergelen@goyotravel.mn",
          phoneNumber: "+976 9966 7890",
          profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          companyId: companies[1].id,
        },
        {
          name: "Болормаа Төмөрбаатар",
          description: "Тэрэлж, Хустай нурууны байгалийн аяллын хөтөч. Хүүхдийн аяллын мэргэжилтэн.",
          email: "bolormaa@nomadexpedition.mn",
          phoneNumber: "+976 9977 8901",
          profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
          companyId: companies[0].id,
        },
      ])
      .returning();
    console.log(`✅ Created ${guides.length} guides`);

    // 7. Create Travels with Agendas
    console.log("✈️ Creating travels...");

    const travelsData = [
      {
        travel: {
          name: "Хөвсгөл нуурын адал явдалт аялал",
          description: "Монголын Швейцарь гэгдэх Хөвсгөл нуураар морь унах, явган аялах, нуурт завиар аялах. Цагаан хот, Жанхай давааны үзэсгэлэнт байгаль.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1519681393784-d120267933ba"],
          duration: 10,
          totalSeatNumber: 15,
          companyId: companies[0].id,
          destinationId: destinations[0].id,
        },
        agendas: [
          { day: 1, name: "УБ-Мөрөн хөдөлгөөн", description: "Улаанбаатараас Мөрөн хот хүртэл автобусаар хөдөлнө. Зам дагуу үзэсгэлэнт байгалийг үзэж аялна." },
          { day: 2, name: "Нуур орчим морин аялал", description: "Хөвсгөл нуураар морь унаж эрэг дагуу аялна. Орон нутгийн малчидтай уулзаж танилцана." },
          { day: 3, name: "Нуур орчим морин аялал", description: "Хөвсгөл нуурын баруун эрэгт аялж, байгалийн үзэсгэлэнт газруудыг үзнэ." },
          { day: 4, name: "Цагаан хот, Дархадын хотгор", description: "Цагаан хот руу чиглэн явж, Дархадын хотгорын үзэсгэлэнт байгалийг үзнэ." },
          { day: 5, name: "Дархадын хотгор", description: "Дархадын хотгороор явган аялж, орон нутгийн соёлтой танилцана." },
          { day: 6, name: "Нуураар завиар аялах", description: "Хөвсгөл нуураар завиар аялж, загас агнуурын арга барил сурна." },
          { day: 7, name: "Нуураар завиар аялах", description: "Нуурын арлууд руу завиар аялж, загас агнуур хийнэ." },
          { day: 8, name: "Явган аялал, загас агнуур", description: "Хөвсгөл нуурын эргээр явган аялж, загас агнуур хийнэ." },
          { day: 9, name: "Явган аялал", description: "Жанхай даваагаар явган аялж, үзэсгэлэнт байгалийг үзнэ." },
          { day: 10, name: "УБ буцах", description: "Улаанбаатар хот руу буцаж ирнэ. Аяллын дурсамжаа хуваалцана." },
        ],
        subCategoryIds: [1, 2, 9],
      },
      {
        travel: {
          name: "Говь - Элсэн манхан аялал",
          description: "Өмнөговийн элсэн манхан, Хонгорын элс, Баянзаг, Үүлэн хадны үзэсгэлэнт байгаль. Тэмээн унах, үлзүүр нэрвэгдэх, одны орой үзэх.",
          coverImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
          gallery: ["https://images.unsplash.com/photo-1523805009345-7448845a9e53", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"],
          duration: 7,
          totalSeatNumber: 12,
          companyId: companies[2].id,
          destinationId: destinations[1].id,
        },
        agendas: [
          { day: 1, name: "УБ-Баянзаг", description: "Улаанбаатараас Баянзаг руу хөдөлж, үлгэрийн хадыг үзнэ." },
          { day: 2, name: "Хонгорын элс", description: "Хонгорын элсэнд очиж, элсний манхан дээр тэмээгээр аялна." },
          { day: 3, name: "Тэмээн унах", description: "Элсний манхан дээр тэмээ унаж, Говийн үзэсгэлэнт байгалийг үзнэ." },
          { day: 4, name: "Үүлэн хад", description: "Үүлэн хад руу очиж, уулын үзэсгэлэнт газруудыг үзнэ." },
          { day: 5, name: "Говийн зэрлэг амьтан ажиглах", description: "Говийн зэрлэг амьтдыг ажиглаж, байгалийн онцлогтой танилцана." },
          { day: 6, name: "Одны орой үзэх", description: "Шөнийн Говийн үзэсгэлэнт одны ороийг үзэж, гэрэл зургаа авна." },
          { day: 7, name: "УБ буцах", description: "Улаанбаатар хот руу буцаж ирнэ." },
        ],
        subCategoryIds: [3, 9],
      },
      {
        travel: {
          name: "Хархорин - Ердийн хорих аялал",
          description: "Монголын түүхэн нийслэл Хархорин, Эрдэнэ Зуу хийд, Орхоны хүрхрээ, Цэнхэрийн булаг зэрэг газруудаар соёлын аялал.",
          coverImage: "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
          gallery: ["https://images.unsplash.com/photo-1580407196238-dac33f57c410", "https://images.unsplash.com/photo-1568605114967-8130f3a36994"],
          duration: 5,
          totalSeatNumber: 20,
          companyId: companies[1].id,
          destinationId: destinations[2].id,
        },
        agendas: [
          { day: 1, name: "УБ-Хархорин", description: "Улаанбаатараас Хархорин руу хөдөлж, түүхэн газруудыг үзнэ." },
          { day: 2, name: "Эрдэнэ Зуу хийд, музей", description: "Эрдэнэ Зуу хийд, музейг үзэж, түүхтэй танилцана." },
          { day: 3, name: "Орхоны хүрхрээ", description: "Орхоны хүрхрээг үзэж, байгалийн үзэсгэлэнт газруудаар аялна." },
          { day: 4, name: "Цэнхэрийн булаг", description: "Цэнхэрийн булагт очиж, рашаан усанд орно." },
          { day: 5, name: "УБ буцах", description: "Улаанбаатар хот руу буцаж ирнэ." },
        ],
        subCategoryIds: [4, 5, 6],
      },
      {
        travel: {
          name: "Тэрэлж - Хустай нуруу аялал",
          description: "Тэрэлжийн байгалийн цогцолборт газар, Хустайн тахь ажиглах, мэлхийн хөшөө, Чингис хааны морин хөшөө үзэх. Нийслэлээс ойрын баярын аялал.",
          coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
          gallery: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19", "https://images.unsplash.com/photo-1516426122078-c23e76319801"],
          duration: 3,
          totalSeatNumber: 25,
          companyId: companies[0].id,
          destinationId: destinations[3].id,
        },
        agendas: [
          { day: 1, name: "Чингис хааны морин хөшөө, Тэрэлж", description: "Чингис хааны морин хөшөөг үзэж, Тэрэлж руу хөдөлнө." },
          { day: 2, name: "Явган аялал, морь унах", description: "Тэрэлжээр явган аялж, морь унаж байгалийг үзнэ." },
          { day: 3, name: "Хустайн тахь ажиглах, УБ буцах", description: "Хустай нурууд очиж тахь ажиглаад УБ буцна." },
        ],
        subCategoryIds: [1, 2, 9, 10],
      },
      {
        travel: {
          name: "Алтай - Нисдэг шувуу агнуурын аялал",
          description: "Баян-Өлгий, Алтайн нуруу, Казак соёл танилцах, нисдэг шувуу агнуурын уламжлал үзэх. Алтай таван богдын үзэсгэлэнт уулс.",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1519681393784-d120267933ba"],
          duration: 9,
          totalSeatNumber: 10,
          companyId: companies[4].id,
          destinationId: destinations[4].id,
        },
        agendas: [
          { day: 1, name: "УБ-Өлгий", description: "Улаанбаатараас Өлгий руу нисч хөдөлнө." },
          { day: 2, name: "Өлгий хот танилцах", description: "Өлгий хоттой танилцаж, казак соёлыг үзнэ." },
          { day: 3, name: "Нисдэг шувуу агнуур үзэх", description: "Нисдэг шувууны агнуурын уламжлал үзнэ." },
          { day: 4, name: "Нисдэг шувуу агнуур", description: "Агнуурчидтай хамт нисдэг шувуу агнуур үзнэ." },
          { day: 5, name: "Алтай таван богд", description: "Алтай таван богд уул руу явна." },
          { day: 6, name: "Алтайн нуруу аялал", description: "Алтайн нурууд аялж, байгалийг үзнэ." },
          { day: 7, name: "Казак соёл танилцах", description: "Казак соёл, уламжлалтай танилцана." },
          { day: 8, name: "Казак хоол", description: "Казак үндэсний хоолыг амталж, соёлтой танилцана." },
          { day: 9, name: "Буцах", description: "Улаанбаатар хот руу буцна." },
        ],
        subCategoryIds: [1, 5, 10],
      },
      {
        travel: {
          name: "Улаанбаатар хотын аялал",
          description: "Нийслэл хотын үзэсгэлэнт газрууд: Сүхбаатарын талбай, Гандантэгчинлэн хийд, Богд хааны ордон музей, Зайсан толгой, Чойжин ламын музей.",
          coverImage: "https://images.unsplash.com/photo-1580407196238-dac33f57c410",
          gallery: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994", "https://images.unsplash.com/photo-1542144582-1ba00456b5e3"],
          duration: 2,
          totalSeatNumber: 30,
          companyId: companies[1].id,
          destinationId: destinations[5].id,
        },
        agendas: [
          { day: 1, name: "Музейнүүд, Гандан хийд", description: "Богд хааны ордон музей, Гандан хийдийг үзнэ." },
          { day: 2, name: "Зайсан толгой, шоппинг", description: "Зайсан толгойгоос хотыг үзээд дэлгүүр хэсэх аялал хийнэ." },
        ],
        subCategoryIds: [4, 11, 12],
      },
      {
        travel: {
          name: "Хустай нуруу - Тахь ажиглах аялал",
          description: "Пржевальскийн морь буюу тахь ажиглах, байгалийн цогцолборт газраар явган аялах, зэрлэг амьтан ажиглах.",
          coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
          gallery: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19", "https://images.unsplash.com/photo-1523805009345-7448845a9e53"],
          duration: 2,
          totalSeatNumber: 18,
          companyId: companies[2].id,
          destinationId: destinations[6].id,
        },
        agendas: [
          { day: 1, name: "УБ-Хустай, тахь ажиглах", description: "Хустай нурууд очиж тахь ажиглана." },
          { day: 2, name: "Явган аялал, УБ буцах", description: "Явган аялал хийж, УБ буцна." },
        ],
        subCategoryIds: [9, 10],
      },
      {
        travel: {
          name: "Орхон хөндийн аялал",
          description: "ЮНЕСКО-гийн дэлхийн өвд бүртгэгдсэн Орхон хөндий, Орхоны хүрхрээ, Товхон хийд, нүүдэлчин айл танилцах.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1580407196238-dac33f57c410"],
          duration: 4,
          totalSeatNumber: 16,
          companyId: companies[1].id,
          destinationId: destinations[7].id,
        },
        agendas: [
          { day: 1, name: "УБ-Хархорин", description: "Улаанбаатараас Хархорин руу хөдөлнө." },
          { day: 2, name: "Орхоны хүрхрээ", description: "Орхоны хүрхрээг үзэж аялна." },
          { day: 3, name: "Явган аялал", description: "Орхон хөндийгөөр явган аялна." },
          { day: 4, name: "Товхон хийд, УБ буцах", description: "Товхон хийдийг үзэж, УБ буцна." },
        ],
        subCategoryIds: [1, 5, 10],
      },
      {
        travel: {
          name: "Цагаан нуур - Архангай аялал",
          description: "Архангайн Цагаан нуур, рашаан сувилал, Хөгнө хан, Эрдэнэ хамт хийд. Амрах чиглэлийн аялал.",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          gallery: ["https://images.unsplash.com/photo-1512100356356-de1b84283e18", "https://images.unsplash.com/photo-1519681393784-d120267933ba"],
          duration: 6,
          totalSeatNumber: 14,
          companyId: companies[0].id,
          destinationId: destinations[8].id,
        },
        agendas: [
          { day: 1, name: "УБ-Цагаан нуур", description: "Улаанбаатараас Цагаан нуур руу хөдөлнө." },
          { day: 2, name: "Нуур орчим", description: "Цагаан нуурын эргээр аялна." },
          { day: 3, name: "Рашаан сувилал", description: "Рашаан сувилалд орж амарна." },
          { day: 4, name: "Нуур орчим амрах", description: "Нуур дээр завиар аялж амарна." },
          { day: 5, name: "Хөгнө хан", description: "Хөгнө хан уул руу явна." },
          { day: 6, name: "УБ буцах", description: "Улаанбаатар хот руу буцна." },
        ],
        subCategoryIds: [7, 13, 14],
      },
      {
        travel: {
          name: "Хөгнө хан - Элсэн тасархайн аялал",
          description: "Хөгнө хан уул, Элсэн тасархай, Угийн нуур, Эрдэнэ хамт хийд. Баярын 3 хоногийн аялал.",
          coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
          gallery: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"],
          duration: 3,
          totalSeatNumber: 20,
          companyId: companies[2].id,
          destinationId: destinations[9].id,
        },
        agendas: [
          { day: 1, name: "УБ-Хөгнө хан", description: "Улаанбаатараас Хөгнө хан руу явж элсэн тасархайг үзнэ." },
          { day: 2, name: "Угийн нуур, хийд", description: "Угийн нуур, Эрдэнэ хамт хийдийг үзнэ." },
          { day: 3, name: "УБ буцах", description: "Улаанбаатар хот руу буцна." },
        ],
        subCategoryIds: [1, 5, 10],
      },
      {
        travel: {
          name: "Завхан - Отгон тэнгэрийн аялал",
          description: "Завханы Отгон тэнгэр уул, Тосон хулстай, Тэлмэн нуур. Баруун бүсийн уулс, нууруудын аялал.",
          coverImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
          gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1523805009345-7448845a9e53"],
          duration: 8,
          totalSeatNumber: 12,
          companyId: companies[0].id,
          destinationId: destinations[10].id,
        },
        agendas: [
          { day: 1, name: "УБ-Завхан", description: "Улаанбаатараас Завхан руу хөдөлнө." },
          { day: 2, name: "Завхан хөдөлгөөн", description: "Завхан аймагт очих хөдөлгөөн." },
          { day: 3, name: "Отгон тэнгэр", description: "Отгон тэнгэр уул руу явна." },
          { day: 4, name: "Явган аялал", description: "Уулаар явган аялна." },
          { day: 5, name: "Уулын аялал", description: "Отгон тэнгэрээр аялж, байгалийг үзнэ." },
          { day: 6, name: "Тэлмэн нуур", description: "Тэлмэн нуур руу хөдөлнө." },
          { day: 7, name: "Нуур орчим", description: "Тэлмэн нуураар аялна." },
          { day: 8, name: "Буцах", description: "Улаанбаатар хот руу буцна." },
        ],
        subCategoryIds: [1, 9, 10],
      },
      {
        travel: {
          name: "Дархадын хотгор аялал",
          description: "Хөвсгөл аймгийн хойд хэсгийн Дархадын хотгор, Цагаан нуур, Дархад соёл танилцах. Цаачид нуур, үзэсгэлэнт байгаль.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1519681393784-d120267933ba"],
          duration: 12,
          totalSeatNumber: 10,
          companyId: companies[2].id,
          destinationId: destinations[11].id,
        },
        agendas: [
          { day: 1, name: "УБ хөдөлгөөн", description: "Улаанбаатараас хойд зүг рүү хөдөлнө." },
          { day: 2, name: "Хөдөлгөөн", description: "Дархадын хотгор руу явж байна." },
          { day: 3, name: "Дархадын хотгорт очих", description: "Дархадын хотгорт очино." },
          { day: 4, name: "Хотгороор аялах", description: "Дархадын хотгороор аялж байгалийг үзнэ." },
          { day: 5, name: "Соёл танилцах", description: "Дархад соёл, уламжлалтай танилцана." },
          { day: 6, name: "Хотгор аялал", description: "Дархадын хотгорын үзэсгэлэнт газруудыг үзнэ." },
          { day: 7, name: "Цаачид нуур", description: "Цаачид нуураар аялна." },
          { day: 8, name: "Нуур орчим", description: "Нуураар завиар аялна." },
          { day: 9, name: "Буцах зам", description: "Улаанбаатар руу буцах замд гарна." },
          { day: 10, name: "Буцах хөдөлгөөн", description: "Улаанбаатар руу буцна." },
          { day: 11, name: "Хөдөлгөөн", description: "Улаанбаатар руу хөдөлж байна." },
          { day: 12, name: "УБ ирэх", description: "Улаанбаатар хотод ирнэ." },
        ],
        subCategoryIds: [1, 2, 5, 9],
      },
    ];

    const travels = [];
    for (const { travel, agendas, subCategoryIds } of travelsData) {
      const [createdTravel] = await db.insert(travelTable).values(travel).returning();

      // Create multiple agendas (one per day)
      if (agendas && agendas.length > 0) {
        const agendaInserts = agendas.map((agenda) => ({
          day: agenda.day,
          name: agenda.name,
          description: agenda.description,
          travelId: createdTravel.id,
        }));
        await db.insert(agendaTable).values(agendaInserts);
      }

      // Create subcategory-to-travel relationships
      for (const subCategoryId of subCategoryIds) {
        await db.insert(subCategoryToTravelTable).values({
          subCategoryId,
          travelId: createdTravel.id,
        });

        // Also create category-to-travel relationship
        const subCategory = subCategories.find((sc) => sc.id === subCategoryId);
        if (subCategory) {
          // Check if category relationship already exists
          const existingCategoryRelation = await db
            .select()
            .from(categoryToTravelTable)
            .where((table) => table.categoryId === subCategory.categoryId && table.travelId === createdTravel.id)
            .limit(1);

          if (existingCategoryRelation.length === 0) {
            await db.insert(categoryToTravelTable).values({
              categoryId: subCategory.categoryId,
              travelId: createdTravel.id,
            });
          }
        }
      }

      travels.push(createdTravel);
    }
    console.log(`✅ Created ${travels.length} travels with agendas and category relationships`);

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
        { cost: 450000 }, // Хямд (450,000₮)
        { cost: 850000 }, // Дундаж (850,000₮)
        { cost: 1500000 }, // Сайн (1,500,000₮)
        { cost: 2500000 }, // Тансаг (2,500,000₮)
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
    console.log("   Customer: bat_ulzii / password123");
    console.log("   Company: nomad_expedition / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
