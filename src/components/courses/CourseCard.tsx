import { Link } from "react-router-dom";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

const levelColors = {
  Beginner: "bg-success/10 text-success border-success/20",
  Intermediate: "bg-warning/10 text-warning border-warning/20",
  Advanced: "bg-accent/10 text-accent border-accent/20",
};

const CourseCard = ({
  id,
  title,
  instructor,
  thumbnail,
  rating,
  studentsCount,
  price,
  originalPrice,
  duration,
  level,
  category,
}: CourseCardProps) => {
  return (
    <Link to={`/courses/${id}`}>
      <article className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge
            variant="secondary"
            className={`absolute top-3 left-3 ${levelColors[level]}`}
          >
            {level}
          </Badge>
          {originalPrice && (
            <Badge className="absolute top-3 right-3 gradient-accent border-0">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {category}
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            by {instructor}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <span className="text-xl font-bold text-foreground">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;
