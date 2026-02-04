import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Clock, Award, Download } from "lucide-react";
import { useLearningTime } from "@/context/LearningTimeContext";
import { certificates } from "@/data/dashboardData";

const StatsGrid = () => {
    const { learningTime, formatLearningTime } = useLearningTime();

    const handleDownloadCertificate = (cert) => {
        alert(`Downloading certificate for: ${cert.title}`);
    };

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

            <Card className="overflow-hidden">
                <CardContent className="p-0 h-full">
                    <div className="h-full flex flex-col">
                        <div className="p-2 border-b bg-muted/30 flex items-center gap-2">
                            <Award className="w-4 h-4 text-accent" />
                            <span className="font-semibold text-sm">Certificates</span>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[80px] p-1 space-y-1 custom-scrollbar">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                                    <div className="w-10 h-10 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{cert.title}</p>
                                        <p className="text-[10px] text-muted-foreground">{cert.date}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDownloadCertificate(cert)}>
                                        <Download className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsGrid;
