import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";
import { ArrowRight, Loader2 } from "lucide-react";
import api from "@/services/api";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses?sortBy=popular&limit=4");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch featured courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (<section className="py-20 lg:py-28 bg-background">
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
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (<div key={course.id} className="animate-fade-up h-full" style={{ animationDelay: `${index * 0.1}s` }}>
            <CourseCard {...course} />
          </div>))}
        </div>
      )}
    </div>
  </section>);
};
export default FeaturedCourses;
