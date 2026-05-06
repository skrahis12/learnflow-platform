import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import api from "../services/api";

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

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");

  // Interaction States
  const [likedCourseIds, setLikedCourseIds] = useState(new Set());
  const [followingInstructorIds, setFollowingInstructorIds] = useState(new Set());

  // Fetch user interactions on mount
  useEffect(() => {
    const fetchInteractions = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/interactions/my-interactions");
        const data = response.data || {};
        setLikedCourseIds(new Set(data.likedCourseIds || []));
        setFollowingInstructorIds(new Set(data.followingInstructorIds || []));
      } catch (error) {
        console.error("Failed to fetch interactions:", error);
      }
    };
    fetchInteractions();
  }, []);

  // Initial load from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const decodedCategory = decodeURIComponent(category).toLowerCase();

      // Mapping from Home page categories
      const categoryMappings = {
        "development": "Web Development",
        "design": "Graphic Design",
        "business": "Business Strategy",
        "marketing": "Digital Marketing",
      };

      const mappedCategory = categoryMappings[decodedCategory];

      if (mappedCategory) {
        setSelectedCategory(mappedCategory);
      } else {
        // Find exact match or fallback to title case
        const exactMatch = categories.find(c => c.toLowerCase() === decodedCategory);
        if (exactMatch) {
          setSelectedCategory(exactMatch);
        } else {
          const formatted = category.charAt(0).toUpperCase() + category.slice(1);
          setSelectedCategory(formatted);
        }
      }
    }
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Fetch courses when filters change
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          search: searchQuery,
          category: selectedCategory === "All" ? undefined : selectedCategory,
          level: selectedLevel === "All Levels" ? undefined : selectedLevel,
          sortBy
        };

        const response = await api.get("/courses", { params });
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly to avoid too many requests while typing
    const timeoutId = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

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
                  <SelectItem value="newest">Newest</SelectItem>
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

          {/* Results Analysis */}
          {!loading && !error && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {courses.length} courses
            </p>
          )}

          {/* Content Check */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <div key={course.id} className="animate-fade-up h-full" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CourseCard
                    {...course}
                    initialLiked={likedCourseIds.has(course.id)}
                    initialSubscribed={course.instructorId && followingInstructorIds.has(course.instructorId)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No courses found matching your criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Courses;
