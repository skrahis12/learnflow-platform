import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testimonials = [
    {
        name: "Alexandra Rivera",
        role: "Software Engineer at Google",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        content: "Qurio transformed my career. The web development bootcamp gave me the skills I needed to land my dream job. The instructors are world-class!",
        rating: 5,
    },
    {
        name: "Marcus Thompson",
        role: "UX Designer at Apple",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        content: "The UI/UX course was incredibly comprehensive. I went from a complete beginner to designing professional interfaces in just 3 months.",
        rating: 5,
    },
    {
        name: "Sarah Kim",
        role: "Data Scientist at Netflix",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        content: "The machine learning course exceeded my expectations. Real-world projects and expert guidance made complex concepts easy to understand.",
        rating: 5,
    },
];

const seedTestimonials = async () => {
    console.log("🌱 Seeding testimonials...");

    for (const t of testimonials) {
        const existing = await prisma.testimonial.findFirst({
            where: { name: t.name, content: t.content }
        });

        if (!existing) {
            await prisma.testimonial.create({
                data: t
            });
            console.log(`+ Added testimonial from: ${t.name}`);
        } else {
            console.log(`= Skipped (exists): ${t.name}`);
        }
    }

    console.log("✅ Testimonial seeding completed!");
};

seedTestimonials()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
