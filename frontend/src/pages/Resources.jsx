import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    FileText, Download, Layout, Code, PenTool, Database,
    Search, BookOpen, ExternalLink, Filter, Loader2, Video
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchResources, fetchResourceById } from "@/services/resourceApi";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const categories = ["All", "Development", "Backend", "Design", "Data Science", "Business"];

const iconMap = {
    "Code": Code,
    "FileText": FileText,
    "Layout": Layout,
    "Database": Database,
    "PenTool": PenTool,
    "Search": Search, // Fallback if needed
    "BookOpen": BookOpen,
    "Video": Video
};

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchResources();
                setResources(data);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedResource || viewLoading) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            document.body.style.overscrollBehavior = "none";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.overscrollBehavior = "";
        }
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.overscrollBehavior = "";
        };
    }, [selectedResource, viewLoading]);

    // Handle Browser Back Button for Modal
    useEffect(() => {
        const handlePopState = () => {
            if (selectedResource || viewLoading) {
                setSelectedResource(null);
                setViewLoading(false);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedResource, viewLoading]);

    const filteredResources = resources.filter(res => {
        const matchesCategory = activeCategory === "All" || res.category === activeCategory;
        const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleView = async (resource) => {
        if (resource.downloadUrl) {
            window.open(resource.downloadUrl, '_blank');
            return;
        }

        // Push state so Back Button works
        window.history.pushState({ modalOpen: true }, "");

        try {
            setViewLoading(true);
            setSelectedResource(resource); // Open modal with basic info immediately

            // Fetch detailed content (simulating API call)
            const detailedResource = await fetchResourceById(resource.id);
            setSelectedResource(detailedResource);
        } catch (error) {
            console.error("Failed to fetch resource details:", error);
            alert(`Failed to load resource details: ${error.message}`);
            setSelectedResource(null); // Close modal on error
        } finally {
            setViewLoading(false);
        }
    };

    const handleDownload = (resource) => {
        if (resource.downloadUrl) {
            window.open(resource.downloadUrl, '_blank');
            return;
        }

        setDownloadingId(resource.id);

        // Simulate network delay for download animation
        setTimeout(() => {
            let content = resource.content;
            let type = "text/html";
            let extension = resource.extension || "html";

            if (!content) {
                content = `This is a downloadable resource placeholder for: ${resource.title}\n\nType: ${resource.type}\nDescription: ${resource.description}`;
                type = "text/plain";
                extension = "txt";
            }

            const blob = new Blob([content], { type: type });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            const filename = `${resource.title.replace(/\s+/g, '_')}.${extension}`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            const savedDownloads = localStorage.getItem("dashboard_downloads");
            const currentDownloads = savedDownloads ? JSON.parse(savedDownloads) : [];

            const newDownload = {
                id: Date.now(),
                name: filename,
                date: new Date().toLocaleDateString(),
                size: content.length > 1000 ? "1.2 MB" : "15 KB"
            };

            const updatedDownloads = [newDownload, ...currentDownloads];
            localStorage.setItem("dashboard_downloads", JSON.stringify(updatedDownloads));

            setDownloadingId(null);
        }, 1500);
    };

    return (
        <div className="w-full">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted/30 -z-10" />
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 font-medium text-accent animate-fade-up">
                            <BookOpen className="w-4 h-4" />
                            <span>Free Community Perks</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-up">
                            Curated Learning <span className="text-accent">Resources</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
                            High-quality assets, guides, and templates designed to help you fast-track your learning journey.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative animate-fade-up">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search resources..."
                                className="h-14 pl-12 rounded-2xl border-border bg-card shadow-lg focus:ring-accent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Filters and Grid */}
                <section className="py-12 border-t border-border">
                    <div className="container mx-auto px-4">
                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                            <div className="p-1 bg-muted rounded-xl flex flex-wrap gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                                            ? "bg-card text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resources Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
                                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                                <p className="text-muted-foreground">Loading resources...</p>
                            </div>
                        ) : filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredResources.map((resource, index) => {
                                    const IconComponent = iconMap[resource.iconName] || FileText;
                                    return (
                                        <div
                                            key={resource.id}
                                            onClick={() => handleView(resource)}
                                            className="group bg-card rounded-[2rem] border border-border p-8 hover:shadow-xl hover:border-accent/20 transition-all duration-300 animate-fade-up cursor-pointer"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className={`w-14 h-14 rounded-2xl ${resource.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                    <IconComponent className={`w-7 h-7 ${resource.color}`} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                                    {resource.type}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                                {resource.description}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <Button
                                                    className="flex-1 rounded-xl bg-accent hover:bg-accent/90"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDownload(resource);
                                                    }}
                                                    disabled={downloadingId === resource.id}
                                                >
                                                    {downloadingId === resource.id ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Downloading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Download className="w-4 h-4 mr-2" />
                                                            {resource.downloadUrl ? "Open Link" : "Download Now"}
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleView(resource);
                                                    }}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                    <Filter className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No resources found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                                <Button
                                    variant="link"
                                    className="mt-4 text-accent"
                                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>



                {/* Newsletter / Feature */}
                <section className="py-24 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-card border border-border rounded-[3rem] p-12 overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="flex-1 relative z-10 text-center md:text-left">
                                <h2 className="text-3xl font-display font-bold mb-4">Want more resources?</h2>
                                <p className="text-muted-foreground mb-8">
                                    Subscribe to our weekly newsletter and get exclusive design assets and coding
                                    cheatsheets straight to your inbox.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 rounded-xl border-border bg-background"
                                    />
                                    <Button className="h-12 rounded-xl bg-accent px-8">Subscribe</Button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="w-32 h-32 rounded-3xl bg-accent flex items-center justify-center rotate-12 shadow-glow">
                                    <BookOpen className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            {/* Resource Viewer Modal */}
            <Dialog open={!!selectedResource || viewLoading} onOpenChange={(open) => {
                if (!open) {
                    if (window.history.state?.modalOpen) {
                        window.history.back();
                    } else {
                        setSelectedResource(null);
                        setViewLoading(false);
                    }
                }
            }}>
                <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 gap-0 overflow-hidden rounded-none border-0 active:outline-none focus:outline-none">
                    {viewLoading && !selectedResource ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
                            <p className="text-muted-foreground">Fetching resource...</p>
                        </div>
                    ) : (
                        <>
                            <DialogHeader className="p-4 border-b bg-muted/20">
                                <DialogTitle className="flex items-center gap-2">
                                    {selectedResource?.title}
                                    <span className="text-xs font-normal text-muted-foreground border px-2 py-0.5 rounded-full bg-background">
                                        Preview
                                    </span>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 w-full bg-white relative">
                                {viewLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                                    </div>
                                )}
                                {selectedResource && (
                                    <iframe
                                        title={selectedResource.title}
                                        srcDoc={selectedResource.content}
                                        className="w-full h-full border-0"
                                        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Resources;
