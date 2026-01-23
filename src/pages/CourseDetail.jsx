import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Star, Clock, Users, PlayCircle, FileText, Award, Globe, BarChart3, Heart, Share2, CheckCircle, Lock, Calendar } from "lucide-react";
// Mock course data
const courseData = {
  id: "1",
  title: "Complete HTML Development Course",
  subtitle: "Master the fundamentals of web development with HTML5 - the building block of the web.",
  instructor: {
    name: "freeCodeCamp.org",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nO387zS9v5Hj69I8S8D0n9O8S8D0n9O8S8D0n9=s176-c-k-c0x00ffffff-no-rj",
    title: "World-class Coding Community",
    students: "9.4M+",
    courses: 1500,
    rating: 4.9,
    channelName: "freeCodeCamp.org",
    subs: "9.4M",
  },
  thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200",
  videoUrl: "https://www.youtube.com/embed/HcOc7P5BMi4",
  rating: 4.9,
  ratingsCount: 8542,
  studentsCount: 12500,
  views: "7.5M+",
  publishDate: "Sep 18, 2018",
  price: 0,
  originalPrice: 0,
  duration: "2h 2m",
  level: "Beginner",
  category: "Development",
  language: "English",
  lastUpdated: "January 2024",
  description: `This comprehensive HTML course is your complete guide to the building blocks of the web. Whether you're a complete beginner or looking to refresh your knowledge, this course covers everything from basic tags to semantic HTML5.

You'll learn the latest standards and best practices used by professional web developers worldwide. By the end of this course, you'll be able to structure complex web pages and be ready to move on to CSS and JavaScript.`,
  whatYouLearn: [
    "Master all essential HTML5 elements and attributes",
    "Understand the DOM and how browsers render HTML",
    "Implement Semantic HTML for better SEO and Accessibility",
    "Work with forms, tables, and media elements",
    "Structure professional web pages from scratch",
    "Best practices for cleaner, maintainable code",
  ],
  requirements: [
    "No prior knowledge required - Perfect for beginners",
    "A text editor (VS Code recommended)",
    "A web browser (Chrome, Firefox, or Edge)",
  ],
  modules: [
    {
      title: "Introduction to HTML",
      lessons: [
        { title: "HTML Course Intro", duration: "05:12", preview: true },
        { title: "What is HTML?", duration: "08:45", preview: true },
        { title: "Setting up the Environment", duration: "12:20", preview: true },
      ],
    },
    {
      title: "Core HTML Elements",
      lessons: [
        { title: "Basic Tags and Headings", duration: "15:30", preview: false },
        { title: "Paragraphs and Formatting", duration: "18:45", preview: false },
        { title: "Lists and Links", duration: "14:20", preview: false },
        { title: "Images and Attributes", duration: "20:15", preview: false },
      ],
    },
    {
      title: "Advanced HTML5",
      lessons: [
        { title: "Semantic HTML Elements", duration: "22:30", preview: false },
        { title: "HTML Forms and Input", duration: "28:45", preview: false },
        { title: "Tables and Data", duration: "15:20", preview: false },
        { title: "Video and Audio Elements", duration: "12:15", preview: false },
      ],
    },
  ],
};
const CourseDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  return (<div className="min-h-screen bg-background">
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
              <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-12 h-12 rounded-full border-2 border-accent/30" />
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
                  {courseData.views && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {courseData.views} Views
                    </span>
                  )}
                  {courseData.publishDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Published {courseData.publishDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border sticky top-24">
              <div className="aspect-video relative">
                {showPreview ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${courseData.videoUrl}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                ) : (
                  <>
                    <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                      <button
                        onClick={() => setShowPreview(true)}
                        className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
                      >
                        <PlayCircle className="w-8 h-8 text-accent-foreground" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    Free
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <Button variant="accent" size="lg" className="w-full">
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => setIsWishlisted(!isWishlisted)}>
                    <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
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
                {courseData.whatYouLearn.map((item, index) => (<div key={index} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>))}
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
                {courseData.modules.map((module, moduleIndex) => (<AccordionItem key={moduleIndex} value={`module-${moduleIndex}`} className="bg-card border border-border rounded-xl overflow-hidden">
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
                    {module.lessons.map((lesson, lessonIndex) => (<div key={lessonIndex} className="flex items-center justify-between px-6 py-3 border-t border-border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        {lesson.preview ? (<PlayCircle className="w-4 h-4 text-accent" />) : (<Lock className="w-4 h-4 text-muted-foreground" />)}
                        <span className="text-foreground">{lesson.title}</span>
                        {lesson.preview && (<Badge variant="secondary" className="text-xs">
                          Preview
                        </Badge>)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {lesson.duration}
                      </span>
                    </div>))}
                  </AccordionContent>
                </AccordionItem>))}
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
                {courseData.requirements.map((req, index) => (<li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  {req}
                </li>))}
              </ul>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Instructor
              </h2>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-20 h-20 rounded-full border-2 border-accent/30" />
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
                        {courseData.instructor.students} Students
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <PlayCircle className="w-4 h-4" />
                        {courseData.instructor.courses} Courses
                      </div>
                      {courseData.instructor.subs && (
                        <div className="flex items-center gap-1 text-accent font-medium">
                          <Users className="w-4 h-4" />
                          {courseData.instructor.subs} Subscribers
                        </div>
                      )}
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
  </div>);
};
export default CourseDetail;
