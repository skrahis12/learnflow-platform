import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, PlayCircle, Star, Award, FileText } from "lucide-react";
import { recentActivity } from "@/data/dashboardData";

const DashboardSidebar = ({ streak, downloads, user }) => {
    const handleDownload = (file) => {
        // 1. Create a dummy PDF blob (simulating backend generation)
        const userName = user?.name || "Student";
        const content = "This is a progress report for " + userName + "\n\nCourses Enrolled: 3\nLessons Completed: 146\nLearning Time: 42h\n\nFile: " + file.name;
        // FIX: The error "failed to load PDF" happens because we are putting plain text into a PDF blob.
        // A real PDF requires binary structure. Since we don't have a PDF library, 
        // we will create it as a text file for now so it opens correctly in the browser.
        const blob = new Blob([content], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);

        // 2. Trigger view in new tab
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Note: For blob URLs in new tabs, standard practice is to not revoke immediately 
        // if we want to ensure it loads, but for a click event usually it's fine. 
        // However, to be safe for "open in new tab", we might want to delay revocation or not revoke.
        // But since it's a single page app, memory leaks might occur if we don't revoke.
        // A safer bet for "open" with blobs is window.open(url) directly.

        // Let's rely on window.open which returns a reference
        // window.open(url, '_blank');
        // window.URL.revokeObjectURL(url); // strict revocation might break the new tab loading instantly

        // Reverting to the anchor method but without download attribute.
        // To ensure it loads before revocation, we can set a timeout.
        // FIX: Increase timeout to ensure the new tab has time to load the resource.
        setTimeout(() => window.URL.revokeObjectURL(url), 60000);
    };

    return (
        <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="gradient-accent border-0">
                <CardContent className="p-2 text-accent-foreground">
                    <div className="flex items-center gap-2 mb-2">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-lg object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-lg bg-accent-foreground/20 flex items-center justify-center">
                                <span className="text-2xl">🔥</span>
                            </div>
                        )}
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
                                <div key={file.id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() => handleDownload(file)}
                                >
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
