import prisma from '../config/db.js';
import bcrypt from "bcryptjs";

const extraCategoryCourses = [
  // --- WEB DEVELOPMENT ---
  {
    title: "TypeScript Full Course for Beginners",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/d56mG7DezGs/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/d56mG7DezGs",
    studentsCount: 1300000,
    views: "1.3M",
    likesCount: "40K",
    duration: "1h 15m",
    level: "Beginner",
    category: "Web Development",
    rating: 4.8,
    price: 0
  },
  {
    title: "MERN Stack Full Tutorial",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/-0exw-9YJBo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-0exw-9YJBo",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "50K",
    duration: "5h 30m",
    level: "Intermediate",
    category: "Web Development",
    rating: 4.9,
    price: 0
  },

  // --- GRAPHIC DESIGN ---
  {
    title: "Blender 3D Modeling Tutorial",
    instructor: "Blender Guru",
    thumbnail: "https://i.ytimg.com/vi/nIoXOplUvAw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/nIoXOplUvAw",
    studentsCount: 5000000,
    views: "5M",
    likesCount: "200K",
    duration: "45m",
    level: "Beginner",
    category: "Graphic Design",
    rating: 4.9,
    price: 0
  },
  {
    title: "Procreate Masterclass for Beginners",
    instructor: "Ghost Paper",
    thumbnail: "https://i.ytimg.com/vi/W59hE1Fv5vI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/W59hE1Fv5vI",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "60K",
    duration: "1h 20m",
    level: "Beginner",
    category: "Graphic Design",
    rating: 4.8,
    price: 0
  },

  // --- BUSINESS STRATEGY ---
  {
    title: "Agile Project Management Tutorial",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/Z9QbYZh1YXY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Z9QbYZh1YXY",
    studentsCount: 800000,
    views: "800K",
    likesCount: "25K",
    duration: "2h 45m",
    level: "Intermediate",
    category: "Business Strategy",
    rating: 4.6,
    price: 0
  },
  {
    title: "Lean Six Sigma Full Course",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/mI_wZ7F0zGY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/mI_wZ7F0zGY",
    studentsCount: 650000,
    views: "650K",
    likesCount: "15K",
    duration: "3h 10m",
    level: "Advanced",
    category: "Business Strategy",
    rating: 4.7,
    price: 0
  },

  // --- DIGITAL MARKETING ---
  {
    title: "Facebook Ads Masterclass 2024",
    instructor: "Ben Heath",
    thumbnail: "https://i.ytimg.com/vi/B8P754zJ678/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/B8P754zJ678",
    studentsCount: 1000000,
    views: "1M",
    likesCount: "35K",
    duration: "2h 00m",
    level: "Beginner",
    category: "Digital Marketing",
    rating: 4.9,
    price: 0
  },
  {
    title: "Social Media Marketing Full Course",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/v2f-o3oZ98s/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/v2f-o3oZ98s",
    studentsCount: 1200000,
    views: "1.2M",
    likesCount: "30K",
    duration: "5h 00m",
    level: "Intermediate",
    category: "Digital Marketing",
    rating: 4.8,
    price: 0
  },

  // --- MOBILE APPS ---
  {
    title: "Kotlin for Android App Development",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/F9UC9DY-vIU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/F9UC9DY-vIU", // Reuse placeholder safely
    studentsCount: 850000,
    views: "850K",
    likesCount: "25K",
    duration: "6h 30m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: 4.8,
    price: 0
  },
  {
    title: "iOS 17 Development with Swift",
    instructor: "CodeWithChris",
    thumbnail: "https://i.ytimg.com/vi/09TeUXjzpKs/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/09TeUXjzpKs",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "75K",
    duration: "3h 00m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: 4.9,
    price: 0
  },

  // --- DATA SCIENCE ---
  {
    title: "Pandas Data Analysis Tutorial",
    instructor: "Keith Galli",
    thumbnail: "https://i.ytimg.com/vi/vmEHCJofslg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "45K",
    duration: "1h 10m",
    level: "Intermediate",
    category: "Data Science",
    rating: 4.9,
    price: 0
  },
  {
    title: "PyTorch Deep Learning Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/V_xro1bcAuA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/V_xro1bcAuA",
    studentsCount: 2500000,
    views: "2.5M",
    likesCount: "80K",
    duration: "25h 00m",
    level: "Advanced",
    category: "Data Science",
    rating: 4.9,
    price: 0
  },

  // --- CYBERSECURITY ---
  {
    title: "CompTIA Security+ Full Course",
    instructor: "Professor Messer",
    thumbnail: "https://i.ytimg.com/vi/9ZptOEU_wK8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9ZptOEU_wK8",
    studentsCount: 3000000,
    views: "3M",
    likesCount: "100K",
    duration: "15h 00m",
    level: "Beginner",
    category: "Cybersecurity",
    rating: 4.9,
    price: 0
  },
  {
    title: "Kali Linux Tutorial for Beginners",
    instructor: "NetworkChuck",
    thumbnail: "https://i.ytimg.com/vi/lZAoFs75_cs/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/lZAoFs75_cs",
    studentsCount: 5000000,
    views: "5M",
    likesCount: "150K",
    duration: "45m",
    level: "Intermediate",
    category: "Cybersecurity",
    rating: 4.8,
    price: 0
  },

  // --- ARTIFICIAL INTELLIGENCE ---
  {
    title: "LangChain Tutorial for Beginners",
    instructor: "Rabbitmetrics",
    thumbnail: "https://i.ytimg.com/vi/_v_fgW2SkkQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/_v_fgW2SkkQ",
    studentsCount: 600000,
    views: "600K",
    likesCount: "20K",
    duration: "1h 15m",
    level: "Intermediate",
    category: "Artificial Intelligence",
    rating: 4.8,
    price: 0
  },
  {
    title: "ChatGPT API Course for Developers",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/b-QePuEFPTQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/b-QePuEFPTQ",
    studentsCount: 1200000,
    views: "1.2M",
    likesCount: "35K",
    duration: "2h 30m",
    level: "Advanced",
    category: "Artificial Intelligence",
    rating: 4.7,
    price: 0
  },

  // --- CLOUD COMPUTING ---
  {
    title: "AWS Solutions Architect Associate",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/Q2jBw_vN2p4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Q2jBw_vN2p4",
    studentsCount: 3500000,
    views: "3.5M",
    likesCount: "110K",
    duration: "50h 00m",
    level: "Intermediate",
    category: "Cloud Computing",
    rating: 4.9,
    price: 0
  },
  {
    title: "Terraform Tutorial for Beginners",
    instructor: "TechWorld with Nana",
    thumbnail: "https://i.ytimg.com/vi/l5k1aiIG1cc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/l5k1aiIG1cc",
    studentsCount: 2200000,
    views: "2.2M",
    likesCount: "70K",
    duration: "2h 45m",
    level: "Intermediate",
    category: "Cloud Computing",
    rating: 4.8,
    price: 0
  },

  // --- PROGRAMMING ---
  {
    title: "C++ Programming Full Course",
    instructor: "Bro Code",
    thumbnail: "https://i.ytimg.com/vi/ZzaPdXTrSb8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ZzaPdXTrSb8",
    studentsCount: 3000000,
    views: "3M",
    likesCount: "100K",
    duration: "6h 00m",
    level: "Beginner",
    category: "Programming",
    rating: 4.9,
    price: 0
  },
  {
    title: "Java Full Course for Beginners",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/eIrMbAQSU34/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    studentsCount: 4500000,
    views: "4.5M",
    likesCount: "135K",
    duration: "2h 30m",
    level: "Beginner",
    category: "Programming",
    rating: 4.8,
    price: 0
  },

  // --- GAME DEVELOPMENT ---
  {
    title: "Unity 2D Game Development Tutorial",
    instructor: "Brackeys",
    thumbnail: "https://i.ytimg.com/vi/pwZkJzpE2lQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/pwZkJzpE2lQ",
    studentsCount: 4000000,
    views: "4M",
    likesCount: "150K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Game Development",
    rating: 4.9,
    price: 0
  },
  {
    title: "Godot 4 Beginner to Pro",
    instructor: "Clear Code",
    thumbnail: "https://i.ytimg.com/vi/nAh_Kx5Zh5Q/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/nAh_Kx5Zh5Q",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "65K",
    duration: "11h 00m",
    level: "Intermediate",
    category: "Game Development",
    rating: 4.9,
    price: 0
  },

  // --- VIDEO EDITING ---
  {
    title: "CapCut PC Full Tutorial",
    instructor: "Kevin Stratvert",
    thumbnail: "https://i.ytimg.com/vi/M7W4ZlP9_5A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/M7W4ZlP9_5A",
    studentsCount: 3000000,
    views: "3M",
    likesCount: "90K",
    duration: "45m",
    level: "Beginner",
    category: "Video Editing",
    rating: 4.8,
    price: 0
  },
  {
    title: "Final Cut Pro Tutorial",
    instructor: "MacMost",
    thumbnail: "https://i.ytimg.com/vi/31QeA4K6n4U/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/31QeA4K6n4U",
    studentsCount: 1200000,
    views: "1.2M",
    likesCount: "40K",
    duration: "1h 30m",
    level: "Intermediate",
    category: "Video Editing",
    rating: 4.7,
    price: 0
  },

  // --- PHOTOGRAPHY ---
  {
    title: "Sony Alpha Masterclass",
    instructor: "Mark Galer",
    thumbnail: "https://i.ytimg.com/vi/5-2IbyVWe-w/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5-2IbyVWe-w",
    studentsCount: 800000,
    views: "800K",
    likesCount: "30K",
    duration: "2h 15m",
    level: "Advanced",
    category: "Photography",
    rating: 4.8,
    price: 0
  },
  {
    title: "Portrait Photography Tips",
    instructor: "Manny Ortiz",
    thumbnail: "https://i.ytimg.com/vi/wJ7P2sAOHg4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/wJ7P2sAOHg4",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "55K",
    duration: "15m",
    level: "Beginner",
    category: "Photography",
    rating: 4.7,
    price: 0
  },

  // --- MUSIC ---
  {
    title: "Ableton Live 11 Beginner Tutorial",
    instructor: "Taetro",
    thumbnail: "https://i.ytimg.com/vi/vFGEH9f_Mqk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vFGEH9f_Mqk",
    studentsCount: 2000000,
    views: "2M",
    likesCount: "70K",
    duration: "40m",
    level: "Beginner",
    category: "Music",
    rating: 4.8,
    price: 0
  },
  {
    title: "Logic Pro X Crash Course",
    instructor: "Charles Cleyn",
    thumbnail: "https://i.ytimg.com/vi/1_G1RzCjHAE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1_G1RzCjHAE",
    studentsCount: 1500000,
    views: "1.5M",
    likesCount: "50K",
    duration: "1h 00m",
    level: "Intermediate",
    category: "Music",
    rating: 4.9,
    price: 0
  }
];

async function seedCategoryCourses() {
    console.log("Seeding category-specific courses...");
    try {
        let adminUser = await prisma.user.findFirst({
            where: { email: "admin@qurio.com" }
        });
        
        if (!adminUser) {
            adminUser = await prisma.user.findFirst();
        }

        const countBefore = await prisma.course.count();

        for (const courseData of extraCategoryCourses) {
            const existingCourse = await prisma.course.findFirst({
                where: { title: courseData.title }
            });

            if (!existingCourse) {
                const { instructor, ...restCourseData } = courseData;
                await prisma.course.create({
                    data: {
                        ...restCourseData,
                        description: `Comprehensive guide to ${courseData.title} tailored completely for ${courseData.level}s. Learn directly from top creator ${instructor}.`,
                        instructorName: instructor,
                        instructorId: adminUser.id,
                    }
                });
                console.log(`+ Added [${courseData.category}]: ${courseData.title}`);
            } else {
                console.log(`= Skipped (exists): ${courseData.title}`);
            }
        }

        const countAfter = await prisma.course.count();
        console.log(`\n✅ Added ${countAfter - countBefore} precise category courses.`);
        console.log(`🎉 Total database size: ${countAfter} active courses!`);

    } catch (error) {
        console.error("Error seeding precise category courses:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedCategoryCourses();
