import prisma from '../config/db.js';
import bcrypt from "bcryptjs";

const extraCourses = [
  // --- WEB DEVELOPMENT ---
  {
    title: "Next.js 14 Full Course 2024",
    instructor: "JavaScript Mastery",
    thumbnail: "https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/wm5gMKuwSYk",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "45K",
    duration: "4h 15m",
    level: "Intermediate",
    category: "Web Development",
    rating: 4.9,
    price: 0
  },
  {
    title: "Tailwind CSS Full Course",
    instructor: "Traversy Media",
    thumbnail: "https://i.ytimg.com/vi/UBOj6rqRUME/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
    studentsCount: 950000,
    views: "950K",
    likesCount: "25K",
    duration: "2h 30m",
    level: "Beginner",
    category: "Web Development",
    rating: 4.8,
    price: 0
  },
  // --- PROGRAMMING ---
  {
    title: "C# Full Course for Beginners",
    instructor: "Bro Code",
    thumbnail: "https://i.ytimg.com/vi/BM4CHBmAPh4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BM4CHBmAPh4",
    studentsCount: 1200000,
    views: "1.2M",
    likesCount: "35K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Programming",
    rating: 4.8,
    price: 0
  },
  {
    title: "Go Programming (Golang) Full Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/YS4e4q9oBaU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YS4e4q9oBaU",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "60K",
    duration: "6h 40m",
    level: "Intermediate",
    category: "Programming",
    rating: 4.7,
    price: 0
  },
  {
    title: "Rust Crash Course",
    instructor: "Traversy Media",
    thumbnail: "https://i.ytimg.com/vi/zF34dRivLOw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zF34dRivLOw",
    studentsCount: 850000,
    views: "850K",
    likesCount: "30K",
    duration: "1h 45m",
    level: "Intermediate",
    category: "Programming",
    rating: 4.8,
    price: 0
  },
  // --- GAME DEVELOPMENT ---
  {
    title: "Unreal Engine 5 Beginner Tutorial",
    instructor: "Unreal Sensei",
    thumbnail: "https://i.ytimg.com/vi/k-zMkzmduqI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/k-zMkzmduqI",
    studentsCount: 3000000,
    views: "3M",
    likesCount: "120K",
    duration: "4h 30m",
    level: "Beginner",
    category: "Game Development",
    rating: 4.9,
    price: 0
  },
  {
    title: "Unity Full Course - Game Development for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/gB1F9G0JXOo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/gB1F9G0JXOo",
    studentsCount: 4500000,
    views: "4.5M",
    likesCount: "140K",
    duration: "7h 15m",
    level: "Beginner",
    category: "Game Development",
    rating: 4.8,
    price: 0
  },
  {
    title: "Godot 4 Crash Course for Beginners",
    instructor: "Brackeys",
    thumbnail: "https://i.ytimg.com/vi/LOhfqjmasi0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/LOhfqjmasi0",
    studentsCount: 2200000,
    views: "2.2M",
    likesCount: "150K",
    duration: "1h 20m",
    level: "Beginner",
    category: "Game Development",
    rating: 4.9,
    price: 0
  },
  // --- DATA SCIENCE & AI ---
  {
    title: "SQL Full Course for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/HXV3zeQKqGY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    studentsCount: 9000000,
    views: "9M",
    likesCount: "250K",
    duration: "4h 20m",
    level: "Beginner",
    category: "Data Science",
    rating: 4.8,
    price: 0
  },
  {
    title: "Prompt Engineering Tutorial for Beginners",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/jC4v5AS4ART/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/jC4v5AS4ART",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "40K",
    duration: "45m",
    level: "Beginner",
    category: "Artificial Intelligence",
    rating: 4.7,
    price: 0
  },
  // --- VIDEO EDITING ---
  {
    title: "Premiere Pro 2024 Tutorial for Beginners",
    instructor: "Kevin Stratvert",
    thumbnail: "https://i.ytimg.com/vi/q1RzX061mEQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/q1RzX061mEQ",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "65K",
    duration: "30m",
    level: "Beginner",
    category: "Video Editing",
    rating: 4.8,
    price: 0
  },
  {
    title: "DaVinci Resolve 18 Crash Course",
    instructor: "Casey Faris",
    thumbnail: "https://i.ytimg.com/vi/1HqGNTyL6y8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1HqGNTyL6y8",
    studentsCount: 1800000,
    views: "1.8M",
    likesCount: "70K",
    duration: "1h 10m",
    level: "Beginner",
    category: "Video Editing",
    rating: 4.9,
    price: 0
  },
  {
    title: "After Effects Tutorial - Beginner to Pro",
    instructor: "Envato Tuts+",
    thumbnail: "https://i.ytimg.com/vi/YF1eYHCkrmo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YF1eYHCkrmo",
    studentsCount: 1200000,
    views: "1.2M",
    likesCount: "45K",
    duration: "4h 00m",
    level: "Intermediate",
    category: "Video Editing",
    rating: 4.7,
    price: 0
  },
  // --- PHOTOGRAPHY ---
  {
    title: "Photography Tutorial - Beginner to Pro",
    instructor: "Chris Bray Photography",
    thumbnail: "https://i.ytimg.com/vi/V7z7BAZdt2M/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/V7z7BAZdt2M",
    studentsCount: 4500000,
    views: "4.5M",
    likesCount: "85K",
    duration: "2h 30m",
    level: "Beginner",
    category: "Photography",
    rating: 4.9,
    price: 0
  },
  {
    title: "Lightroom Tutorial for Beginners",
    instructor: "Terry White",
    thumbnail: "https://i.ytimg.com/vi/7j5w-u9Zg0M/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/7j5w-u9Zg0M",
    studentsCount: 900000,
    views: "900K",
    likesCount: "20K",
    duration: "45m",
    level: "Beginner",
    category: "Photography",
    rating: 4.7,
    price: 0
  },
  // --- MUSIC PRODUCTION ---
  {
    title: "FL Studio 21 Beginner Tutorial",
    instructor: "In The Mix",
    thumbnail: "https://i.ytimg.com/vi/aLzW_sVxyI8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/aLzW_sVxyI8",
    studentsCount: 3500000,
    views: "3.5M",
    likesCount: "135K",
    duration: "30m",
    level: "Beginner",
    category: "Music",
    rating: 4.9,
    price: 0
  },
  {
    title: "Music Theory for Beginners",
    instructor: "Andrew Huang",
    thumbnail: "https://i.ytimg.com/vi/rgaTLrZGlk0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/rgaTLrZGlk0",
    studentsCount: 8000000,
    views: "8M",
    likesCount: "400K",
    duration: "30m",
    level: "Beginner",
    category: "Music",
    rating: 4.9,
    price: 0
  },
  // --- PERSONAL FINANCE / BUSINESS ---
  {
    title: "Stock Market For Beginners",
    instructor: "Rayner Teo",
    thumbnail: "https://i.ytimg.com/vi/p7HKvqRI_Bo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/p7HKvqRI_Bo",
    studentsCount: 5000000,
    views: "5M",
    likesCount: "150K",
    duration: "1h 45m",
    level: "Beginner",
    category: "Business Strategy",
    rating: 4.8,
    price: 0
  },
  {
    title: "How to Build a Startup",
    instructor: "Y Combinator",
    thumbnail: "https://i.ytimg.com/vi/DOtCl5YwA2A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/DOtCl5YwA2A",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "80K",
    duration: "45m",
    level: "Intermediate",
    category: "Business Strategy",
    rating: 4.9,
    price: 0
  },
  // --- PRODUCTIVITY ---
  {
    title: "Notion Tutorial 2024",
    instructor: "Thomas Frank Setup",
    thumbnail: "https://i.ytimg.com/vi/cQkKqI6-P7Q/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/cQkKqI6-P7Q",
    studentsCount: 1000000,
    views: "1M",
    likesCount: "50K",
    duration: "1h 10m",
    level: "Beginner",
    category: "Business Strategy",
    rating: 4.8,
    price: 0
  },
  {
    title: "Excel Tutorial for Beginners",
    instructor: "Kevin Stratvert",
    thumbnail: "https://i.ytimg.com/vi/Vl0H-qTclOg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Vl0H-qTclOg",
    studentsCount: 15000000,
    views: "15M",
    likesCount: "300K",
    duration: "2h 20m",
    level: "Beginner",
    category: "Business Strategy",
    rating: 4.8,
    price: 0
  }
];

async function seedExtraCourses() {
    console.log("Seeding extra 21 courses...");
    try {
        // Find existing instructor or use dev account
        let adminUser = await prisma.user.findFirst({
            where: { email: "admin@qurio.com" }
        });
        
        if (!adminUser) {
            console.log("Admin not found... using first available user as instructor");
            adminUser = await prisma.user.findFirst();
        }

        if(!adminUser) {
          const hashedPassword = await bcrypt.hash("Password123!", 10);
          adminUser = await prisma.user.create({
              data: {
                  name: "Qurio Admin",
                  email: "admin@qurio.com",
                  password: hashedPassword,
                  role: "admin",
              }
          });
        }
        
        // Count before insert
        const countBefore = await prisma.course.count();
        console.log(`Current course count: ${countBefore}`);

        for (const courseData of extraCourses) {
            // Check if it already exists
            const existingCourse = await prisma.course.findFirst({
                where: { title: courseData.title }
            });

            if (!existingCourse) {
                const { instructor, ...restCourseData } = courseData;
                await prisma.course.create({
                    data: {
                        ...restCourseData,
                        description: `Master ${courseData.title.split(' ')[0]} with this comprehensive, easy-to-follow practical course designed for ${courseData.level} students. Taught by industry expert ${courseData.instructor}.`,
                        instructorName: courseData.instructor,
                        instructorId: adminUser.id,
                    }
                });
                console.log(`+ Added: ${courseData.title}`);
            } else {
                console.log(`= Skipped (exists): ${courseData.title}`);
            }
        }

        const countAfter = await prisma.course.count();
        console.log(`\n✅ Finished! Added ${countAfter - countBefore} extra courses.`);
        console.log(`🎉 Total courses in database: ${countAfter}`);

    } catch (error) {
        console.error("Error seeding extra courses:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedExtraCourses();
