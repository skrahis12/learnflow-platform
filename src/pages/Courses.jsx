import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
const allCourses = [
  {
    id: "1",
    title: "Complete HTML Development Course",
    instructor: "freeCodeCamp.org",
    channelName: "freeCodeCamp.org",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600",
    videoUrl: "https://www.youtube.com/embed/HcOc7P5BMi4",
    rating: 4.9,
    studentsCount: 12500,
    views: "7.5M+",
    subs: "9.4M",
    price: 0,
    originalPrice: 0,
    duration: "2h 2m",
    level: "Beginner",
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
    level: "Intermediate",
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
    level: "Advanced",
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
    level: "Beginner",
    category: "Marketing",
  },
  {
    id: "5",
    title: "React Native Mobile Development",
    instructor: "Alex Thompson",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
    rating: 4.8,
    studentsCount: 9400,
    price: 94.99,
    originalPrice: 189.99,
    duration: "38 hours",
    level: "Intermediate",
    category: "Development",
  },
  {
    id: "6",
    title: "Photography Fundamentals",
    instructor: "Lisa Anderson",
    thumbnail: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    rating: 4.6,
    studentsCount: 5200,
    price: 59.99,
    originalPrice: 99.99,
    duration: "15 hours",
    level: "Beginner",
    category: "Photography",
  },
  {
    id: "7",
    title: "Python for Data Analysis",
    instructor: "Dr. Robert Kim",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    rating: 4.9,
    studentsCount: 11200,
    price: 84.99,
    originalPrice: 169.99,
    duration: "32 hours",
    level: "Intermediate",
    category: "Data Science",
  },
  {
    id: "8",
    title: "Business Leadership Essentials",
    instructor: "Jennifer Moore",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    rating: 4.7,
    studentsCount: 4800,
    price: 74.99,
    originalPrice: 149.99,
    duration: "22 hours",
    level: "Advanced",
    category: "Business",
  },
];
const categories = ["All", "Development", "Design", "Data Science", "Marketing", "Photography", "Business"];
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
      const formatted = category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategory(formatted);
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
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
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
  return (<div className="min-h-screen bg-background">
    <Navbar />

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
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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
          {sortedCourses.map((course, index) => (<div key={course.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
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

    <Footer />
  </div>);
};
export default Courses;
