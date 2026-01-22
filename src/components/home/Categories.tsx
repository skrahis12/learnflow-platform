import { Link } from "react-router-dom";
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Camera, 
  Music, 
  Briefcase,
  Brain,
  Languages
} from "lucide-react";

const categories = [
  {
    name: "Development",
    icon: Code,
    count: 156,
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "group-hover:text-blue-500",
  },
  {
    name: "Design",
    icon: Palette,
    count: 89,
    color: "from-pink-500/20 to-rose-500/20",
    hoverColor: "group-hover:text-pink-500",
  },
  {
    name: "Business",
    icon: Briefcase,
    count: 124,
    color: "from-amber-500/20 to-orange-500/20",
    hoverColor: "group-hover:text-amber-500",
  },
  {
    name: "Marketing",
    icon: TrendingUp,
    count: 78,
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "group-hover:text-green-500",
  },
  {
    name: "Photography",
    icon: Camera,
    count: 45,
    color: "from-violet-500/20 to-purple-500/20",
    hoverColor: "group-hover:text-violet-500",
  },
  {
    name: "Music",
    icon: Music,
    count: 67,
    color: "from-red-500/20 to-rose-500/20",
    hoverColor: "group-hover:text-red-500",
  },
  {
    name: "Data Science",
    icon: Brain,
    count: 92,
    color: "from-indigo-500/20 to-blue-500/20",
    hoverColor: "group-hover:text-indigo-500",
  },
  {
    name: "Languages",
    icon: Languages,
    count: 34,
    color: "from-teal-500/20 to-cyan-500/20",
    hoverColor: "group-hover:text-teal-500",
  },
];

const Categories = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
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
            <Link
              key={category.name}
              to={`/courses?category=${category.name.toLowerCase()}`}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 transition-colors ${category.hoverColor}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} courses
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
