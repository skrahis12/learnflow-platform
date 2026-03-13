import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Star, Clock, Users, PlayCircle, FileText, Award, Globe, BarChart3, Heart, Share2, CheckCircle, Lock, Calendar, Loader2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import api from "@/services/api";

// Course extra details mapping (Note: IDs might not match DB UUIDs anymore, need migration strategy later)
const courseExtraDetails = {
  // ... existing manual map kept for reference or future mapping
  "1": { subtitle: "Master the fundamentals..." }
};

const CourseDetail = () => {
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showPreview, setShowPreview] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch course details
      const fetchCourseDetails = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/courses/${id}`);
          setCourse(response.data.course);
        } catch (err) {
          console.error("Failed to load course details:", err);
          setError("Failed to load course details");
        } finally {
          setLoading(false);
        }
      };
      fetchCourseDetails();
    }
  }, [id]);

  // Track active lesson
  const [activeLesson, setActiveLesson] = useState(null);

  // Initialize active lesson from history if available, or default to first
  useEffect(() => {
    if (course) {
      const history = JSON.parse(localStorage.getItem("user_learning_history") || "[]");
      const historyItem = history.find(item => item.id === course.id);

      if (historyItem && historyItem.lastLesson) {
        setActiveLesson(historyItem.lastLesson);
      }
    }
  }, [course]);

  // Track completed lessons
  const [completedLessons, setCompletedLessons] = useState([]);

  // Initialize completed lessons from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
    setCompletedLessons(saved);
  }, []);

  const toggleLessonCompletion = (moduleId, lessonId, e) => {
    e.stopPropagation(); // Prevent opening the lesson when clicking checkbox
    const lessonKey = `${course.id}-${moduleId}-${lessonId}`;
    let newCompleted;

    if (completedLessons.includes(lessonKey)) {
      newCompleted = completedLessons.filter(id => id !== lessonKey);
    } else {
      newCompleted = [...completedLessons, lessonKey];
    }

    setCompletedLessons(newCompleted);
    localStorage.setItem("completed_lessons", JSON.stringify(newCompleted));
  };

  // Save to History when course OR active lesson changes
  useEffect(() => {
    if (course) {
      try {
        const historyItem = {
          id: course.id,
          title: course.title,
          thumbnail: course.thumbnail,
          instructor: course.instructorName || "Instructor",
          lastAccessed: Date.now(),
          progress: 0, // Default to 0 if not tracking specific progress yet
          totalLessons: course.lessonsCount || 0,
          lastLesson: {
            ...activeLesson,
            videoUrl: activeLesson.videoUrl || course.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"
          } // Save the active lesson info with guaranteed videoUrl
        };

        const history = JSON.parse(localStorage.getItem("user_learning_history") || "[]");

        // Remove existing entry for this course if it exists (to move it to top)
        const newHistory = history.filter(item => item.id !== course.id);

        // Add to beginning
        newHistory.unshift(historyItem);

        // Keep only last 5
        if (newHistory.length > 5) newHistory.pop();

        localStorage.setItem("user_learning_history", JSON.stringify(newHistory));
      } catch (error) {
        console.error("Failed to save history", error);
      }
    }
  }, [course, activeLesson]);

  // Effect to update current video when active lesson changes or initializes
  useEffect(() => {
    if (activeLesson && activeLesson.videoUrl) {
      setCurrentVideoUrl(activeLesson.videoUrl);
      setShowPreview(true); // Auto-show video player
    } else if (course && course.videoUrl && !currentVideoUrl) {
      // Default to course preview if nothing active
      setCurrentVideoUrl(course.videoUrl);
    }
  }, [activeLesson, course]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <p className="text-muted-foreground">The course you are looking for does not exist.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  // Construct view data merging DB data with fallbacks
  const courseData = {
    ...course,
    // Map DB fields to UI expected fields if necessary
    instructor: {
      name: course.instructorName || "Instructor",
      avatar: "https://github.com/shadcn.png",
      title: "Instructor",
      students: course.studentsCount ? course.studentsCount.toLocaleString() : "10k+",
      courses: 10,
      rating: 4.8,
      // If we had subscriber count in DB, use it here
    },
    subtitle: course.description ? course.description.substring(0, 100) + "..." : "A comprehensive course to master this subject.",
    whatYouLearn: ["Key concepts and fundamentals", "Advanced techniques", "Practical coding skills", "Industry best practices"],
    requirements: ["No prior knowledge required", "Willingness to learn"],
    modules: [
      {
        title: "Course Overview",
        lessons: [
          {
            title: "Introduction",
            duration: "10:00",
            preview: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Rick Roll for demo, or better a real tutorial
          },
          {
            title: "Getting Started",
            duration: "15:00",
            preview: true, // Changed to true for demo
            videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk" // React Tutorial
          },
        ]
      },
      {
        title: "Fundamentals",
        lessons: [
          {
            title: "Core Concepts",
            duration: "20:00",
            preview: true,
            videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" // React Components
          }
        ]
      }
    ],
    ratingsCount: course.studentsCount ? Math.floor(course.studentsCount / 10) : 120, // Mock
    publishDate: "2024",
    language: "English",
    lastUpdated: "January 2025"
  };



  const isWishlisted = isInWishlist(courseData.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(courseData.id);
    } else {
      addToWishlist(courseData);
    }
  };

  const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  return (<div className="w-full">
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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {courseData.title}
            </h1>
            <p className="text-lg text-white/80 mb-6">
              {courseData.subtitle}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-warning fill-warning" />
                <span className="font-semibold text-white">
                  {courseData.rating}
                </span>
                <span className="text-white/60">
                  ({courseData.ratingsCount.toLocaleString()} ratings)
                </span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <Users className="w-4 h-4" />
                {courseData.studentsCount.toLocaleString()} students
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-12 h-12 rounded-full border-2 border-accent/30" />
              <div>
                <p className="text-white font-medium">
                  Created by{" "}
                  <span className="text-accent">{courseData.instructor.name}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
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
                    src={`${currentVideoUrl || courseData.videoUrl}${currentVideoUrl?.includes('?') ? '&' : '?'}autoplay=1&rel=0&modestbranding=1`}
                    title={courseData.title}
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
                        onClick={() => {
                          setShowPreview(true);
                          // Set first lesson/intro as active if nothing else selected
                          if (!activeLesson && courseData.modules[0]?.lessons[0]) {
                            setActiveLesson({
                              title: courseData.modules[0].lessons[0].title,
                              duration: courseData.modules[0].lessons[0].duration,
                              moduleId: 0,
                              lessonId: 0,
                              videoUrl: courseData.modules[0].lessons[0].videoUrl // Pass video URL
                            });
                          }
                        }}
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
                  <span className="text-3xl font-bold text-success">
                    Free
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <Button variant="accent" size="lg" className="w-full">
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
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
    < section className="py-12" >
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
                    {module.lessons.map((lesson, lessonIndex) => (<div key={lessonIndex}
                      onClick={() => {
                        if (lesson.preview || true) { // Allow clicking all for tracking demo, usually check permissions
                          setActiveLesson({
                            title: lesson.title,
                            duration: lesson.duration,
                            moduleId: moduleIndex,
                            lessonId: lessonIndex,
                            videoUrl: lesson.videoUrl // Pass the video URL!
                          });
                        }
                      }}
                      className={`flex items-center justify-between px-6 py-3 border-t border-border hover:bg-muted/30 transition-colors cursor-pointer ${activeLesson?.title === lesson.title ? "bg-accent/10 border-l-4 border-l-accent" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div
                          onClick={(e) => toggleLessonCompletion(moduleIndex, lessonIndex, e)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${completedLessons.includes(`${course.id}-${moduleIndex}-${lessonIndex}`)
                              ? "bg-success border-success text-white"
                              : "border-muted-foreground hover:border-accent"
                            }`}
                        >
                          {completedLessons.includes(`${course.id}-${moduleIndex}-${lessonIndex}`) && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                        {lesson.preview ? (<PlayCircle className="w-4 h-4 text-accent" />) : (<Lock className="w-4 h-4 text-muted-foreground" />)}
                        <span className={`text-foreground ${completedLessons.includes(`${course.id}-${moduleIndex}-${lessonIndex}`) ? "line-through opacity-70" : ""}`}>
                          {lesson.title}
                        </span>
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
    </section >
  </div >);
};
export default CourseDetail;
