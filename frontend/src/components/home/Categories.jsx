import { useState, useEffect } from "react";
import { Code, Palette, TrendingUp, Briefcase, Brain, Shield, Cloud } from "lucide-react";
import CategoryCard from "./CategoryCard";
import api from "@/services/api";

const initialCategories = [
  {
    name: "Web Development",
    icon: Code,
    count: 0,
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:text-blue-500",
  },
  {
    name: "Graphic Design",
    icon: Palette,
    count: 0,
    color: "from-pink-500/20 to-rose-500/20",
    hoverColor: "group-hover:text-pink-500",
  },
  {
    name: "Business Strategy",
    icon: Briefcase,
    count: 0,
    color: "from-amber-500/20 to-orange-500/20",
    hoverColor: "group-hover:text-amber-500",
  },
  {
    name: "Digital Marketing",
    icon: TrendingUp,
    count: 0,
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "group-hover:text-green-500",
  },
  {
    name: "Data Science",
    icon: Brain,
    count: 0,
    color: "from-indigo-500/20 to-blue-500/20",
    hoverColor: "group-hover:text-indigo-500",
  },
  {
    name: "Artificial Intelligence",
    icon: Brain,
    count: 0,
    color: "from-violet-500/20 to-purple-500/20",
    hoverColor: "group-hover:text-violet-500",
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    count: 0,
    color: "from-red-500/20 to-rose-500/20",
    hoverColor: "group-hover:text-red-500",
  },
  {
    name: "Cloud Computing",
    icon: Cloud,
    count: 0,
    color: "from-sky-500/20 to-blue-500/20",
    hoverColor: "group-hover:text-sky-500",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await api.get("/courses/stats/categories");
        const stats = response.data;
        const statsMap = stats.reduce((acc, curr) => {
          acc[curr.name] = curr.count;
          return acc;
        }, {});

        setCategories(prev => prev.map(cat => ({
          ...cat,
          count: statsMap[cat.name] || 0
        })));
      } catch (error) {
        console.error("Error fetching category stats:", error);
      }
    };

    fetchCategoryStats();
  }, []);

  return (<section className="py-20 lg:py-28 bg-muted/30">
    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Explore
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
          Popular Categories
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Choose from hundreds of courses across various disciplines
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.name} category={category} index={index} />
        ))}
      </div>
    </div>
  </section>);
};
export default Categories;
