import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Clock, Calendar, Eye, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { fetchResources } from "@/services/resourceApi";

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    useEffect(() => {
        const savedDownloads = localStorage.getItem("dashboard_downloads");
        if (savedDownloads) {
            setDownloads(JSON.parse(savedDownloads));
        }
    }, []);

    const handleView = async (file) => {
        try {
            setViewLoading(true);
            setSelectedFile(file);

            const resources = await fetchResources();
            const baseName = file.name.split('.')[0].replace(/_/g, ' ');
            const matchedResource = resources.find(r => 
                r.title.toLowerCase() === baseName.toLowerCase() || 
                file.name.includes(r.title.replace(/\s+/g, '_'))
            );

            if (matchedResource) {
                setSelectedFile({ ...file, content: matchedResource.content });
            } else {
                const content = `This is a progress report.\n\nFile Name: ${file.name}\nDate Generated: ${file.date}\nSize: ${file.size}\n\nStatus: Completed\nVerification: Verified by LearnFlow`;
                setSelectedFile({ ...file, content: content });
            }
        } catch (error) {
            console.error("Failed to fetch resource details:", error);
        } finally {
            setViewLoading(false);
        }
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
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {/* Summary / Stats Card */}
                        <div className="grid md:grid-cols-2 gap-6">
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
                                        <p className="text-muted-foreground mb-6">Your reports will appear here once generated.</p>
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
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => handleView(file)}>
                                                        <Eye className="w-4 h-4" />
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

            {/* Resource Viewer Modal */}
            <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
                <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 gap-0 overflow-hidden rounded-none border-0 active:outline-none focus:outline-none z-[9999]">
                    <DialogHeader className="p-4 border-b bg-muted/20 flex flex-row items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                            <button 
                                onClick={() => setSelectedFile(null)}
                                className="mr-2 p-2 hover:bg-muted rounded-full transition-colors font-normal text-sm flex items-center gap-1"
                            >
                                ← Back
                            </button>
                            {selectedFile?.name}
                            <span className="text-xs font-normal text-muted-foreground border px-2 py-0.5 rounded-full bg-background ml-2">
                                Preview
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 w-full bg-white relative">
                        {viewLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                                <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
                                <p className="text-muted-foreground">Fetching report...</p>
                            </div>
                        ) : (
                            selectedFile?.content && (
                                <iframe
                                    title={selectedFile.name}
                                    srcDoc={selectedFile.content.includes('<!DOCTYPE html>') ? selectedFile.content : `<pre style="padding: 2rem; font-family: sans-serif; white-space: pre-wrap;">\${selectedFile.content}</pre>`}
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            )
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Downloads;
