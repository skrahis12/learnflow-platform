import { Link } from "react-router-dom";
import { Star, Clock, Users, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const levelColors = {
  Beginner: "bg-success/10 text-success border-success/20",
  Intermediate: "bg-warning/10 text-warning border-warning/20",
  Advanced: "bg-accent/10 text-accent border-accent/20",
};
const CourseCard = ({ id, title, instructor, channelName, thumbnail, videoUrl, rating, studentsCount, views, subs, duration, level, category, customTo }) => {
  return (<Link to={customTo || `/courses/${id}`} className="block h-full">
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Thumbnail / Video */}
      <div className="relative aspect-video overflow-hidden">
        {videoUrl ? (
          <>
            <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500" />
            {(videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) ? (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <video
                src={videoUrl}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                muted
                loop
                playsInline
                onMouseEnter={(e) => {
                  e.target.play().catch(() => { });
                }}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            )}
          </>
        ) : (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <Badge variant="secondary" className={`absolute top-3 left-3 ${levelColors[level]}`}>
          {level}
        </Badge>
        {views && (
          <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm">
            {views} Views
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {category}
          </span>
          {subs && (
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {subs} Subs
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
          {channelName ? (
            <>
              <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
                {channelName.charAt(0)}
              </span>
              {channelName}
            </>
          ) : (
            `by ${instructor}`
          )}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Users className="w-4 h-4" />
            <span>{studentsCount.toLocaleString()} Students</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <span className="text-xl font-bold text-success">
            Free
          </span>
          <Button variant="ghost" size="sm" className="h-8 text-accent group-hover:bg-accent group-hover:text-white transition-all">
            Enroll
          </Button>
        </div>
      </div>
    </article>
  </Link >);
};
export default CourseCard;
