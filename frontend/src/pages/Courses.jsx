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
  "Photography",
  "Cybersecurity",
  "Music Production",
  "Artificial Intelligence",
  "International Languages",
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

const baseCourses = [
  {
    id: "1",
    title: "Complete HTML Development Course",
    instructor: "freeCodeCamp.org",
    channelName: "freeCodeCamp.org",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600",
    videoUrl: "https://www.youtube.com/embed/HcOc7P5BMi4",
    studentsCount: 12500,
    views: "7.5M+",
    likes: "300K",
    subs: "9.4M",
    price: 0,
    originalPrice: 0,
    duration: "2h 2m",
    level: "Beginner",
    category: "Web Development",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    studentsCount: 8300,
    views: "85K",
    likes: "4.2K",
    price: 79.99,
    originalPrice: 149.99,
    duration: "28 hours",
    level: "Intermediate",
    category: "Graphic Design",
  },
  {
    id: "3",
    title: "Machine Learning Full Course with Projects (2025)",
    instructor: "WsCube Tech",
    channelName: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/k_x4r-7a8X8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/k_x4r-7a8X8",
    studentsCount: 182000,
    views: "182K+",
    likes: "8.5K",
    subs: "4M+",
    price: 0,
    originalPrice: 0,
    duration: "7h 44m",
    level: "Advanced",
    category: "Data Science",
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    studentsCount: 6800,
    views: "45K",
    likes: "1.8K",
    price: 69.99,
    originalPrice: 129.99,
    duration: "18 hours",
    level: "Beginner",
    category: "Digital Marketing",
  },
  {
    id: "5",
    title: "React Native Mobile Development",
    instructor: "Alex Thompson",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
    studentsCount: 9400,
    views: "120K",
    likes: "5.5K",
    price: 94.99,
    originalPrice: 189.99,
    duration: "38 hours",
    level: "Intermediate",
    category: "Mobile Apps",
  },
  {
    id: "6",
    title: "Photography Fundamentals",
    instructor: "Lisa Anderson",
    thumbnail: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    studentsCount: 5200,
    views: "30K",
    likes: "1.2K",
    price: 59.99,
    originalPrice: 99.99,
    duration: "15 hours",
    level: "Beginner",
    category: "Photography",
  },
  {
    id: "7",
    title: "Data Science FULL Course for Beginners",
    instructor: "WsCube Tech",
    channelName: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/gDZ6czwuQ18/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/gDZ6czwuQ18",
    studentsCount: 250000,
    views: "250K+",
    likes: "12K",
    subs: "4M+",
    price: 0,
    originalPrice: 0,
    duration: "27h 00m",
    level: "Beginner",
    category: "Data Science",
  },
  {
    id: "8",
    title: "Business Leadership Essentials",
    instructor: "Jennifer Moore",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    studentsCount: 4800,
    views: "25K",
    likes: "950",
    price: 74.99,
    originalPrice: 149.99,
    duration: "22 hours",
    level: "Advanced",
    category: "Business Strategy",
  },
  {
    id: "9",
    title: "Learn 90% of PYTHON in Just 12 Hours",
    instructor: "WsCube Tech",
    channelName: "WsCube Tech",
    thumbnail: "https://i.ytimg.com/vi/e_tqS8yX3h0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/e_tqS8yX3h0",
    studentsCount: 100000,
    views: "100K+",
    likes: "4.8K",
    subs: "4M+",
    price: 0,
    originalPrice: 0,
    duration: "12h 00m",
    level: "Beginner",
    category: "Web Development",
  },
  {
    id: "10",
    title: "Ethical Hacking for Beginners",
    instructor: "Cyber Security Hub",
    thumbnail: "https://images.unsplash.com/photo-1563206767-5b1d972d9323?w=600",
    studentsCount: 15400,
    views: "200K",
    likes: "8.2K",
    duration: "10 hours",
    level: "Beginner",
    category: "Cybersecurity",
  },
  {
    id: "11",
    title: "Music Production Masterclass",
    instructor: "Audio Academy",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
    studentsCount: 8900,
    views: "60K",
    likes: "3.5K",
    duration: "24 hours",
    level: "Advanced",
    category: "Music Production",
  },
  {
    id: "12",
    title: "AI & Machine Learning A-Z",
    instructor: "Tech Explorers",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600",
    studentsCount: 22000,
    views: "150K",
    likes: "7.8K",
    duration: "42 hours",
    level: "All Levels",
    category: "Artificial Intelligence",
  },
  {
    id: "13",
    title: "Learn Spanish: Consversational Skills",
    instructor: "Language Pro",
    thumbnail: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600",
    studentsCount: 12000,
    views: "90K",
    likes: "4.1K",
    duration: "30 hours",
    level: "Beginner",
    category: "International Languages",
  },
  {
    id: "14",
    title: "AWS Certified Solutions Architect",
    instructor: "Cloud Gurus",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    studentsCount: 35000,
    views: "210K",
    likes: "10.5K",
    duration: "50 hours",
    level: "Advanced",
    category: "Cloud Computing",
  }
];

// Generate 10 additional mock courses for EACH category
const generatedCourses = categories.filter(c => c !== "All").flatMap((category) => {
  return Array.from({ length: 10 }).map((_, i) => {
    // Generate realistic views/likes
    const viewsNum = Math.floor(Math.random() * 500000) + 1000;
    const likesNum = Math.floor(viewsNum * (Math.random() * 0.08 + 0.01)); // 1% to 9% like ratio

    return {
      id: `gen-${category.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      title: `${category} Masterclass ${i + 1}`,
      instructor: `${category} Expert ${i + 1}`,
      thumbnail: `https://images.unsplash.com/photo-${[
        "1498050108023-c5249f4df085", "1504639725590-34d0984388bd", "1515879218367-8466d910aaa4",
        "1531482615713-2afd69097998", "1550751827-4bd374c3f58b", "1526374965328-7f61d4dc18c5"
      ][i % 6]}?w=600&h=400&fit=crop`,
      videoUrl: "",
      studentsCount: Math.floor(Math.random() * 20000) + 500,
      views: viewsNum > 1000 ? (viewsNum / 1000).toFixed(1) + "K" : viewsNum.toString(),
      likes: likesNum > 1000 ? (likesNum / 1000).toFixed(1) + "K" : likesNum.toString(),
      duration: `${Math.floor(Math.random() * 20) + 2}h ${Math.floor(Math.random() * 60)}m`,
      level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
      category: category,
      price: Math.floor(Math.random() * 100),
      originalPrice: Math.floor(Math.random() * 100) + 100,
    };
  });
});

// Map over all courses to ensure everyone has a calculated rating
export const allCourses = [...baseCourses, ...generatedCourses].map(course => ({
  ...course,
  rating: calculateRating(course.views || "0", course.likes || "0")
}));
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
