import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
const categories = [
  "All",
  "Web Development",
  "Graphic Design",
  "Business Strategy",
  "Digital Marketing",
  "Mobile Apps",
  "Data Science",
  "Cybersecurity",
  "Artificial Intelligence",
  "Cloud Computing"
];

const parseMetric = (value) => {
  if (!value) return 0;
  const str = value.toString().toUpperCase().replace(/,/g, "").replace(/\+/g, "");
  if (str.includes("M")) return parseFloat(str) * 1000000;
  if (str.includes("K")) return parseFloat(str) * 1000;
  return parseFloat(str);
};

const calculateRating = (viewsStr, likesStr) => {
  const views = parseMetric(viewsStr);
  const likes = parseMetric(likesStr);

  if (!views || !likes) return "4.5"; // Default if no data

  const ratio = (likes / views) * 100;

  // Base rating 4.0
  // Add up to 1.0 based on like/view ratio (assuming 4% is excellent)
  let rating = 4.0 + Math.min((ratio / 4), 1.0);

  return rating.toFixed(1);
};


export const allCourses = [
  // --- WEB DEVELOPMENT ---
  {
    id: "web-1",
    title: "HTML & CSS Full Course - Beginner to Pro",
    instructor: "SuperSimpleDev",
    thumbnail: "https://i.ytimg.com/vi/G3e-cpL7ofc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "45K",
    duration: "6h 30m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.9"
  },
  {
    id: "web-2",
    title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
    studentsCount: 3200000,
    views: "3.2M",
    likes: "120K",
    duration: "1h 00m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.8"
  },
  {
    id: "web-3",
    title: "React JS - React Tutorial for Beginners",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
    studentsCount: 2100000,
    views: "2.1M",
    likes: "85K",
    duration: "2h 25m",
    level: "Intermediate",
    category: "Web Development",
    rating: "4.7"
  },
  {
    id: "web-4",
    title: "Node.js and Express.js - Full Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
    studentsCount: 950000,
    views: "950K",
    likes: "32K",
    duration: "8h 15m",
    level: "Advanced",
    category: "Web Development",
    rating: "4.8"
  },
  {
    id: "web-5",
    title: "Full Stack Web Development for Beginners",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/Q33KBiDriJY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Q33KBiDriJY",
    studentsCount: 450000,
    views: "450K",
    likes: "15K",
    duration: "10h 30m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.6"
  },

  // --- GRAPHIC DESIGN ---
  {
    id: "design-2",
    title: "Figma UI/UX Design Full Course",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/5c32g4pG1MA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5c32g4pG1MA",
    studentsCount: 2000000,
    views: "2M",
    likes: "60K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Graphic Design",
    rating: "4.9"
  },
  {
    id: "design-3",
    title: "Adobe Photoshop for Beginners | FREE COURSE",
    instructor: "Envato Tuts+",
    thumbnail: "https://i.ytimg.com/vi/IyR_uYsRdPs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    studentsCount: 1200000,
    views: "1.2M",
    likes: "40K",
    duration: "3h 10m",
    level: "Beginner",
    category: "Graphic Design",
    rating: "4.9"
  },
  {
    id: "design-4",
    title: "Graphic Design Full Course - Beginner to Pro",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/s8k-qB6hS4U/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/s8k-qB6hS4U",
    studentsCount: 900000,
    views: "900K",
    likes: "35K",
    duration: "6h 30m",
    level: "All Levels",
    category: "Graphic Design",
    rating: "4.7"
  },

  // --- BUSINESS STRATEGY ---

  {
    id: "biz-3",
    title: "Project Management Full Course",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/5d169lT_4v4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5d169lT_4v4",
    studentsCount: 410000,
    views: "410K",
    likes: "12K",
    duration: "2h 00m",
    level: "Intermediate",
    category: "Business Strategy",
    rating: "4.6"
  },
  {
    id: "biz-4",
    title: "Entrepreneurship 101",
    instructor: "Harvard Innovation Labs",
    thumbnail: "https://i.ytimg.com/vi/lPh5h8I4F3I/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/lPh5h8I4F3I",
    studentsCount: 850000,
    views: "850K",
    likes: "25K",
    duration: "1h 15m",
    level: "Beginner",
    category: "Business Strategy",
    rating: "4.8"
  },


  // --- DIGITAL MARKETING ---
  {
    id: "mark-1",
    title: "Digital Marketing Course for Beginners",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/bixR-KIJKYM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM",
    studentsCount: 500000,
    views: "500K",
    likes: "18K",
    duration: "2h 00m",
    level: "Beginner",
    category: "Digital Marketing",
    rating: "4.6"
  },
  {
    id: "mark-2",
    title: "SEO Tutorial for Beginners",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/DvwXlbfiwVQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/DvwXlbfiwVQ",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "40K",
    duration: "8h 30m",
    level: "Beginner",
    category: "Digital Marketing",
    rating: "4.8"
  },

  {
    id: "mark-4",
    title: "Google Ads Full Course",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/_0tT5_GvbIQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/_0tT5_GvbIQ",
    studentsCount: 600000,
    views: "600K",
    likes: "15K",
    duration: "5h 00m",
    level: "Intermediate",
    category: "Digital Marketing",
    rating: "4.7"
  },


  // --- MOBILE APPS ---
  {
    id: "mob-1",
    title: "React Native Tutorial for Beginners",
    instructor: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/0-S5a0eXPoc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
    studentsCount: 1800000,
    views: "1.8M",
    likes: "60K",
    duration: "2h 05m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: "4.8"
  },
  {
    id: "mob-2",
    title: "Flutter for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/VPvVD8t02U8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/VPvVD8t02U8",
    studentsCount: 2000000,
    views: "2M",
    likes: "50K",
    duration: "37h 00m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: "4.9"
  },
  {
    id: "mob-3",
    title: "Android Development for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/fis26HvvDII/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fis26HvvDII",
    studentsCount: 1100000,
    views: "1.1M",
    likes: "35K",
    duration: "11h 30m",
    level: "Intermediate",
    category: "Mobile Apps",
    rating: "4.8"
  },
  {
    id: "mob-4",
    title: "Swift Programming Tutorial for Beginners",
    instructor: "CodeWithChris",
    thumbnail: "https://i.ytimg.com/vi/F9UC9DY-vIU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/F9UC9DY-vIU",
    studentsCount: 400000,
    views: "400K",
    likes: "12K",
    duration: "3h 15m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: "4.7"
  },


  // --- DATA SCIENCE ---
  {
    id: "data-1",
    title: "Data Science Full Course - Learn Data Science in 10 Hours",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/-ETQ97mXXF0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-ETQ97mXXF0",
    studentsCount: 2500000,
    views: "2.5M",
    likes: "75K",
    duration: "10h 00m",
    level: "Beginner",
    category: "Data Science",
    rating: "4.8"
  },
  {
    id: "data-2",
    title: "Python for Data Science - Course for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/LHBE6Q9XlzI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/LHBE6Q9XlzI",
    studentsCount: 3000000,
    views: "3M",
    likes: "95K",
    duration: "12h 00m",
    level: "Intermediate",
    category: "Data Science",
    rating: "4.9"
  },
  {
    id: "data-3",
    title: "Statistics for Data Science",
    instructor: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/Vfo5le26IhY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Vfo5le26IhY",
    studentsCount: 800000,
    views: "800K",
    likes: "20K",
    duration: "4h 30m",
    level: "Intermediate",
    category: "Data Science",
    rating: "4.7"
  },
  {
    id: "data-4",
    title: "Data Analysis with Python - Full Course for Beginners",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/r-uOLxNrNk8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/r-uOLxNrNk8",
    studentsCount: 3000000,
    views: "3M",
    likes: "85K",
    duration: "4h 30m",
    level: "Intermediate",
    category: "Data Science",
    rating: "4.8"
  },
  {
    id: "data-5",
    title: "Machine Learning with Python",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/ukzFI9rgwfU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
    studentsCount: 650000,
    views: "650K",
    likes: "18K",
    duration: "8h 00m",
    level: "Advanced",
    category: "Data Science",
    rating: "4.7"
  },

  // --- CYBERSECURITY ---
  {
    id: "cyber-1",
    title: "Ethical Hacking Full Course - Learn Ethical Hacking in 12 Hours",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/3Kq1MIfTWCE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE",
    studentsCount: 2000000,
    views: "2M",
    likes: "60K",
    duration: "12h 00m",
    level: "Beginner",
    category: "Cybersecurity",
    rating: "4.8"
  },
  {
    id: "cyber-2",
    title: "Cyber Security Full Course",
    instructor: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/fS6eNf9XvFk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fS6eNf9XvFk",
    studentsCount: 3500000,
    views: "3.5M",
    likes: "125K",
    duration: "11h 30m",
    level: "Beginner",
    category: "Cybersecurity",
    rating: "4.9"
  },
  {
    id: "cyber-3",
    title: "Ethical Hacking Course",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/dz7Ntp7KQGA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dz7Ntp7KQGA",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "40K",
    duration: "4h 00m",
    level: "Intermediate",
    category: "Cybersecurity",
    rating: "4.9"
  },
  {
    id: "cyber-4",
    title: "Network Security Tutorial",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/qiQR5rTSshw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/qiQR5rTSshw",
    studentsCount: 400000,
    views: "400K",
    likes: "12K",
    duration: "5h 30m",
    level: "Intermediate",
    category: "Cybersecurity",
    rating: "4.7"
  },
  {
    id: "cyber-5",
    title: "Penetration Testing | Ethical Hacking Tutorial",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/fNz8ykqJltc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fNz8ykqJltc",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "45K",
    duration: "1h 30m",
    level: "Advanced",
    category: "Cybersecurity",
    rating: "4.8"
  },

  // --- ARTIFICIAL INTELLIGENCE ---
  {
    id: "ai-1",
    title: "Artificial Intelligence Full Course | AI Tutorial for Beginners",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/JMUxmLyrhSk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
    studentsCount: 1200000,
    views: "1.2M",
    likes: "40K",
    duration: "4h 30m",
    level: "Beginner",
    category: "Artificial Intelligence",
    rating: "4.8"
  },
  {
    id: "ai-2",
    title: "Machine Learning Full Course",
    instructor: "Edureka",
    thumbnail: "https://i.ytimg.com/vi/GwIoJAO7M6k/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/GwIoJAO7M6k",
    studentsCount: 1200000,
    views: "1.2M",
    likes: "35K",
    duration: "10h 00m",
    level: "Intermediate",
    category: "Artificial Intelligence",
    rating: "4.8"
  },
  {
    id: "ai-3",
    title: "Deep Learning Crash Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/VyWAvY2CF9c/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/VyWAvY2CF9c",
    studentsCount: 500000,
    views: "500K",
    likes: "15K",
    duration: "3h 45m",
    level: "Advanced",
    category: "Artificial Intelligence",
    rating: "4.9"
  },
  {
    id: "ai-4",
    title: "Neural Networks from Scratch",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/Wo5dMEP_BbI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Wo5dMEP_BbI",
    studentsCount: 4000000,
    views: "4M",
    likes: "150K",
    duration: "4h 00m",
    level: "Advanced",
    category: "Artificial Intelligence",
    rating: "5.0"
  },
  {
    id: "ai-5",
    title: "TensorFlow 2.0 Complete Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/tPYj3fFJGjk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/tPYj3fFJGjk",
    studentsCount: 300000,
    views: "300K",
    likes: "12K",
    duration: "14h 00m",
    level: "Intermediate",
    category: "Artificial Intelligence",
    rating: "4.7"
  },

  // --- CLOUD COMPUTING ---
  {
    id: "cloud-1",
    title: "Cloud Computing Full Course | Cloud Computing Tutorial",
    instructor: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/M988_fsOSWo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/M988_fsOSWo",
    studentsCount: 2000000,
    views: "2M",
    likes: "50K",
    duration: "3h 00m",
    level: "Beginner",
    category: "Cloud Computing",
    rating: "4.8"
  },
  {
    id: "cloud-2",
    title: "AWS Certified Cloud Practitioner - Full Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/3hLmDS179YE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/3hLmDS179YE",
    studentsCount: 2000000,
    views: "2M",
    likes: "60K",
    duration: "13h 00m",
    level: "Beginner",
    category: "Cloud Computing",
    rating: "4.9"
  },
  {
    id: "cloud-3",
    title: "Azure Fundamentals Course",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/NKEFWyqJ5dy/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/NKEFWyqJ5dy",
    studentsCount: 800000,
    views: "800K",
    likes: "25K",
    duration: "8h 30m",
    level: "Intermediate",
    category: "Cloud Computing",
    rating: "4.8"
  },
  {
    id: "cloud-4",
    title: "Google Cloud Digital Leader Certification",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/U9k6k4o1kQo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/U9k6k4o1kQo",
    studentsCount: 600000,
    views: "600K",
    likes: "18K",
    duration: "6h 00m",
    level: "Intermediate",
    category: "Cloud Computing",
    rating: "4.7"
  },
  {
    id: "cloud-5",
    title: "Docker & Kubernetes Tutorial",
    instructor: "TechWorld with Nana",
    thumbnail: "https://i.ytimg.com/vi/3c-iBn73dDE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "45K",
    duration: "3h 30m",
    level: "Advanced",
    category: "Cloud Computing",
    rating: "4.9"
  },

  // --- HINDI COURSES & EXTRAS ---

  // WEB DEV (Hindi)
  {
    id: "hindi-web-1",
    title: "Web Development Full Course In Hindi",
    instructor: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/l1EssrLxt7E/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/l1EssrLxt7E",
    studentsCount: 5000000,
    views: "5M",
    likes: "200K",
    duration: "21h 00m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.9"
  },
  {
    id: "hindi-web-2",
    title: "React JS Tutorial in Hindi",
    instructor: "Thapa Technical",
    thumbnail: "https://i.ytimg.com/vi/tiLWCNFzThE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/tiLWCNFzThE",
    studentsCount: 1200000,
    views: "1.2M",
    likes: "60K",
    duration: "2h 15m",
    level: "Intermediate",
    category: "Web Development",
    rating: "4.8"
  },
  {
    id: "hindi-web-3",
    title: "JavaScript Projects For Beginners (Hindi)",
    instructor: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/KGkiIBTq0y0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/KGkiIBTq0y0",
    studentsCount: 950000,
    views: "950K",
    likes: "32K",
    duration: "2h 30m",
    level: "Intermediate",
    category: "Web Development",
    rating: "4.8"
  },

  // DATA SCIENCE (Hindi)
  {
    id: "hindi-data-1",
    title: "Data Science Roadmap 2025 (Hindi)",
    instructor: "Krish Naik",
    thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
    studentsCount: 900000,
    views: "900K",
    likes: "45K",
    duration: "20m",
    level: "All Levels",
    category: "Data Science",
    rating: "4.9"
  },
  {
    id: "hindi-data-2",
    title: "Python Tutorial For Beginners (Hindi)",
    instructor: "CodeWithHarry",
    thumbnail: "https://i.ytimg.com/vi/vLqTf2b6GZw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vLqTf2b6GZw",
    studentsCount: 800000,
    views: "800K",
    likes: "50K",
    duration: "1h 30m",
    level: "Beginner",
    category: "Data Science",
    rating: "4.8"
  },
  {
    id: "hindi-data-3",
    title: "Machine Learning Tutorial in Hindi",
    instructor: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/1vsmaEfbnoE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1vsmaEfbnoE",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "60K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Data Science",
    rating: "4.7"
  },

  // AI & ML (Hindi)
  {
    id: "hindi-ai-1",
    title: "Artificial Intelligence Full Course in Hindi",
    instructor: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/kwibwSgC4eU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/kwibwSgC4eU",
    studentsCount: 800000,
    views: "800K",
    likes: "30K",
    duration: "6h 00m",
    level: "Beginner",
    category: "Artificial Intelligence",
    rating: "4.8"
  },

  // CYBERSECURITY (Hindi)
  {
    id: "hindi-cyber-1",
    title: "Cyber Security Full Course in Hindi",
    instructor: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/XKEEhZw6oHw/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/XKEEhZw6oHw",
    studentsCount: 800000,
    views: "800K",
    likes: "35K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Cybersecurity",
    rating: "4.7"
  },


  // DESIGN (Hindi/Urdu)





  // PROGRAMMING LANGUAGES (Hindi)
  {
    id: "hindi-prog-1",
    title: "C Language Full Course in Hindi",
    instructor: "Apna College",
    thumbnail: "https://i.ytimg.com/vi/irqbmMNs2Bo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/irqbmMNs2Bo",
    studentsCount: 3000000,
    views: "3M",
    likes: "150K",
    duration: "10h 30m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.9"
  },
  {
    id: "hindi-prog-2",
    title: "C++ Full Course In Hindi",
    instructor: "Apna College",
    thumbnail: "https://i.ytimg.com/vi/z9bZufPHZOg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/z9bZufPHZOg",
    studentsCount: 3500000,
    views: "3.5M",
    likes: "150K",
    duration: "10h 00m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.9"
  },
  {
    id: "hindi-prog-3",
    title: "Java Full Course in Hindi",
    instructor: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/UmnCZ7-9yDY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/bm0OyhwFDuY",
    studentsCount: 2500000,
    views: "2.5M",
    likes: "100K",
    duration: "10h 30m",
    level: "Beginner",
    category: "Web Development",
    rating: "4.8"
  },
  {
    id: "hindi-prog-4",
    title: "SQL Full Course in Hindi",
    instructor: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/BPHAr4QGGVE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BPHAr4QGGVE",
    studentsCount: 1200000,
    views: "1.2M",
    likes: "40K",
    duration: "3h 00m",
    level: "Beginner",
    category: "Data Science",
    rating: "4.8"
  },

  // EXTRAS (English)
  {
    id: "extra-1",
    title: "Modern JavaScript From The Beginning",
    instructor: "Traversy Media",
    thumbnail: "https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/hdI2bqOjy3c",
    studentsCount: 2500000,
    views: "2.5M",
    likes: "80K",
    duration: "2h 00m",
    level: "Intermediate",
    category: "Web Development",
    rating: "4.9"
  },
  {
    id: "extra-2",
    title: "Machine Learning for Everybody",
    instructor: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/i_LwzRVP7bg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    studentsCount: 1500000,
    views: "1.5M",
    likes: "60K",
    duration: "4h 00m",
    level: "Beginner",
    category: "Data Science",
    rating: "4.8"
  },

  // MOBILE APPS (Hindi)

  {
    id: "hindi-mob-2",
    title: "Flutter Full Course in Hindi",
    instructor: "CheezyCode",
    thumbnail: "https://i.ytimg.com/vi/C-fKAzdTrLU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/C-fKAzdTrLU",
    studentsCount: 600000,
    views: "600K",
    likes: "25K",
    duration: "5h 00m",
    level: "Beginner",
    category: "Mobile Apps",
    rating: "4.7"
  },

  // CLOUD COMPUTING (Hindi)
  {
    id: "hindi-cloud-1",
    title: "AWS Tutorial For Beginners In Hindi",
    instructor: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/k1RI5locZE4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/k1RI5locZE4",
    studentsCount: 800000,
    views: "800K",
    likes: "35K",
    duration: "3h 00m",
    level: "Beginner",
    category: "Cloud Computing",
    rating: "4.8"
  },


  // MORE BUSINESS (Hindi)
  {
    id: "hindi-biz-3",
    title: "Stock Market For Beginners (Hindi)",
    instructor: "Pushkar Raj Thakur",
    thumbnail: "https://i.ytimg.com/vi/Xn7KWR9EOGQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Xn7KWR9EOGQ",
    studentsCount: 5000000,
    views: "5M",
    likes: "250K",
    duration: "1h 00m",
    level: "Beginner",
    category: "Business Strategy",
    rating: "4.9"
  }
];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const Courses = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      // Find the specific case-sensitive category name that matches the URL param
      const decodedCategory = decodeURIComponent(category).toLowerCase();
      const matchedCategory = categories.find(c => c.toLowerCase() === decodedCategory);

      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      } else {
        // Fallback for simple title case if exact match not found
        const formatted = category.charAt(0).toUpperCase() + category.slice(1);
        setSelectedCategory(formatted);
      }
    }
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.studentsCount - a.studentsCount;
      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All Levels");
  };
  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedLevel !== "All Levels";
  return (
    <div className="w-full">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explore Courses
            </h1>
            <p className="text-muted-foreground">
              Discover courses from expert instructors
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search courses or instructors..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (<SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>))}
                </SelectContent>
              </Select>

              {/* Level Filter */}
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (<SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>

                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (<div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (<Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
              </Badge>)}
              {selectedCategory !== "All" && (<Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
              </Badge>)}
              {selectedLevel !== "All Levels" && (<Badge variant="secondary" className="gap-1">
                {selectedLevel}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLevel("All Levels")} />
              </Badge>)}
              <Button variant="ghost" size="sm" className="text-accent" onClick={clearFilters}>
                Clear all
              </Button>
            </div>)}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {sortedCourses.length} of {allCourses.length} courses
          </p>

          {/* Courses Grid */}
          {sortedCourses.length > 0 ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCourses.map((course, index) => (<div key={course.id} className="animate-fade-up h-full" style={{ animationDelay: `${index * 0.05}s` }}>
              <CourseCard {...course} />
            </div>))}
          </div>) : (<div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No courses found matching your criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>)}
        </div>
      </main>
    </div>
  );
};
export default Courses;
