import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, PlayCircle, Clock } from "lucide-react";
import { enrolledCourses } from "@/data/dashboardData";

const ContinueLearning = () => {
    const [lastWatched, setLastWatched] = useState(null);

    useEffect(() => {
        // Simulate fetching last watched video
        setLastWatched({
            courseId: "1",
            courseTitle: "Complete Web Development Bootcamp",
            lessonTitle: "CSS Flexbox Deep Dive",
            timestamp: "12:45",
            totalDuration: "18:30",
            progress: 70
        });
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                    Continue Learning
                </h2>
                <Link to="/my-learning">
                    <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {/* Resume Watching Card */}
                {lastWatched && (
                    <Card className="border-accent/50 bg-accent/5 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto">
                                    <img src={lastWatched.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"} alt={lastWatched.lessonTitle} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <PlayCircle className="w-10 h-10 text-white opacity-80" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                                        <div className="h-full bg-accent" style={{ width: `${lastWatched.progress}%` }} />
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="bg-background/50 text-xs border-accent/20 text-accent">
                                            Resume Video
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Stopped at {lastWatched.timestamp}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{lastWatched.lessonTitle}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{lastWatched.courseTitle}</p>
                                    <div className="flex items-center gap-3">
                                        <Button size="sm" className="gap-2" asChild>
                                            <Link to={`/courses/${lastWatched.courseId}/learn`}>
                                                <PlayCircle className="w-4 h-4" />
                                                Resume
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-xs">
                                            View Syllabus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {enrolledCourses.map((course) => (
                    <Link key={course.id} to={`/courses/${course.id}/learn`}>
                        <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    <img src={course.thumbnail} alt={course.title} className="w-24 h-24 md:w-32 md:h-20 rounded-xl object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground truncate">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {course.instructor}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {course.completedLessons}/{course.totalLessons} lessons
                                                </span>
                                                <span className="font-medium text-accent">
                                                    {course.progress}%
                                                </span>
                                            </div>
                                            <Progress value={course.progress} className="h-2" />
                                        </div>
                                    </div>
                                    <Button variant="accent" size="icon" className="hidden md:flex self-center">
                                        <PlayCircle className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ContinueLearning;
