import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Users, PlayCircle, Heart, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const levelColors = {
  Beginner: "bg-success/10 text-success border-success/20",
  Intermediate: "bg-warning/10 text-warning border-warning/20",
  Advanced: "bg-accent/10 text-accent border-accent/20",
};

const CourseCard = ({ id, title, instructor, instructorId, channelName, thumbnail, videoUrl, rating, studentsCount, views, subs, duration, level, category, customTo, initialLiked = false, initialSubscribed = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const { toast } = useToast();

  useEffect(() => {
    setIsLiked(initialLiked);
    setIsSubscribed(initialSubscribed);
  }, [initialLiked, initialSubscribed]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic update
    const previousState = isLiked;
    setIsLiked(!isLiked);

    try {
      await api.post("/interactions/like", { courseId: id });
    } catch (error) {
      setIsLiked(previousState); // Revert on error
      const message = error.response?.status === 401 ? "Please login to like courses" : "Failed to like course";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!instructorId) return;

    // Optimistic update
    const previousState = isSubscribed;
    setIsSubscribed(!isSubscribed);

    try {
      await api.post("/interactions/subscribe", { instructorId });
    } catch (error) {
      setIsSubscribed(previousState); // Revert on error
      const message = error.response?.status === 401 ? "Please login to subscribe" : "Failed to subscribe";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="block h-full relative">
      <Link to={customTo || `/courses/${id}`} className="absolute inset-0 z-0" aria-label={`View course ${title}`} />
      <article className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative z-10 pointer-events-none">
        {/* Thumbnail / Video */}
        <div className="relative aspect-video overflow-hidden pointer-events-auto">
          {videoUrl ? (
            isPlaying ? (
              <div className="w-full h-full bg-black">
                {/* Check if it's a YouTube URL */}
                {(videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${videoUrl}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls autoPlay className="w-full h-full" src={videoUrl} />
                )}
              </div>
            ) : (
              <div
                className="w-full h-full cursor-pointer relative"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPlaying(true);
                }}
              >
                <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            )
          ) : (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )}

          {/* Like Button Overlay */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center backdrop-blur-sm transition-all pointer-events-auto"
          >
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

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
            {/* Subscribe Button (Visual only if no auth, functional if auth) */}
            <button
              onClick={handleSubscribe}
              className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider transition-all pointer-events-auto z-20 ${isSubscribed ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'}`}
            >
              <Bell className={`w-3 h-3 ${isSubscribed ? 'fill-accent' : ''}`} />
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
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
    </div>);
};
export default CourseCard;
