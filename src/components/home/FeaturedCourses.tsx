import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";
import { ArrowRight } from "lucide-react";

const featuredCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    rating: 4.9,
    studentsCount: 12500,
    price: 89.99,
    originalPrice: 199.99,
    duration: "42 hours",
    level: "Beginner" as const,
    category: "Development",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    rating: 4.8,
    studentsCount: 8300,
    price: 79.99,
    originalPrice: 149.99,
    duration: "28 hours",
    level: "Intermediate" as const,
    category: "Design",
  },
  {
    id: "3",
    title: "Machine Learning A-Z",
    instructor: "Dr. Emily Watson",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    rating: 4.9,
    studentsCount: 15200,
    price: 99.99,
    originalPrice: 249.99,
    duration: "56 hours",
    level: "Advanced" as const,
    category: "Data Science",
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    rating: 4.7,
    studentsCount: 6800,
    price: 69.99,
    originalPrice: 129.99,
    duration: "18 hours",
    level: "Beginner" as const,
    category: "Marketing",
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Featured Courses
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Hand-picked courses from our top instructors, designed to help you succeed in today's competitive world.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="gap-2">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
