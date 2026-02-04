import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Keyboard } from "lucide-react";
import TypingPracticeDialog from "./TypingPracticeDialog";
import CodingChallengeDialog from "./CodingChallengeDialog";

const CodeWithFun = () => {
    const [isTypingOpen, setIsTypingOpen] = useState(false);
    const [typingMode, setTypingMode] = useState("text"); // 'text' or 'code'
    const [isTaskOpen, setIsTaskOpen] = useState(false);

    const startTypingPractice = (mode) => {
        setTypingMode(mode);
        setIsTypingOpen(true);
    };

    const handleOpenTaskDialog = () => {
        setIsTaskOpen(true);
    };

    return (
        <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Code With Fun
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Random Coding Task */}
                <Card className="hover:border-accent/40 transition-colors cursor-pointer group">
                    <CardContent className="p-2 flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Code className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                Random Coding Task
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Challenge yourself with a random coding problem to sharpen your skills.
                            </p>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleOpenTaskDialog}>
                                Solve Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Typing Practice */}
                <Card className="hover:border-accent/40 transition-colors cursor-pointer group">
                    <CardContent className="p-2 flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            <Keyboard className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                                Typing Practice
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Improve your typing speed and accuracy with our typing tests.
                            </p>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => startTypingPractice("text")}>
                                    Text
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => startTypingPractice("code")}>
                                    Code
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <TypingPracticeDialog
                isOpen={isTypingOpen}
                onOpenChange={setIsTypingOpen}
                mode={typingMode}
            />

            <CodingChallengeDialog
                isOpen={isTaskOpen}
                onOpenChange={setIsTaskOpen}
            />
        </div>
    );
};

export default CodeWithFun;
