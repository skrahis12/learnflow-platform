import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Clock, Calendar } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext"; // For access to user data if needed

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const savedDownloads = localStorage.getItem("dashboard_downloads");
        if (savedDownloads) {
            setDownloads(JSON.parse(savedDownloads));
        }
    }, []);

    const user = { name: "Alex" }; // Mock user

    const handleDownload = () => {
        setIsGenerating(true);
        // Simulate generation delay
        setTimeout(() => {
            // 1. Create a dummy PDF blob
            const content = "This is a progress report for " + user.name + "\n\nCourses Enrolled: 3\nLessons Completed: 146\nLearning Time: 42h";
            const blob = new Blob([content], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            // 2. Trigger download
            const link = document.createElement("a");
            link.href = url;
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `Progress_Report_${timestamp}.pdf`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // 3. Save to downloads list
            const newDownload = {
                id: Date.now(),
                name: filename,
                date: new Date().toLocaleDateString(),
                size: "1.2 MB" // Mock size
            };

            const updatedDownloads = [newDownload, ...downloads];
            setDownloads(updatedDownloads);
            localStorage.setItem("dashboard_downloads", JSON.stringify(updatedDownloads));
            setIsGenerating(false);
        }, 1500);
    };

    const clearHistory = () => {
        setDownloads([]);
        localStorage.removeItem("dashboard_downloads");
    };

    const deleteDownload = (id) => {
        const updatedDownloads = downloads.filter(d => d.id !== id);
        setDownloads(updatedDownloads);
        localStorage.setItem("dashboard_downloads", JSON.stringify(updatedDownloads));
    }

    return (
        <div className="w-full min-h-screen bg-muted/30">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-foreground">Downloads</h1>
                            <p className="text-muted-foreground mt-1">Manage your reports.</p>
                        </div>
                        <div className="flex gap-2">
                            {downloads.length > 0 && (
                                <Button variant="outline" onClick={clearHistory} className="text-destructive hover:text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear History
                                </Button>
                            )}
                            <Button onClick={handleDownload} disabled={isGenerating}>
                                {isGenerating ? (
                                    <>Generating...</>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4 mr-2" />
                                        Generate New Report
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {/* Summary / Stats Card */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="pt-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{downloads.length}</p>
                                        <p className="text-sm text-muted-foreground">Total Reports</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{downloads.length > 0 ? downloads[0].date : "-"}</p>
                                        <p className="text-sm text-muted-foreground">Last Generated</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Downloads List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Download History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {downloads.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Download className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-2">No Downloads Yet</h3>
                                        <p className="text-muted-foreground mb-6">Generate your first progress report to see it here.</p>
                                        <Button onClick={handleDownload}>Generate Report</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {downloads.map((file) => (
                                            <div key={file.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{file.name}</p>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {file.date}
                                                            </span>
                                                            <span className="w-1 h-1 rounded-full bg-border" />
                                                            <span>{file.size}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => alert("Re-downloading...")}>
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteDownload(file.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Downloads;
