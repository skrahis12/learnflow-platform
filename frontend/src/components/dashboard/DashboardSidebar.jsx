import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Trash2, Eye } from "lucide-react";

const DashboardSidebar = ({ streak, downloads, user, onDeleteDownload, onViewDownload }) => {
    // Logic moved to parent for better modal management
    const handleView = (file) => {
        if (onViewDownload) onViewDownload(file);
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

            {/* Recent Activity Removed */}

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
                                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
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
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                        <button 
                                            onClick={() => handleView(file)}
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                            title="View Certificate"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => onDeleteDownload(file.id)}
                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Upcoming Removed */}
        </div>
    );
};

export default DashboardSidebar;
