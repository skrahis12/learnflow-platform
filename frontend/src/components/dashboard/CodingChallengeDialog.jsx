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
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string, details?: string }
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset when closed
            setSelectedLevel(null);
            setCurrentTask(null);
            setUserCode("");
            setFeedback(null);
            setShowSolution(false);
        }
    }, [isOpen]);

    const handleSelectLevel = (level) => {
        setSelectedLevel(level);
        const filteredTasks = codingTasks.filter(t => t.difficulty === level);
        const random = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
        setCurrentTask(random);
        setUserCode(random.initialCode || "// Write your solution here...\n");
        setFeedback(null);
        setShowSolution(false);
    };

    const runTests = () => {
        if (!currentTask || !userCode) return;

        try {
            // Create a function from user code
            // We assume the user writes a function matching currentTask.functionName
            // We'll wrap it to return the function itself so we can call it
            const wrapperCode = `
                ${userCode}
                return ${currentTask.functionName};
            `;

            // Safety: This is client-side execution. 
            // In a real production app with sensitive data, use a sandboxed iframe or a backend service.
            const userFunction = new Function(wrapperCode)();

            if (typeof userFunction !== 'function') {
                throw new Error(`Function '${currentTask.functionName}' not found. Please define it as requested.`);
            }

            // Run test cases
            for (const test of currentTask.testCases) {
                const result = userFunction(...test.input);

                // Simple equality check (works for primitives and simple arrays via JSON stringify)
                const resultStr = JSON.stringify(result);
                const expectedStr = JSON.stringify(test.expected);

                if (resultStr !== expectedStr) {
                    setFeedback({
                        type: 'error',
                        message: 'Test Failed',
                        details: `Input: ${JSON.stringify(test.input)}\nExpected: ${expectedStr}\nGot: ${resultStr}`
                    });
                    return;
                }
            }

            // All tests passed
            setFeedback({
                type: 'success',
                message: 'All Tests Passed! 🎉',
                details: 'Great job! You solved the challenge.'
            });

        } catch (error) {
            setFeedback({
                type: 'error',
                message: 'Execution Error',
                details: error.message
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
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
                                onChange={(e) => {
                                    setUserCode(e.target.value);
                                    setFeedback(null); // Clear feedback on edit
                                }}
                                className="font-mono h-40 resize-none"
                                placeholder="// Type your code here..."
                                spellCheck="false"
                            />
                        </div>

                        {feedback && (
                            <div className={`p-3 rounded-md text-sm border ${feedback.type === 'success'
                                    ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                                }`}>
                                <p className="font-bold mb-1">{feedback.message}</p>
                                <pre className="text-xs whitespace-pre-wrap font-mono opacity-90">{feedback.details}</pre>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={runTests}>
                                Run Code
                            </Button>
                            <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
                                {showSolution ? "Hide Solution" : "Show Solution"}
                            </Button>
                        </div>

                        {showSolution && currentTask?.solution && (
                            <div className="mt-4 p-3 bg-muted rounded-md border border-border">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Reference Solution:</p>
                                <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
                                    {currentTask.solution}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CodingChallengeDialog;
