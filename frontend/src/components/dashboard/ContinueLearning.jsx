import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, PlayCircle, Clock } from "lucide-react";
import { enrolledCourses } from "@/data/dashboardData";

const ContinueLearning = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            const savedHistory = JSON.parse(localStorage.getItem("user_learning_history") || "[]");
            // Sanitize history to remove nulls or invalids
            const validHistory = Array.isArray(savedHistory)
                ? savedHistory.filter(item => item && typeof item === 'object' && item.id)
                : [];
            setHistory(validHistory);
        } catch (error) {
            console.error("Failed to load learning history", error);
            setHistory([]); // Fallback to empty
        }
    }, []);

    if (history.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground">
                    Continue Learning
                </h2>
                <Card className="border-dashed border-2 bg-muted/20">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                            <PlayCircle className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">No Recent Activity</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                            Start watching a course to see your history here and pick up where you left off.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Get the most recent item for the "Hero" card
    const lastWatched = history.length > 0 ? history[0] : null;
    const otherItems = history.length > 1 ? history.slice(1) : [];

    if (!lastWatched) return null; // Safety check

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-foreground">
                    Continue Learning
                </h2>
                {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => {
                        localStorage.removeItem("user_learning_history");
                        setHistory([]);
                    }} className="text-xs text-muted-foreground hover:text-destructive">
                        Clear History
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {/* Resume Watching Card (Most Recent) */}
                {lastWatched && (
                    <Card className="border-accent/50 bg-accent/5 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row h-full">
                                {/* Video/Thumbnail Container */}
                                <div className="relative w-full sm:w-1/3 max-w-[300px] aspect-video sm:aspect-auto">
                                    {lastWatched.lastLesson && lastWatched.lastLesson.videoUrl ? (
                                        <iframe
                                            src={`${lastWatched.lastLesson.videoUrl}?autoplay=0&controls=1&loading=lazy`}
                                            title={lastWatched.lastLesson.title}
                                            className="w-full h-full object-cover"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
                                            <img src={lastWatched.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200"} alt={lastWatched.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <PlayCircle className="w-10 h-10 text-white opacity-80" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                                                <div className="h-full bg-accent" style={{ width: `${lastWatched.progress || 0}%` }} />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <Badge variant="outline" className="bg-background/50 text-xs border-accent/20 text-accent">
                                            Resume
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Active {new Date(lastWatched.lastAccessed).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg sm:text-xl mb-1 line-clamp-1 text-foreground">
                                        {lastWatched.lastLesson ? lastWatched.lastLesson.title : lastWatched.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                                        {lastWatched.lastLesson ? `Unit ${lastWatched.lastLesson.moduleId + 1}: Lesson ${lastWatched.lastLesson.lessonId + 1}` : lastWatched.instructor}
                                    </p>

                                    <div className="flex items-center gap-3 mt-auto">
                                        <Button size="sm" className="gap-2 w-full sm:w-auto" asChild>
                                            <Link to={`/courses/${lastWatched.id}/learn`}>
                                                <PlayCircle className="w-4 h-4" />
                                                {lastWatched.lastLesson ? "Continue Watching" : "Start Learning"}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent History List Removed */}
            </div>
        </div>
    );
};

export default ContinueLearning;
