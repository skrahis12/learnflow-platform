import prisma from '../config/db.js';

const apnaCollegeCourses = [
  {
    title: "Java Placement Course - Full Tutorial",
    videoId: "yRpLlJmRo2w",
    category: "Programming"
  },
  {
    title: "Data Structures & Algorithms in Java",
    videoId: "V8qGqE5d5Mo", 
    category: "Programming"
  },
  {
    title: "Complete Web Development Course (HTML, CSS, JS)",
    videoId: "l1EssrLxt7E", // Standard web dev
    category: "Web Development"
  },
  {
    title: "SQL Tutorial for Beginners in Hindi",
    videoId: "BPHAr4QGGVE", 
    category: "Data Science"
  },
  {
    title: "Machine Learning & AI Complete Roadmap",
    videoId: "7eh4d6sabA0", 
    category: "Artificial Intelligence"
  },
  {
    title: "React JS - Full Tutorial from Scratch",
    videoId: "-mJFZp84TIY", 
    category: "Web Development"
  },
  {
    title: "Android App Development Roadmap",
    videoId: "InigF9uJHMs", 
    category: "Mobile Apps"
  },
  {
    title: "Cyber Security Fundamentals",
    videoId: "fS6eNf9XvFk", 
    category: "Cybersecurity"
  },
  {
    title: "Cloud Computing Basics",
    videoId: "M988_fsOSWo", 
    category: "Cloud Computing"
  },
  {
    title: "How to Build a Startup | Business Strategy",
    videoId: "DOtCl5YwA2A", 
    category: "Business Strategy"
  },
  {
    title: "Graphic Design Masterclass",
    videoId: "5c32g4pG1MA", 
    category: "Graphic Design"
  },
  {
    title: "Digital Marketing Complete Guide",
    videoId: "bixR-KIJKYM", 
    category: "Digital Marketing"
  }
];

async function addApnaCollege() {
    console.log(`Adding courses for Apna College...`);
    try {
        let adminUser = await prisma.user.findFirst({
            where: { email: "admin@qurio.com" }
        });
        
        if (!adminUser) {
            adminUser = await prisma.user.findFirst();
        }

        let added = 0;
        for (const v of apnaCollegeCourses) {
            const existingCourse = await prisma.course.findFirst({
                where: { title: v.title }
            });

            if (!existingCourse) {
                const viewsStr = Math.floor(Math.random() * 5 + 1) + "." + Math.floor(Math.random() * 9) + "M";

                await prisma.course.create({
                    data: {
                        title: v.title,
                        description: `Premium technical educational content by Apna College. Learn ${v.title} effectively.`,
                        price: 0,
                        videoUrl: `https://www.youtube.com/embed/${v.videoId}`,
                        thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
                        rating: 4.9,
                        studentsCount: Math.floor(Math.random() * 500000) + 100000,
                        views: viewsStr,
                        likesCount: Math.floor(Math.random() * 100) + 50 + "K",
                        duration: "Variable",
                        level: "All Levels",
                        category: v.category,
                        instructorName: "Apna College",
                        instructorId: adminUser.id,
                    }
                });
                console.log(`+ Added [${v.category}]: ${v.title}`);
                added++;
            } else {
                console.log(`= Skipped (exists): ${v.title}`);
            }
        }

        console.log(`\n✅ Completed! Added ${added} new courses from Apna College.`);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

addApnaCollege();
