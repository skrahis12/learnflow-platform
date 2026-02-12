import prisma from "./db.js";
import bcrypt from "bcryptjs";

const allCourses = [
    // --- WEB DEVELOPMENT ---
    {
        title: "HTML & CSS Full Course - Beginner to Pro",
        instructor: "SuperSimpleDev",
        thumbnail: "https://i.ytimg.com/vi/G3e-cpL7ofc/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc",
        studentsCount: 1500000,
        views: "1.5M",
        likes: "45K",
        duration: "6h 30m",
        level: "Beginner",
        category: "Web Development",
        rating: 4.9,
        price: 0
    },
    {
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        instructor: "Programming with Mosh",
        thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
        studentsCount: 3200000,
        views: "3.2M",
        likes: "120K",
        duration: "1h 00m",
        level: "Beginner",
        category: "Web Development",
        rating: 4.8,
        price: 0
    },
    {
        title: "React JS - React Tutorial for Beginners",
        instructor: "Programming with Mosh",
        thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
        studentsCount: 2100000,
        views: "2.1M",
        likes: "85K",
        duration: "2h 25m",
        level: "Intermediate",
        category: "Web Development",
        rating: 4.7,
        price: 0
    },
    {
        title: "Node.js and Express.js - Full Course",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
        studentsCount: 950000,
        views: "950K",
        likes: "32K",
        duration: "8h 15m",
        level: "Advanced",
        category: "Web Development",
        rating: 4.8,
        price: 0
    },
    {
        title: "Full Stack Web Development for Beginners",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/Q33KBiDriJY/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Q33KBiDriJY",
        studentsCount: 450000,
        views: "450K",
        likes: "15K",
        duration: "10h 30m",
        level: "Beginner",
        category: "Web Development",
        rating: 4.6,
        price: 0
    },

    // --- GRAPHIC DESIGN ---
    {
        title: "Figma UI/UX Design Full Course",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/5c32g4pG1MA/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/5c32g4pG1MA",
        studentsCount: 2000000,
        views: "2M",
        likes: "60K",
        duration: "4h 00m",
        level: "Beginner",
        category: "Graphic Design",
        rating: 4.9,
        price: 0
    },
    {
        title: "Adobe Photoshop for Beginners | FREE COURSE",
        instructor: "Envato Tuts+",
        thumbnail: "https://i.ytimg.com/vi/IyR_uYsRdPs/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
        studentsCount: 1200000,
        views: "1.2M",
        likes: "40K",
        duration: "3h 10m",
        level: "Beginner",
        category: "Graphic Design",
        rating: 4.9,
        price: 0
    },
    {
        title: "Graphic Design Full Course - Beginner to Pro",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/s8k-qB6hS4U/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/s8k-qB6hS4U",
        studentsCount: 900000,
        views: "900K",
        likes: "35K",
        duration: "6h 30m",
        level: "All Levels",
        category: "Graphic Design",
        rating: 4.7,
        price: 0
    },

    // --- BUSINESS STRATEGY ---
    {
        title: "Project Management Full Course",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/5d169lT_4v4/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/5d169lT_4v4",
        studentsCount: 410000,
        views: "410K",
        likes: "12K",
        duration: "2h 00m",
        level: "Intermediate",
        category: "Business Strategy",
        rating: 4.6,
        price: 0
    },
    {
        title: "Entrepreneurship 101",
        instructor: "Harvard Innovation Labs",
        thumbnail: "https://i.ytimg.com/vi/lPh5h8I4F3I/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/lPh5h8I4F3I",
        studentsCount: 850000,
        views: "850K",
        likes: "25K",
        duration: "1h 15m",
        level: "Beginner",
        category: "Business Strategy",
        rating: 4.8,
        price: 0
    },

    // --- DIGITAL MARKETING ---
    {
        title: "Digital Marketing Course for Beginners",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/bixR-KIJKYM/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM",
        studentsCount: 500000,
        views: "500K",
        likes: "18K",
        duration: "2h 00m",
        level: "Beginner",
        category: "Digital Marketing",
        rating: 4.6,
        price: 0
    },
    {
        title: "SEO Tutorial for Beginners",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/DvwXlbfiwVQ/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/DvwXlbfiwVQ",
        studentsCount: 1500000,
        views: "1.5M",
        likes: "40K",
        duration: "8h 30m",
        level: "Beginner",
        category: "Digital Marketing",
        rating: 4.8,
        price: 0
    },
    {
        title: "Google Ads Full Course",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/_0tT5_GvbIQ/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/_0tT5_GvbIQ",
        studentsCount: 600000,
        views: "600K",
        likes: "15K",
        duration: "5h 00m",
        level: "Intermediate",
        category: "Digital Marketing",
        rating: 4.7,
        price: 0
    },

    // --- MOBILE APPS ---
    {
        title: "React Native Tutorial for Beginners",
        instructor: "Programming with Mosh",
        thumbnail: "https://i.ytimg.com/vi/0-S5a0eXPoc/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
        studentsCount: 1800000,
        views: "1.8M",
        likes: "60K",
        duration: "2h 05m",
        level: "Beginner",
        category: "Mobile Apps",
        rating: 4.8,
        price: 0
    },
    {
        title: "Flutter for Beginners",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/VPvVD8t02U8/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VPvVD8t02U8",
        studentsCount: 2000000,
        views: "2M",
        likes: "50K",
        duration: "37h 00m",
        level: "Beginner",
        category: "Mobile Apps",
        rating: 4.9,
        price: 0
    },
    {
        title: "Android Development for Beginners",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/fis26HvvDII/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/fis26HvvDII",
        studentsCount: 1100000,
        views: "1.1M",
        likes: "35K",
        duration: "11h 30m",
        level: "Intermediate",
        category: "Mobile Apps",
        rating: 4.8,
        price: 0
    },
    {
        title: "Swift Programming Tutorial for Beginners",
        instructor: "CodeWithChris",
        thumbnail: "https://i.ytimg.com/vi/F9UC9DY-vIU/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/F9UC9DY-vIU",
        studentsCount: 400000,
        views: "400K",
        likes: "12K",
        duration: "3h 15m",
        level: "Beginner",
        category: "Mobile Apps",
        rating: 4.7,
        price: 0
    },

    // --- DATA SCIENCE ---
    {
        title: "Data Science Full Course - Learn Data Science in 10 Hours",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/-ETQ97mXXF0/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/-ETQ97mXXF0",
        studentsCount: 2500000,
        views: "2.5M",
        likes: "75K",
        duration: "10h 00m",
        level: "Beginner",
        category: "Data Science",
        rating: 4.8,
        price: 0
    },
    {
        title: "Python for Data Science - Course for Beginners",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/LHBE6Q9XlzI/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/LHBE6Q9XlzI",
        studentsCount: 3000000,
        views: "3M",
        likes: "95K",
        duration: "12h 00m",
        level: "Intermediate",
        category: "Data Science",
        rating: 4.9,
        price: 0
    },
    {
        title: "Statistics for Data Science",
        instructor: "Great Learning",
        thumbnail: "https://i.ytimg.com/vi/Vfo5le26IhY/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Vfo5le26IhY",
        studentsCount: 800000,
        views: "800K",
        likes: "20K",
        duration: "4h 30m",
        level: "Intermediate",
        category: "Data Science",
        rating: 4.7,
        price: 0
    },
    {
        title: "Data Analysis with Python - Full Course for Beginners",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/r-uOLxNrNk8/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/r-uOLxNrNk8",
        studentsCount: 3000000,
        views: "3M",
        likes: "85K",
        duration: "4h 30m",
        level: "Intermediate",
        category: "Data Science",
        rating: 4.8,
        price: 0
    },
    {
        title: "Machine Learning with Python",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/ukzFI9rgwfU/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
        studentsCount: 650000,
        views: "650K",
        likes: "18K",
        duration: "8h 00m",
        level: "Advanced",
        category: "Data Science",
        rating: 4.7,
        price: 0
    },

    // --- CYBERSECURITY ---
    {
        title: "Ethical Hacking Full Course - Learn Ethical Hacking in 12 Hours",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/3Kq1MIfTWCE/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE",
        studentsCount: 2000000,
        views: "2M",
        likes: "60K",
        duration: "12h 00m",
        level: "Beginner",
        category: "Cybersecurity",
        rating: 4.8,
        price: 0
    },
    {
        title: "Cyber Security Full Course",
        instructor: "Great Learning",
        thumbnail: "https://i.ytimg.com/vi/fS6eNf9XvFk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/fS6eNf9XvFk",
        studentsCount: 3500000,
        views: "3.5M",
        likes: "125K",
        duration: "11h 30m",
        level: "Beginner",
        category: "Cybersecurity",
        rating: 4.9,
        price: 0
    },
    {
        title: "Ethical Hacking Course",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/dz7Ntp7KQGA/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/dz7Ntp7KQGA",
        studentsCount: 1500000,
        views: "1.5M",
        likes: "40K",
        duration: "4h 00m",
        level: "Intermediate",
        category: "Cybersecurity",
        rating: 4.9,
        price: 0
    },
    {
        title: "Network Security Tutorial",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/qiQR5rTSshw/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/qiQR5rTSshw",
        studentsCount: 400000,
        views: "400K",
        likes: "12K",
        duration: "5h 30m",
        level: "Intermediate",
        category: "Cybersecurity",
        rating: 4.7,
        price: 0
    },
    {
        title: "Penetration Testing | Ethical Hacking Tutorial",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/fNz8ykqJltc/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/fNz8ykqJltc",
        studentsCount: 1500000,
        views: "1.5M",
        likes: "45K",
        duration: "1h 30m",
        level: "Advanced",
        category: "Cybersecurity",
        rating: 4.8,
        price: 0
    },

    // --- ARTIFICIAL INTELLIGENCE ---
    {
        title: "Artificial Intelligence Full Course | AI Tutorial for Beginners",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/JMUxmLyrhSk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        studentsCount: 1200000,
        views: "1.2M",
        likes: "40K",
        duration: "4h 30m",
        level: "Beginner",
        category: "Artificial Intelligence",
        rating: 4.8,
        price: 0
    },
    {
        title: "Machine Learning Full Course",
        instructor: "Edureka",
        thumbnail: "https://i.ytimg.com/vi/GwIoJAO7M6k/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/GwIoJAO7M6k",
        studentsCount: 1200000,
        views: "1.2M",
        likes: "35K",
        duration: "10h 00m",
        level: "Intermediate",
        category: "Artificial Intelligence",
        rating: 4.8,
        price: 0
    },
    {
        title: "Deep Learning Crash Course",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/VyWAvY2CF9c/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VyWAvY2CF9c",
        studentsCount: 500000,
        views: "500K",
        likes: "15K",
        duration: "3h 45m",
        level: "Advanced",
        category: "Artificial Intelligence",
        rating: 4.9,
        price: 0
    },
    {
        title: "Neural Networks from Scratch",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/Wo5dMEP_BbI/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/Wo5dMEP_BbI",
        studentsCount: 4000000,
        views: "4M",
        likes: "150K",
        duration: "4h 00m",
        level: "Advanced",
        category: "Artificial Intelligence",
        rating: 5.0,
        price: 0
    },
    {
        title: "TensorFlow 2.0 Complete Course",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/tPYj3fFJGjk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/tPYj3fFJGjk",
        studentsCount: 300000,
        views: "300K",
        likes: "12K",
        duration: "14h 00m",
        level: "Intermediate",
        category: "Artificial Intelligence",
        rating: 4.7,
        price: 0
    },

    // --- CLOUD COMPUTING ---
    {
        title: "Cloud Computing Full Course | Cloud Computing Tutorial",
        instructor: "Simplilearn",
        thumbnail: "https://i.ytimg.com/vi/M988_fsOSWo/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/M988_fsOSWo",
        studentsCount: 2000000,
        views: "2M",
        likes: "50K",
        duration: "3h 00m",
        level: "Beginner",
        category: "Cloud Computing",
        rating: 4.8,
        price: 0
    },
    {
        title: "AWS Certified Cloud Practitioner - Full Course",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/3hLmDS179YE/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/3hLmDS179YE",
        studentsCount: 2000000,
        views: "2M",
        likes: "60K",
        duration: "13h 00m",
        level: "Beginner",
        category: "Cloud Computing",
        rating: 4.9,
        price: 0
    },
    {
        title: "Azure Fundamentals Course",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/NKEFWyqJ5dy/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/NKEFWyqJ5dy",
        studentsCount: 800000,
        views: "800K",
        likes: "25K",
        duration: "8h 30m",
        level: "Intermediate",
        category: "Cloud Computing",
        rating: 4.8,
        price: 0
    },
    {
        title: "Google Cloud Digital Leader Certification",
        instructor: "freeCodeCamp.org",
        thumbnail: "https://i.ytimg.com/vi/U9k6k4o1kQo/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/U9k6k4o1kQo",
        studentsCount: 600000,
        views: "600K",
        likes: "18K",
        duration: "6h 00m",
        level: "Intermediate",
        category: "Cloud Computing",
        rating: 4.7,
        price: 0
    },
    {
        title: "Docker & Kubernetes Tutorial",
        instructor: "TechWorld with Nana",
        thumbnail: "https://i.ytimg.com/vi/3c-iBn73dDE/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE",
        studentsCount: 1500000,
        views: "1.5M",
        likes: "45K",
        duration: "3h 30m",
        level: "Advanced",
        category: "Cloud Computing",
        rating: 4.9,
        price: 0
    },
];


const seedCourses = async () => {
    console.log("🌱 Seeding courses...");

    // 1. Ensure a default instructor user exists
    const email = "instructor@learnflow.com";
    let instructor = await prisma.user.findUnique({ where: { email } });

    if (!instructor) {
        const hashedPassword = await bcrypt.hash("password123", 10);
        instructor = await prisma.user.create({
            data: {
                name: "LearnFlow Instructor",
                email,
                password: hashedPassword,
                role: "instructor",
            },
        });
        console.log("✅ Created default instructor user");
    }

    // 2. Loop and upsert courses
    for (const courseData of allCourses) {
        // We check if a course with this title already exists to avoid duplicates
        // Since title isn't @unique in schema, we use findFirst
        const existing = await prisma.course.findFirst({
            where: { title: courseData.title }
        });

        if (!existing) {
            await prisma.course.create({
                data: {
                    title: courseData.title,
                    description: `Learn ${courseData.title} completely free.`,
                    price: courseData.price,
                    videoUrl: courseData.videoUrl,
                    thumbnail: courseData.thumbnail,
                    rating: parseFloat(courseData.rating),
                    studentsCount: courseData.studentsCount,
                    views: courseData.views,
                    likesCount: courseData.likes, // Map 'likes' from data array to 'likesCount' in DB
                    duration: courseData.duration,
                    level: courseData.level,
                    category: courseData.category,
                    instructorName: courseData.instructor, // Store the display string here
                    instructorId: instructor.id, // Link to the 'owner' user
                    hidden: false
                }
            });
            console.log(`+ Added: ${courseData.title}`);
        } else {
            console.log(`= Skipped (exists): ${courseData.title}`);
        }
    }

    console.log("✅ Seeding completed!");
};

seedCourses()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
