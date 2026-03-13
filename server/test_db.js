import prisma from './db.js';

async function main() {
    try {
        console.log("Connecting to DB...");

        const where = { hidden: false };
        const orderBy = { studentsCount: 'desc' };

        // Mimic getAllCourses query exactly
        const courses = await prisma.course.findMany({
            where,
            orderBy,
            select: {
                id: true,
                title: true,
                price: true,
                videoUrl: true,
                thumbnail: true,
                rating: true,
                studentsCount: true,
                views: true,
                likes: true, // This is a relation, wait!
                duration: true,
                level: true,
                category: true,
                instructorName: true,
            }
        });

        console.log("Courses found:", courses.length);
        if (courses.length > 0) {
            console.log("First course:", courses[0]);
        }
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
