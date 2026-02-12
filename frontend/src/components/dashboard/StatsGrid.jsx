import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Clock, Award, Download } from "lucide-react";
import { useLearningTime } from "@/context/LearningTimeContext";

const StatsGrid = () => {
    const { learningTime, formatLearningTime } = useLearningTime();

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardContent className="p-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground leading-none">3</p>
                            <p className="text-sm text-muted-foreground mt-0.5">Courses Enrolled</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-success" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground leading-none">146</p>
                            <p className="text-sm text-muted-foreground mt-0.5">Lessons Completed</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-warning" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground leading-none">{formatLearningTime(learningTime)}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">Learning Time</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


        </div>
    );
};

export default StatsGrid;
