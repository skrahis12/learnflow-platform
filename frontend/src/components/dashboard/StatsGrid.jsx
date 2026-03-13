import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Clock, Award, Download } from "lucide-react";
import { useLearningTime } from "@/context/LearningTimeContext";

const StatsGrid = () => {
    const { learningTime, formatLearningTime } = useLearningTime();
    const [completedCount, setCompletedCount] = useState(0);
    const [enrolledCount, setEnrolledCount] = useState(0);

    useEffect(() => {
        const calculateStats = () => {
            // Completed Lessons
            const completedSaved = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
            setCompletedCount(completedSaved.length);

            // Enrolled Courses (Unique courses in history)
            const historySaved = JSON.parse(localStorage.getItem("user_learning_history") || "[]");
            // Assuming history stores unique courses by ID due to logic in CourseDetail
            setEnrolledCount(historySaved.length);
        };

        calculateStats();

        window.addEventListener('storage', calculateStats);
        return () => window.removeEventListener('storage', calculateStats);
    }, []);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <p className="text-xl lg:text-2xl font-bold text-foreground leading-none">{enrolledCount}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1">Courses Enrolled</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-success" />
                        </div>
                        <div>
                            <p className="text-xl lg:text-2xl font-bold text-foreground leading-none">{completedCount}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1">Lessons Completed</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                            <p className="text-xl lg:text-2xl font-bold text-foreground leading-none">{formatLearningTime(learningTime)}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1">Today's Learning Time</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


        </div>
    );
};

export default StatsGrid;
