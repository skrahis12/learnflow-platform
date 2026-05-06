import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sampleTexts, codeSnippets } from "@/data/dashboardData";

const TypingPracticeDialog = ({ isOpen, onOpenChange, mode = "text" }) => {
    const [typingText, setTypingText] = useState("");
    const [typingInput, setTypingInput] = useState("");
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [startTime, setStartTime] = useState(null);
    const [isTypingFinished, setIsTypingFinished] = useState(false);

    // Reset and start game when dialog opens or mode changes
    useEffect(() => {
        if (isOpen) {
            resetGame();
        }
    }, [isOpen, mode]);

    const resetGame = () => {
        const source = mode === "code" ? codeSnippets : sampleTexts;
        const text = source[Math.floor(Math.random() * source.length)];
        setTypingText(text);
        setTypingInput("");
        setWpm(0);
        setAccuracy(100);
        setStartTime(null);
        setIsTypingFinished(false);
    };

    const handleTypingInput = (e) => {
        const val = e.target.value;
        setTypingInput(val);

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (val.length > 0) {
            let correctChars = 0;
            for (let i = 0; i < val.length; i++) {
                if (i < typingText.length && val[i] === typingText[i]) correctChars++;
            }
            const acc = Math.floor((correctChars / val.length) * 100);
            setAccuracy(acc);

            const timeElapsed = (Date.now() - (startTime || Date.now())) / 60000; // in minutes
            if (timeElapsed > 0) {
                // Standard word length is 5 characters
                const words = val.length / 5;
                setWpm(Math.floor(words / timeElapsed));
            }
        }

        if (val.length >= typingText.length) {
            setIsTypingFinished(true);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Typing Practice ({mode === "code" ? "Code" : "Text"})</DialogTitle>
                    <DialogDescription>Type the text below as fast and accurately as possible.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {!isTypingFinished ? (
                        <>
                            <div className="p-4 bg-muted rounded-lg text-lg font-mono leading-relaxed select-none relative break-words whitespace-pre-wrap">
                                {typingText.split("").map((char, i) => {
                                    let color = "text-muted-foreground";
                                    if (i < typingInput.length) {
                                        color = typingInput[i] === char ? "text-green-500" : "text-red-500 bg-red-100";
                                    }
                                    return <span key={i} className={color}>{char}</span>;
                                })}
                            </div>
                            <Textarea
                                value={typingInput}
                                onChange={handleTypingInput}
                                className="font-mono text-lg"
                                placeholder="Start typing..."
                                autoFocus
                            />
                            <div className="flex justify-between text-sm font-medium">
                                <span>WPM: {wpm}</span>
                                <span>Accuracy: {accuracy}%</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="text-4xl">🎉</div>
                            <h3 className="text-2xl font-bold">Great Job!</h3>
                            <div className="flex justify-center gap-8">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-accent">{wpm}</p>
                                    <p className="text-xs text-muted-foreground">WPM</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-accent">{accuracy}%</p>
                                    <p className="text-xs text-muted-foreground">Accuracy</p>
                                </div>
                            </div>
                            <Button onClick={resetGame} className="w-full">
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TypingPracticeDialog;
