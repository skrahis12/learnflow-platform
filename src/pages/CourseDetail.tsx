import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  Users,
  PlayCircle,
  FileText,
  Award,
  Globe,
  BarChart3,
  Heart,
  Share2,
  CheckCircle,
  Lock,
} from "lucide-react";

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  subtitle: "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and more!",
  instructor: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    title: "Senior Full-Stack Developer",
    students: 45000,
    courses: 12,
    rating: 4.9,
  },
  thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  rating: 4.9,
  ratingsCount: 8542,
  studentsCount: 12500,
  price: 89.99,
  originalPrice: 199.99,
  duration: "42 hours",
  level: "Beginner",
  category: "Development",
  language: "English",
  lastUpdated: "January 2024",
  description: `This comprehensive course is your complete guide to becoming a professional web developer. Whether you're a complete beginner or looking to update your skills, this course covers everything you need to know.

You'll learn the latest technologies and best practices used by top companies. From HTML and CSS basics to advanced React concepts, from backend development with Node.js to database management with MongoDB - this course has it all.`,
  whatYouLearn: [
    "Build 16 web development projects for your portfolio",
    "Learn the latest technologies including React, Node.js, and MongoDB",
    "Master HTML5, CSS3, and modern JavaScript (ES6+)",
    "Build fully-fledged websites and web apps for startups",
    "Understand complex topics like authentication and web security",
    "Deploy your applications to the cloud",
  ],
  requirements: [
    "No programming experience needed - I'll teach you everything",
    "A computer with access to the internet",
    "Desire to learn and build amazing projects",
  ],
  modules: [
    {
      title: "Getting Started with Web Development",
      lessons: [
        { title: "Course Introduction", duration: "5:30", preview: true },
        { title: "How the Web Works", duration: "12:45", preview: true },
        { title: "Setting Up Your Development Environment", duration: "18:20", preview: false },
        { title: "Your First Web Page", duration: "22:15", preview: false },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Document Structure", duration: "15:30", preview: false },
        { title: "Working with Text Elements", duration: "18:45", preview: false },
        { title: "Links and Navigation", duration: "14:20", preview: false },
        { title: "Images and Media", duration: "20:15", preview: false },
        { title: "Forms and Input", duration: "25:30", preview: false },
      ],
    },
    {
      title: "CSS Styling",
      lessons: [
        { title: "CSS Basics and Selectors", duration: "22:30", preview: false },
        { title: "Box Model and Layout", duration: "28:45", preview: false },
        { title: "Flexbox Deep Dive", duration: "35:20", preview: false },
        { title: "CSS Grid Mastery", duration: "32:15", preview: false },
        { title: "Responsive Design", duration: "40:30", preview: false },
      ],
    },
    {
      title: "JavaScript Essentials",
      lessons: [
        { title: "JavaScript Basics", duration: "25:30", preview: false },
        { title: "DOM Manipulation", duration: "32:45", preview: false },
        { title: "Events and Interactivity", duration: "28:20", preview: false },
        { title: "Async JavaScript", duration: "45:15", preview: false },
      ],
    },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const totalLessons = courseData.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-dark pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,127,80,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                {courseData.category}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {courseData.title}
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-6">
                {courseData.subtitle}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="font-semibold text-primary-foreground">
                    {courseData.rating}
                  </span>
                  <span className="text-primary-foreground/60">
                    ({courseData.ratingsCount.toLocaleString()} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primary-foreground/80">
                  <Users className="w-4 h-4" />
                  {courseData.studentsCount.toLocaleString()} students
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <img
                  src={courseData.instructor.avatar}
                  alt={courseData.instructor.name}
                  className="w-12 h-12 rounded-full border-2 border-accent/30"
                />
                <div>
                  <p className="text-primary-foreground font-medium">
                    Created by{" "}
                    <span className="text-accent">{courseData.instructor.name}</span>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {courseData.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {courseData.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      {courseData.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border sticky top-24">
                <div className="aspect-video relative">
                  <img
                    src={courseData.thumbnail}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-accent-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      ${courseData.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ${courseData.originalPrice}
                    </span>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {Math.round(
                        ((courseData.originalPrice - courseData.price) /
                          courseData.originalPrice) *
                          100
                      )}
                      % off
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button variant="accent" size="lg" className="w-full">
                      Enroll Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`w-5 h-5 mr-2 ${
                          isWishlisted ? "fill-destructive text-destructive" : ""
                        }`}
                      />
                      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mb-6">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <PlayCircle className="w-4 h-4 text-muted-foreground" />
                      {courseData.duration} on-demand video
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {totalLessons} lessons
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      Certificate of completion
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      Full lifetime access
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* What You'll Learn */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  What you'll learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courseData.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Course content
                </h2>
                <div className="text-sm text-muted-foreground mb-4">
                  {courseData.modules.length} sections • {totalLessons} lectures •{" "}
                  {courseData.duration} total length
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {courseData.modules.map((module, moduleIndex) => (
                    <AccordionItem
                      key={moduleIndex}
                      value={`module-${moduleIndex}`}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50">
                        <div className="flex items-center gap-4 text-left">
                          <span className="font-semibold text-foreground">
                            {module.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {module.lessons.length} lectures
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between px-6 py-3 border-t border-border hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.preview ? (
                                <PlayCircle className="w-4 h-4 text-accent" />
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="text-foreground">{lesson.title}</span>
                              {lesson.preview && (
                                <Badge variant="secondary" className="text-xs">
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Description
                </h2>
                <div className="prose prose-neutral max-w-none">
                  <p className="text-foreground whitespace-pre-line">
                    {courseData.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {courseData.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Instructor
                </h2>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <img
                      src={courseData.instructor.avatar}
                      alt={courseData.instructor.name}
                      className="w-20 h-20 rounded-full border-2 border-accent/30"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {courseData.instructor.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {courseData.instructor.title}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="text-foreground">
                            {courseData.instructor.rating} Instructor Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {courseData.instructor.students.toLocaleString()} Students
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <PlayCircle className="w-4 h-4" />
                          {courseData.instructor.courses} Courses
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
