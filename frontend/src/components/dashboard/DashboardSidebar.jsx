import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, PlayCircle, Star, Award, FileText } from "lucide-react";
import { recentActivity } from "@/data/dashboardData";

const DashboardSidebar = ({ streak, downloads }) => {
    return (
        <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="gradient-accent border-0">
                <CardContent className="p-2 text-accent-foreground">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent-foreground/20 flex items-center justify-center">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{streak}</p>
                            <p className="text-sm opacity-80">Day Streak</p>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">
                        Keep learning to maintain your streak!
                    </p>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-display">
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === "lesson"
                                    ? "bg-accent/10 text-accent"
                                    : activity.type === "quiz"
                                        ? "bg-success/10 text-success"
                                        : "bg-warning/10 text-warning"
                                }`}>
                                {activity.type === "lesson" ? (<PlayCircle className="w-4 h-4" />) : activity.type === "quiz" ? (<Star className="w-4 h-4" />) : (<Award className="w-4 h-4" />)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground truncate">
                                    {activity.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Recent Downloads */}
            <Card>
                <CardHeader>
                    <Link to="/downloads" className="hover:opacity-80 transition-opacity">
                        <CardTitle className="text-lg font-display flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Recent Downloads
                        </CardTitle>
                    </Link>
                </CardHeader>
                <CardContent>
                    {downloads.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No downloads yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {downloads.slice(0, 3).map((file) => (
                                <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {file.date} • {file.size}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-display flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Upcoming
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                            <p className="font-medium text-foreground text-sm">
                                Assignment Due
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Friday, 11:59 PM
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardSidebar;
