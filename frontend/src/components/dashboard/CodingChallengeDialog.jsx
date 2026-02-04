import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { codingTasks } from "@/data/dashboardData";

const CodingChallengeDialog = ({ isOpen, onOpenChange }) => {
    const [selectedLevel, setSelectedLevel] = useState(null); // easy, medium, hard
    const [currentTask, setCurrentTask] = useState(null);
    const [userCode, setUserCode] = useState("");

    useEffect(() => {
        if (!isOpen) {
            // Reset when closed
            setSelectedLevel(null);
            setCurrentTask(null);
            setUserCode("");
        }
    }, [isOpen]);

    const handleSelectLevel = (level) => {
        setSelectedLevel(level);
        const filteredTasks = codingTasks.filter(t => t.difficulty === level);
        const random = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
        setCurrentTask(random);
        setUserCode("// Write your solution here...\n");
    };

    const handleSubmitCode = () => {
        // Mock submission
        alert("Solution submitted! (Mock)");
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    {!selectedLevel ? (
                        <>
                            <DialogTitle>Select Difficulty</DialogTitle>
                            <DialogDescription>Choose a challenge level to start coding.</DialogDescription>
                        </>
                    ) : (
                        <>
                            <DialogTitle className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedLevel(null)}>
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                {currentTask?.title}
                                <span className={`text-xs px-2 py-0.5 rounded border ${currentTask?.difficulty === "Easy" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                        currentTask?.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                            "bg-red-500/10 text-red-500 border-red-500/20"
                                    }`}>
                                    {currentTask?.difficulty}
                                </span>
                            </DialogTitle>
                            <DialogDescription className="hidden">Task Details</DialogDescription>
                        </>
                    )}
                </DialogHeader>

                {!selectedLevel ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-green-500 hover:text-green-500 hover:bg-green-500/5 transition-all" onClick={() => handleSelectLevel("Easy")}>
                            <span className="text-2xl">🌱</span>
                            <span className="font-bold">Easy</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/5 transition-all" onClick={() => handleSelectLevel("Medium")}>
                            <span className="text-2xl">⚡</span>
                            <span className="font-bold">Medium</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 transition-all" onClick={() => handleSelectLevel("Hard")}>
                            <span className="text-2xl">🔥</span>
                            <span className="font-bold">Hard</span>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-sm text-foreground/80">
                            <p className="mb-2">{currentTask?.description}</p>
                            <div className="bg-muted p-3 rounded-md font-mono text-xs">
                                {currentTask?.example}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">Your Solution:</label>
                            <Textarea
                                value={userCode}
                                onChange={(e) => setUserCode(e.target.value)}
                                className="font-mono h-40 resize-none"
                                placeholder="// Type your code here..."
                            />
                        </div>
                        <Button className="w-full" onClick={handleSubmitCode}>Submit Solution</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CodingChallengeDialog;
