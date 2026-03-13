import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
    try {
        console.log("Checking Testimonial table...");
        const count = await prisma.testimonial.count();
        console.log(`✅ Testimonial table exists. Count: ${count}`);

        const testimonials = await prisma.testimonial.findMany();
        console.log("Data:", testimonials);
    } catch (error) {
        console.error("❌ Error accessing Testimonial table:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
