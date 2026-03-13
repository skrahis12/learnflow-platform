
export const notifications = [
    { id: 1, title: "New Course Available", message: "Advanced React Patterns just launched!", time: "2m ago", read: false },
    { id: 2, title: "Assignment Due", message: "Complete 'UI Basics' by tomorrow", time: "1h ago", read: false },
    { id: 3, title: "Goal Achieved", message: "You reached your weekly learning goal!", time: "3h ago", read: true },
];

export const enrolledCourses = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        instructor: "Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        progress: 65,
        lastLesson: "CSS Flexbox Deep Dive",
        totalLessons: 156,
        completedLessons: 101,
    },
    {
        id: "2",
        title: "UI/UX Design Masterclass",
        instructor: "Michael Chen",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        progress: 32,
        lastLesson: "User Research Methods",
        totalLessons: 89,
        completedLessons: 28,
    },
    {
        id: "3",
        title: "Machine Learning A-Z",
        instructor: "Dr. Emily Watson",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
        progress: 12,
        lastLesson: "Introduction to Neural Networks",
        totalLessons: 145,
        completedLessons: 17,
    },
];

export const recentActivity = [
    { type: "lesson", title: "Completed: CSS Flexbox Deep Dive", time: "2 hours ago" },
    { type: "quiz", title: "Scored 95% on HTML Quiz", time: "5 hours ago" },
    { type: "lesson", title: "Started: React Fundamentals", time: "2 days ago" },
];

export const achievements = [
    { name: "Fast Learner", description: "Completed 10 lessons in one day", icon: "🚀" },
    { name: "Quiz Master", description: "Scored 100% on 5 quizzes", icon: "🎯" },
    { name: "Dedicated", description: "7-day learning streak", icon: "🔥" },
];

export const wishlistedCourses = [
    {
        id: "4",
        title: "Digital Marketing Strategy",
        instructor: "James Wilson",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        rating: 4.7,
        studentsCount: 6800,
        price: 69.99,
    },
    {
        id: "6",
        title: "Photography Fundamentals",
        instructor: "Lisa Anderson",
        thumbnail: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
        rating: 4.6,
        studentsCount: 5200,
        price: 59.99,
    },
];

export const codingTasks = [
    // Easy
    {
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Write a function 'reverseString' that reverses a string.",
        example: "Input: 'hello' -> Output: 'olleh'",
        functionName: "reverseString",
        initialCode: "function reverseString(str) {\n  // Your code here\n  \n}",
        testCases: [
            { input: ["hello"], expected: "olleh" },
            { input: ["world"], expected: "dlrow" },
            { input: ["Racecar"], expected: "racecaR" }
        ],
        solution: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}"
    },
    {
        title: "Return Sum",
        difficulty: "Easy",
        description: "Write a function 'sum' that returns the sum of two numbers.",
        example: "Input: 2, 3 -> Output: 5",
        functionName: "sum",
        initialCode: "function sum(a, b) {\n  // Your code here\n  \n}",
        testCases: [
            { input: [2, 3], expected: 5 },
            { input: [-1, 1], expected: 0 },
            { input: [10, 5], expected: 15 }
        ],
        solution: "function sum(a, b) {\n  return a + b;\n}"
    },
    // Medium
    {
        title: "FizzBuzz",
        difficulty: "Medium",
        description: "Write a function 'fizzBuzz' that returns an array of numbers from 1 to n. For multiples of 3, use 'Fizz', for 5 use 'Buzz', and for both use 'FizzBuzz'.",
        example: "Input: 5 -> Output: [1, 2, 'Fizz', 4, 'Buzz']",
        functionName: "fizzBuzz",
        initialCode: "function fizzBuzz(n) {\n  // Your code here\n  \n}",
        testCases: [
            { input: [3], expected: [1, 2, "Fizz"] },
            { input: [5], expected: [1, 2, "Fizz", 4, "Buzz"] },
            { input: [15], expected: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"] }
        ],
        solution: "function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push('FizzBuzz');\n    else if (i % 3 === 0) result.push('Fizz');\n    else if (i % 5 === 0) result.push('Buzz');\n    else result.push(i);\n  }\n  return result;\n}"
    },
    {
        title: "Bigger number",
        difficulty: "Medium",
        description: "Write a function 'max' that returns the bigger number among two numbers.",
        example: "Input: 2, 3 -> Output: 3",
        functionName: "max",
        initialCode: "function max(a, b) {\n  // Your code here\n  \n}",
        testCases: [
            { input: [2, 3], expected: 3 },
            { input: [10, 5], expected: 10 },
            { input: [-5, -1], expected: -1 }
        ],
        solution: "function max(a, b) {\n  return a > b ? a : b;\n}"
    },
    // Hard
    {
        title: "Two Sum",
        difficulty: "Hard",
        description: "Write a function 'twoSum' that finds two numbers in an array that add up to a target. Return their indices.",
        example: "Input: [2,7,11,15], 9 -> Output: [0,1]",
        functionName: "twoSum",
        initialCode: "function twoSum(nums, target) {\n  // Your code here\n  \n}",
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] },
            { input: [[3, 3], 6], expected: [0, 1] }
        ],
        solution: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}"
    },
    {
        title: "Valid Parentheses",
        difficulty: "Hard",
        description: "Write a function 'isValid' to determine if the input string has valid parentheses '()', '{}', '[]'.",
        example: "Input: '()[]{}' -> Output: true",
        functionName: "isValid",
        initialCode: "function isValid(s) {\n  // Your code here\n  \n}",
        testCases: [
            { input: ["()"], expected: true },
            { input: ["()[]{}"], expected: true },
            { input: ["(]"], expected: false },
            { input: ["([)]"], expected: false },
            { input: ["{[]}"], expected: true }
        ],
        solution: "function isValid(s) {\n  const stack = [];\n  const map = { '(': ')', '{': '}', '[': ']' };\n  for (let char of s) {\n    if (map[char]) stack.push(char);\n    else if (map[stack.pop()] !== char) return false;\n  }\n  return stack.length === 0;\n}"
    }
];



export const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "React is a JavaScript library for building user interfaces.",
    "Components let you split the UI into independent pieces.",
    "Learning to code requires practice and patience.",
    "Programming is thinking, not typing."
];

export const codeSnippets = [
    "const sum = (a, b) => a + b;",
    "function greet(name) { return `Hello, ${name}!`; }",
    "import React, { useState } from 'react';",
    "const [count, setCount] = useState(0);",
    "array.map(item => item * 2).filter(i => i > 10);",
    "useEffect(() => { document.title = `Count: ${count}`; }, [count]);",
    "const styles = { container: { padding: '20px', backgroundColor: '#f5f5f5' } };"
];
