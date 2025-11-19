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
  console.log("🌱 Starting database seeding with Mongolian data...");

  try {
    // First, clear all existing data
    console.log("🗑️ Clearing existing data...");
    await db.delete(seatTable);
    await db.delete(seatCostTable);
    await db.delete(travelSessionTable);
    await db.delete(agendaTable);
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
          duration: 10,
          totalSeatNumber: 15,
          companyId: companies[0].id,
          destinationId: destinations[0].id,
        },
        agenda: {
          name: "10 хоногийн Хөвсгөл аялал",
          description:
            "1-р өдөр: УБ-Мөрөн хөдөлгөөн\n2-3-р өдөр: Нуур орчим морин аялал\n4-5-р өдөр: Цагаан хот, Дархадын хотгор\n6-7-р өдөр: Нуураар завиар аялах\n8-9-р өдөр: Явган аялал, загас агнуур\n10-р өдөр: УБ буцах",
        },
      },
      {
        travel: {
          name: "Говь - Элсэн манхан аялал",
          description: "Өмнөговийн элсэн манхан, Хонгорын элс, Баянзаг, Үүлэн хадны үзэсгэлэнт байгаль. Тэмээн унах, үлзүүр нэрвэгдэх, одны орой үзэх.",
          coverImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
          duration: 7,
          totalSeatNumber: 12,
          companyId: companies[2].id,
          destinationId: destinations[1].id,
        },
        agenda: {
          name: "7 хоногийн Говийн аялал",
          description: "1-р өдөр: УБ-Баянзаг\n2-3-р өдөр: Хонгорын элс, тэмээн унах\n4-р өдөр: Үүлэн хад\n5-6-р өдөр: Говийн зэрлэг амьтан ажиглах\n7-р өдөр: УБ буцах",
        },
      },
      {
        travel: {
          name: "Хархорин - Ердийн хорих аялал",
          description: "Монголын түүхэн нийслэл Хархорин, Эрдэнэ Зуу хийд, Орхоны хүрхрээ, Цэнхэрийн булаг зэрэг газруудаар соёлын аялал.",
          coverImage: "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
          duration: 5,
          totalSeatNumber: 20,
          companyId: companies[1].id,
          destinationId: destinations[2].id,
        },
        agenda: {
          name: "5 хоногийн түүхэн аялал",
          description: "1-р өдөр: УБ-Хархорин\n2-р өдөр: Эрдэнэ Зуу хийд, музей\n3-р өдөр: Орхоны хүрхрээ\n4-р өдөр: Цэнхэрийн булаг\n5-р өдөр: УБ буцах",
        },
      },
      {
        travel: {
          name: "Тэрэлж - Хустай нуруу аялал",
          description: "Тэрэлжийн байгалийн цогцолборт газар, Хустайн тахь ажиглах, мэлхийн хөшөө, Чингис хааны морин хөшөө үзэх. Нийслэлээс ойрын баярын аялал.",
          coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
          duration: 3,
          totalSeatNumber: 25,
          companyId: companies[0].id,
          destinationId: destinations[3].id,
        },
        agenda: {
          name: "3 хоногийн амралтын аялал",
          description: "1-р өдөр: Чингис хааны морин хөшөө, Тэрэлж\n2-р өдөр: Явган аялал, морь унах\n3-р өдөр: Хустайн тахь ажиглах, УБ буцах",
        },
      },
      {
        travel: {
          name: "Алтай - Нисдэг шувуу агнуурын аялал",
          description: "Баян-Өлгий, Алтайн нуруу, Казак соёл танилцах, нисдэг шувуу агнуурын уламжлал үзэх. Алтай таван богдын үзэсгэлэнт уулс.",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          duration: 9,
          totalSeatNumber: 10,
          companyId: companies[4].id,
          destinationId: destinations[4].id,
        },
        agenda: {
          name: "9 хоногийн Алтайн аялал",
          description: "1-2-р өдөр: УБ-Өлгий хөдөлгөөн\n3-4-р өдөр: Нисдэг шувуу агнуур үзэх\n5-6-р өдөр: Алтай таван богд\n7-8-р өдөр: Казак соёл танилцах\n9-р өдөр: Буцах",
        },
      },
      {
        travel: {
          name: "Улаанбаатар хотын аялал",
          description: "Нийслэл хотын үзэсгэлэнт газрууд: Сүхбаатарын талбай, Гандантэгчинлэн хийд, Богд хааны ордон музей, Зайсан толгой, Чойжин ламын музей.",
          coverImage: "https://images.unsplash.com/photo-1580407196238-dac33f57c410",
          duration: 2,
          totalSeatNumber: 30,
          companyId: companies[1].id,
          destinationId: destinations[5].id,
        },
        agenda: {
          name: "2 хоногийн хотын аялал",
          description: "1-р өдөр: Музейнүүд, Гандан хийд\n2-р өдөр: Зайсан толгой, Чингисийн талбай, шоппинг",
        },
      },
      {
        travel: {
          name: "Хустай нуруу - Тахь ажиглах аялал",
          description: "Пржевальскийн морь буюу тахь ажиглах, байгалийн цогцолборт газраар явган аялах, зэрлэг амьтан ажиглах.",
          coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
          duration: 2,
          totalSeatNumber: 18,
          companyId: companies[2].id,
          destinationId: destinations[6].id,
        },
        agenda: {
          name: "2 хоногийн байгалийн аялал",
          description: "1-р өдөр: УБ-Хустай, тахь ажиглах\n2-р өдөр: Явган аялал, УБ буцах",
        },
      },
      {
        travel: {
          name: "Орхон хөндийн аялал",
          description: "ЮНЕСКО-гийн дэлхийн өвд бүртгэгдсэн Орхон хөндий, Орхоны хүрхрээ, Товхон хийд, нүүдэлчин айл танилцах.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          duration: 4,
          totalSeatNumber: 16,
          companyId: companies[1].id,
          destinationId: destinations[7].id,
        },
        agenda: {
          name: "4 хоногийн Орхон аялал",
          description: "1-р өдөр: УБ-Хархорин\n2-3-р өдөр: Орхоны хүрхрээ, явган аялал\n4-р өдөр: Товхон хийд, УБ буцах",
        },
      },
      {
        travel: {
          name: "Цагаан нуур - Архангай аялал",
          description: "Архангайн Цагаан нуур, рашаан сувилал, Хөгнө хан, Эрдэнэ хамт хийд. Амрах чиглэлийн аялал.",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          duration: 6,
          totalSeatNumber: 14,
          companyId: companies[0].id,
          destinationId: destinations[8].id,
        },
        agenda: {
          name: "6 хоногийн амралтын аялал",
          description: "1-2-р өдөр: УБ-Цагаан нуур\n3-4-р өдөр: Рашаан сувилал, нуур орчим\n5-р өдөр: Хөгнө хан\n6-р өдөр: УБ буцах",
        },
      },
      {
        travel: {
          name: "Хөгнө хан - Элсэн тасархайн аялал",
          description: "Хөгнө хан уул, Элсэн тасархай, Угийн нуур, Эрдэнэ хамт хийд. Баярын 3 хоногийн аялал.",
          coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
          duration: 3,
          totalSeatNumber: 20,
          companyId: companies[2].id,
          destinationId: destinations[9].id,
        },
        agenda: {
          name: "3 хоногийн Хөгнө хан аялал",
          description: "1-р өдөр: УБ-Хөгнө хан, элсэн тасархай\n2-р өдөр: Угийн нуур, Эрдэнэ хамт хийд\n3-р өдөр: УБ буцах",
        },
      },
      {
        travel: {
          name: "Завхан - Отгон тэнгэрийн аялал",
          description: "Завханы Отгон тэнгэр уул, Тосон хулстай, Тэлмэн нуур. Баруун бүсийн уулс, нууруудын аялал.",
          coverImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
          duration: 8,
          totalSeatNumber: 12,
          companyId: companies[0].id,
          destinationId: destinations[10].id,
        },
        agenda: {
          name: "8 хоногийн Завхан аялал",
          description: "1-2-р өдөр: УБ-Завхан хөдөлгөөн\n3-5-р өдөр: Отгон тэнгэр, явган аялал\n6-7-р өдөр: Тэлмэн нуур\n8-р өдөр: Буцах",
        },
      },
      {
        travel: {
          name: "Дархадын хотгор аялал",
          description: "Хөвсгөл аймгийн хойд хэсгийн Дархадын хотгор, Цагаан нуур, Дархад соёл танилцах. Цаачид нуур, үзэсгэлэнт байгаль.",
          coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          duration: 12,
          totalSeatNumber: 10,
          companyId: companies[2].id,
          destinationId: destinations[11].id,
        },
        agenda: {
          name: "12 хоногийн Дархад аялал",
          description: "1-3-р өдөр: УБ-Дархадын хотгор\n4-8-р өдөр: Хотгороор аялах, соёл танилцах\n9-11-р өдөр: Буцах зам\n12-р өдөр: УБ ирэх",
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
