
import {
    Code, FileText, Layout, Database, PenTool
} from "lucide-react";

const resourcesData = [
    {
        id: "7",
        title: "React Full Guide & Cheatsheet",
        type: "PDF Guide",
        category: "Development",
        description: "A comprehensive PDF guide covering React hooks, components, and best practices for quick reference.",
        iconName: "FileText",
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        // Using HTML content as a "PDF" replacement for readability
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React.js Ultimate Cheatsheet</title>
    <style>
        :root { --primary: #61dafb; --dark: #20232a; --light: #f5f7f9; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        /* Header */
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--dark); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        /* Sections */
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        p { margin-bottom: 15px; }
        
        /* Categories */
        .category-tag { display: inline-block; background: var(--dark); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        /* Code Blocks */
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        /* Syntax Highlight Simulation */
        .kwd { color: #c678dd; } /* keyword */
        .fn { color: #61dafb; } /* function */
        .str { color: #98c379; } /* string */
        .tag { color: #e06c75; } /* tag */
        .attr { color: #d19a66; } /* attribute */
        .num { color: #d19a66; } /* number */
        .com { color: #7f8fa6; font-style: italic; } /* comment */
        
        /* Tables */
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        th { background-color: var(--light); color: var(--dark); }
        
        /* Print tweak */
        @media print { body { padding: 0; } .section { break-inside: avoid; } }
    </style>
</head>
<body>
    <header>
        <h1>⚛️ React.js Ultimate Guide</h1>
        <p class="subtitle">Small Details, Big Concepts & Easy Explanations</p>
    </header>

    <!-- 1. INTRO -->
    <div class="section">
        <span class="category-tag">INTRODUCTION</span>
        <h2>What is React? (Easy Way)</h2>
        <p>Think of React like playing with LEGOs.</p>
        <ul>
            <li><strong>Components:</strong> Each LEGO brick is a "Component" (like a Button, a Header, a Card).</li>
            <li><strong>Composition:</strong> You build big structures (Websites) by snapping these small bricks together.</li>
            <li><strong>Reusability:</strong> Once you make a "Blue Brick", you can reuse it 100 times without making it again.</li>
        </ul>
        <p><strong>React is Declarative:</strong> You tell React <em>what</em> you want (e.g., "I want a button here"), and React handles <em>how</em> to put it on the screen.</p>
    </div>

    <!-- 2. VARIABLES & DATA TYPES -->
    <div class="section">
        <span class="category-tag">FUNDAMENTALS</span>
        <h2>Variables & Data Types in JSX</h2>
        <p>In React, you can use JavaScript variables directly inside your HTML-like code (JSX) using curly braces <code>{}</code>.</p>
        
        <h3>1. Strings (Text)</h3>
        <p>Text properties used for names, titles, descriptions.</p>
        <pre><code><span class="kwd">const</span> name = <span class="str">"LearnFlow"</span>;
<span class="kwd">return</span> <span class="tag">&lt;h1&gt;</span>Welcome to {name}<span class="tag">&lt;/h1&gt;</span>;</code></pre>

        <h3>2. Numbers (Math)</h3>
        <p>Used for calculations, prices, scores.</p>
        <pre><code><span class="kwd">const</span> price = <span class="num">99</span>;
<span class="kwd">return</span> <span class="tag">&lt;p&gt;</span>Total: \${price + <span class="num">1</span>}<span class="tag">&lt;/p&gt;</span>;</code></pre>

        <h3>3. Booleans (True/False)</h3>
        <p>Used for showing/hiding things (Conditionals).</p>
        <pre><code><span class="kwd">const</span> isLoggedIn = <span class="kwd">true</span>;
<span class="kwd">return</span> <span class="tag">&lt;div&gt;</span>{isLoggedIn ? <span class="str">"User is Online"</span> : <span class="str">"Offline"</span>}<span class="tag">&lt;/div&gt;</span>;</code></pre>
    </div>

    <!-- 3. PROPS -->
    <div class="section">
        <span class="category-tag">COMPONENTS</span>
        <h2>Properties (Props)</h2>
        <p><strong>Props</strong> are like arguments you pass to a function. They let you pass data from a <em>Parent</em> component to a <em>Child</em> component.</p>
        
        <h3>Anatomy of Props</h3>
        <pre><code><span class="com">// 1. Define the Component (The Child)</span>
<span class="kwd">function</span> <span class="fn">WelcomeCard</span>(props) {
  <span class="kwd">return</span> <span class="tag">&lt;h2&gt;</span>Hello, {props.username}!<span class="tag">&lt;/h2&gt;</span>;
}

<span class="com">// 2. Use the Component (The Parent)</span>
<span class="kwd">function</span> <span class="fn">App</span>() {
  <span class="kwd">return</span> <span class="tag">&lt;WelcomeCard</span> <span class="attr">username</span>=<span class="str">"Sarah"</span> <span class="tag">/&gt;</span>;
}</code></pre>
        
        <p><strong>Small Detail:</strong> Props are <em>Read-Only</em>. A child component cannot change its own props.</p>
    </div>

    <!-- 4. STATE -->
    <div class="section">
        <span class="category-tag">HOOKS</span>
        <h2>State (useState)</h2>
        <p><strong>State</strong> is a Component's personal memory. Unlike normal variables, when State changes, the component <em>re-renders</em> (updates the screen).</p>
        
        <h3>Variable vs State</h3>
        <table>
            <tr>
                <th>Feature</th>
                <th>Normal Variable</th>
                <th>State (useState)</th>
            </tr>
            <tr>
                <td>Updates Screen?</td>
                <td>❌ No</td>
                <td>✅ Yes</td>
            </tr>
            <tr>
                <td>Persists across renders?</td>
                <td>❌ No (resets)</td>
                <td>✅ Yes (remembers value)</td>
            </tr>
        </table>

        <h3>Syntax</h3>
        <pre><code><span class="kwd">import</span> { useState } <span class="kwd">from</span> <span class="str">'react'</span>;

<span class="kwd">function</span> <span class="fn">Counter</span>() {
  <span class="com">// [currentValue, functionToUpdateIt] = useState(initialValue)</span>
  <span class="kwd">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);

  <span class="kwd">return</span> (
    <span class="tag">&lt;button</span> <span class="attr">onClick</span>={() => <span class="fn">setCount</span>(count + <span class="num">1</span>)}<span class="tag">&gt;</span>
      Clicked {count} times
    <span class="tag">&lt;/button&gt;</span>
  );
}</code></pre>
    </div>

    <!-- 5. EVENTS -->
    <div class="section">
        <span class="category-tag">INTERACTION</span>
        <h2>Handling Events</h2>
        <p>React events look like HTML events but are camelCased (e.g., <code>onClick</code> becomes <code>onClick</code>).</p>
        
        <h3>Common Events</h3>
        <ul>
            <li><code>onClick</code>: Button presses.</li>
            <li><code>onChange</code>: Typing in input fields.</li>
            <li><code>onSubmit</code>: Submitting forms.</li>
        </ul>

        <pre><code><span class="kwd">function</span> <span class="fn">TextInput</span>() {
  <span class="kwd">const</span> [text, setText] = <span class="fn">useState</span>(<span class="str">""</span>);

  <span class="com">// handleChange function</span>
  <span class="kwd">const</span> <span class="fn">handleChange</span> = (e) => {
    <span class="fn">setText</span>(e.target.value); <span class="com">// get value from input</span>
  };

  <span class="kwd">return</span> <span class="tag">&lt;input</span> <span class="attr">type</span>=<span class="str">"text"</span> <span class="attr">onChange</span>={handleChange} <span class="tag">/&gt;</span>;
}</code></pre>
    </div>

    <!-- 6. EFFECTS -->
    <div class="section">
        <span class="category-tag">HOOKS</span>
        <h2>Side Effects (useEffect)</h2>
        <p>Use <code>useEffect</code> to do things <em>outside</em> simply drawing the UI, like fetching data, setting timers, or changing the page title.</p>
        
        <h3>The Dependency Array []</h3>
        <p>The array at the end tells React <em>when</em> to run the effect.</p>
        
        <pre><code><span class="com">// 1. Run on Every Render (Rarely used)</span>
<span class="fn">useEffect</span>(() => { console.log(<span class="str">"Rendered!"</span>); });

<span class="com">// 2. Run ONLY on Mount (First load)</span>
<span class="fn">useEffect</span>(() => { console.log(<span class="str">"Component Loaded"</span>); }, []);

<span class="com">// 3. Run when 'data' changes</span>
<span class="fn">useEffect</span>(() => { console.log(<span class="str">"Data updated"</span>); }, [data]);</code></pre>
    </div>

    <!-- 7. LISTS -->
    <div class="section">
        <span class="category-tag">DATA</span>
        <h2>Rendering Lists</h2>
        <p>Use the JavaScript <code>.map()</code> function to turn an array of data into an array of elements.</p>
        <p><strong>Rule:</strong> Always give each item a unique <code>key</code> prop.</p>
        
        <pre><code><span class="kwd">const</span> fruits = [<span class="str">"Apple"</span>, <span class="str">"Banana"</span>, <span class="str">"Orange"</span>];

<span class="kwd">return</span> (
  <span class="tag">&lt;ul&gt;</span>
    {fruits.<span class="fn">map</span>((fruit, index) => (
      <span class="tag">&lt;li</span> <span class="attr">key</span>={index}<span class="tag">&gt;</span>{fruit}<span class="tag">&lt;/li&gt;</span>
    ))}
  <span class="tag">&lt;/ul&gt;</span>
);</code></pre>
    </div>

    <!-- 8. PERFORMANCE -->
    <div class="section">
        <span class="category-tag">OPTIMIZATION</span>
        <h2>Performance Tips</h2>
        <p>Advanced techniques to keep your React app fast.</p>
        
        <h3>1. Code Splitting</h3>
        <p>Load code only when needed using <code>React.lazy</code>.</p>
        <pre><code><span class="kwd">const</span> OtherComponent = <span class="fn">React.lazy</span>(() => <span class="kwd">import</span>(<span class="str">'./OtherComponent'</span>));</code></pre>

        <h3>2. Skipping Re-renders</h3>
        <p>Use <code>React.memo</code> to prevent a component from re-rendering if its props haven't changed.</p>
        <pre><code><span class="kwd">const</span> MyComponent = <span class="fn">React.memo</span>(<span class="kwd">function</span> <span class="fn">MyComponent</span>(props) {
  <span class="com">// renders only if props change</span>
});</code></pre>

        <h3>3. Memoizing Calculations</h3>
        <p>Use <code>useMemo</code> to cache expensive calculations.</p>
        <pre><code><span class="kwd">const</span> expensiveValue = <span class="fn">useMemo</span>(() => <span class="fn">computeExpensiveValue</span>(a, b), [a, b]);</code></pre>
    </div>

    <!-- 9. OFFICIAL RESOURCES (Merged) -->
    <div class="section" style="border-left: 5px solid var(--primary); background: var(--light);">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>Need more details? Always check the official source of truth.</p>
        <p>
            <a href="https://react.dev/reference/react" target="_blank" style="display: inline-block; background: var(--dark); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Official React API Reference ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #eee; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Designed for easy learning. Keep coding!</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "8",
        title: "JavaScript Ultimate Guide",
        type: "PDF Guide",
        category: "Development",
        description: "Master modern JavaScript with this essential guide covering ES6+, DOM manipulation, and Async patterns.",
        iconName: "Code",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Ultimate Guide</title>
    <style>
        :root { --primary: #f7df1e; --dark: #323330; --light: #fefdf5; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        /* Header */
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        /* Sections */
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        p { margin-bottom: 15px; }
        
        /* Categories */
        .category-tag { display: inline-block; background: var(--dark); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        /* Code Blocks */
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        /* Syntax Highlight Simulation */
        .kwd { color: #c678dd; } /* keyword */
        .fn { color: #61dafb; } /* function */
        .str { color: #98c379; } /* string */
        .tag { color: #e06c75; } /* tag */
        .num { color: #d19a66; } /* number */
        .com { color: #7f8fa6; font-style: italic; } /* comment */
        
        /* Tables */
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        th { background-color: var(--light); color: var(--dark); }
    </style>
</head>
<body>
    <header>
        <h1>⚡ JavaScript Ultimate Guide</h1>
        <p class="subtitle">From Variables to Async/Await: The Essentials</p>
    </header>

    <!-- 1. VARIABLES -->
    <div class="section">
        <span class="category-tag">FUNDAMENTALS</span>
        <h2>Variables (ES6)</h2>
        <p>Stop using <code>var</code>. Use <strong>let</strong> and <strong>const</strong>.</p>
        
        <h3>const vs let</h3>
        <table>
            <tr>
                <th>Type</th>
                <th>Reassignable?</th>
                <th>Use Case</th>
            </tr>
            <tr>
                <td><code>const</code></td>
                <td>❌ No</td>
                <td>Defaults, Functions, Arrays, Objects</td>
            </tr>
            <tr>
                <td><code>let</code></td>
                <td>✅ Yes</td>
                <td>Counters, Loops, Values that change</td>
            </tr>
        </table>
        
        <pre><code><span class="kwd">const</span> name = <span class="str">"LearnFlow"</span>;
<span class="com">// name = "NewName"; // ❌ Error!</span>

<span class="kwd">let</span> count = <span class="num">0</span>;
count = <span class="num">1</span>; <span class="com">// ✅ OK</span></code></pre>
    </div>

    <!-- 2. FUNCTIONS -->
    <div class="section">
        <span class="category-tag">FUNCTIONS</span>
        <h2>Arrow Functions</h2>
        <p>A shorter syntax for functions. Great for callbacks.</p>
        
        <pre><code><span class="com">// Old Way</span>
<span class="kwd">function</span> <span class="fn">add</span>(a, b) {
  <span class="kwd">return</span> a + b;
}

<span class="com">// New Way (Arrow)</span>
<span class="kwd">const</span> <span class="fn">add</span> = (a, b) => a + b;</code></pre>
    </div>

    <!-- 3. DOM -->
    <div class="section">
        <span class="category-tag">DOM MANIPULATION</span>
        <h2>Interacting with HTML</h2>
        
        <h3>Selecting Elements</h3>
        <pre><code><span class="com">// Select by ID</span>
<span class="kwd">const</span> btn = document.<span class="fn">getElementById</span>(<span class="str">"myBtn"</span>);

<span class="com">// Select CSS Selector (Class, ID, Tag)</span>
<span class="kwd">const</span> title = document.<span class="fn">querySelector</span>(<span class="str">".hero-title"</span>);</code></pre>

        <h3>Event Listeners</h3>
        <pre><code>btn.<span class="fn">addEventListener</span>(<span class="str">"click"</span>, () => {
  console.<span class="fn">log</span>(<span class="str">"Button Clicked!"</span>);
  title.style.color = <span class="str">"red"</span>;
});</code></pre>
    </div>

    <!-- 4. ASYNC -->
    <div class="section">
        <span class="category-tag">ASYNCHRONOUS</span>
        <h2>Async / Await</h2>
        <p>The modern way to handle Promises and API calls. It looks like synchronous code!</p>
        
        <pre><code><span class="kwd">async function</span> <span class="fn">fetchData</span>() {
  <span class="kwd">try</span> {
    <span class="kwd">const</span> response = <span class="kwd">await</span> <span class="fn">fetch</span>(<span class="str">"https://api.example.com/data"</span>);
    <span class="kwd">const</span> data = <span class="kwd">await</span> response.<span class="fn">json</span>();
    console.<span class="fn">log</span>(data);
  } <span class="kwd">catch</span> (error) {
    console.<span class="fn">error</span>(<span class="str">"Error:"</span>, error);
  }
}</code></pre>
    </div>

    <!-- 5. ARRAY METHODS -->
    <div class="section">
        <span class="category-tag">DATA</span>
        <h2>Array Magic</h2>
        <p>Stop writing <code>for</code> loops. Use these powerful methods.</p>
        
        <h3>.map()</h3>
        <p>Transforms elements. Returns a new array.</p>
        <pre><code><span class="kwd">const</span> nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>];
<span class="kwd">const</span> doubled = nums.<span class="fn">map</span>(n => n * <span class="num">2</span>);
<span class="com">// Result: [2, 4, 6]</span></code></pre>

        <h3>.filter()</h3>
        <p>Selects elements that pass a test.</p>
        <pre><code><span class="kwd">const</span> nums = [<span class="num">10</span>, <span class="num">50</span>, <span class="num">5</span>];
<span class="kwd">const</span> big = nums.<span class="fn">filter</span>(n => n > <span class="num">10</span>);
<span class="com">// Result: [50]</span></code></pre>
    </div>

    <!-- 6. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: var(--light);">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation (MDN)</h2>
        <p>The Mozilla Developer Network (MDN) is the bible of JavaScript.</p>
        <p>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" style="display: inline-block; background: var(--dark); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit MDN Web Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Master the language of the web.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "9",
        title: "HTML5 Ultimate Guide",
        type: "PDF Guide",
        category: "Development",
        description: "The complete guide to modern HTML5 tags, semantic structure, and accessibility best practices.",
        iconName: "Layout",
        color: "text-orange-600",
        bg: "bg-orange-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Ultimate Guide</title>
    <style>
        :root { --primary: #e34c26; --dark: #333; --light: #f0f0f0; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        /* Header */
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        /* Sections */
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        p { margin-bottom: 15px; }
        
        /* Categories */
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        /* Code Blocks */
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        /* Syntax Highlight Simulation */
        .tag { color: #e06c75; } /* tag */
        .attr { color: #d19a66; } /* attribute */
        .str { color: #98c379; } /* string */
        .com { color: #7f8fa6; font-style: italic; } /* comment */
        
        /* Tables */
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        th { background-color: var(--light); color: var(--dark); }
        
        /* Link Button */
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
        .btn-link:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <header>
        <h1>🟠 HTML5 Ultimate Guide</h1>
        <p class="subtitle">Structure, Semantics & Accessibility</p>
    </header>

    <!-- 1. STRUCTURE -->
    <div class="section">
        <span class="category-tag">BASICS</span>
        <h2>The Boilerplate</h2>
        <p>Every HTML5 document starts with this structure.</p>
        
        <pre><code><span class="tag">&lt;!DOCTYPE html&gt;</span>
<span class="tag">&lt;html</span> <span class="attr">lang</span>=<span class="str">"en"</span><span class="tag">&gt;</span>
<span class="tag">&lt;head&gt;</span>
    <span class="tag">&lt;meta</span> <span class="attr">charset</span>=<span class="str">"UTF-8"</span><span class="tag">&gt;</span>
    <span class="tag">&lt;meta</span> <span class="attr">name</span>=<span class="str">"viewport"</span> <span class="attr">content</span>=<span class="str">"width=device-width, initial-scale=1.0"</span><span class="tag">&gt;</span>
    <span class="tag">&lt;title&gt;</span>Document<span class="tag">&lt;/title&gt;</span>
<span class="tag">&lt;/head&gt;</span>
<span class="tag">&lt;body&gt;</span>
    <span class="com">&lt;!-- Content goes here --&gt;</span>
<span class="tag">&lt;/body&gt;</span>
<span class="tag">&lt;/html&gt;</span></code></pre>
    </div>

    <!-- 2. SEMANTICS -->
    <div class="section">
        <span class="category-tag">SEMANTICS</span>
        <h2>Semantic Tags</h2>
        <p>Use tags that describe their content for better SEO and Accessibility.</p>
        
        <table>
            <tr>
                <th>Tag</th>
                <th>Description</th>
                <th>Don't Use</th>
            </tr>
            <tr>
                <td><code>&lt;header&gt;</code></td>
                <td>Top section / Navigation</td>
                <td><code>&lt;div id="header"&gt;</code></td>
            </tr>
            <tr>
                <td><code>&lt;nav&gt;</code></td>
                <td>Navigation Links</td>
                <td><code>&lt;div class="nav"&gt;</code></td>
            </tr>
            <tr>
                <td><code>&lt;main&gt;</code></td>
                <td>Primary content</td>
                <td><code>&lt;div id="main"&gt;</code></td>
            </tr>
            <tr>
                <td><code>&lt;article&gt;</code></td>
                <td>Independent content (Blog post)</td>
                <td><code>&lt;div class="post"&gt;</code></td>
            </tr>
             <tr>
                <td><code>&lt;footer&gt;</code></td>
                <td>Copyright, Footer links</td>
                <td><code>&lt;div id="footer"&gt;</code></td>
            </tr>
        </table>
    </div>

    <!-- 3. FORMS -->
    <div class="section">
        <span class="category-tag">INTERACTIVE</span>
        <h2>Forms & Inputs</h2>
        
        <pre><code><span class="tag">&lt;form</span> <span class="attr">action</span>=<span class="str">"/submit"</span><span class="tag">&gt;</span>
    
    <span class="tag">&lt;label</span> <span class="attr">for</span>=<span class="str">"email"</span><span class="tag">&gt;</span>Email:<span class="tag">&lt;/label&gt;</span>
    <span class="tag">&lt;input</span> <span class="attr">type</span>=<span class="str">"email"</span> <span class="attr">id</span>=<span class="str">"email"</span> <span class="attr">required</span> <span class="tag">/&gt;</span>

    <span class="tag">&lt;label</span> <span class="attr">for</span>=<span class="str">"pass"</span><span class="tag">&gt;</span>Password:<span class="tag">&lt;/label&gt;</span>
    <span class="tag">&lt;input</span> <span class="attr">type</span>=<span class="str">"password"</span> <span class="attr">id</span>=<span class="str">"pass"</span> <span class="tag">/&gt;</span>

    <span class="tag">&lt;button</span> <span class="attr">type</span>=<span class="str">"submit"</span><span class="tag">&gt;</span>Login<span class="tag">&lt;/button&gt;</span>

<span class="tag">&lt;/form&gt;</span></code></pre>
    </div>

    <!-- 4. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #fff5f5;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation (MDN)</h2>
        <p>MDN Web Docs is the best place to learn HTML.</p>
        <p>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" class="btn-link">
                Visit MDN HTML Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>The skeleton of the web.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "10",
        title: "CSS3 Ultimate Guide",
        type: "PDF Guide",
        category: "Development",
        description: "Master the art of styling with this guide on Selectors, Flexbox, Grid, and the Box Model.",
        iconName: "Layout",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS3 Ultimate Guide</title>
    <style>
        :root { --primary: #2965f1; --dark: #333; --light: #f0f0f0; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        /* Header */
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        /* Sections */
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        p { margin-bottom: 15px; }
        
        /* Categories */
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        /* Code Blocks */
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        /* Syntax Highlight Simulation */
        .sel { color: #e06c75; } /* selector */
        .prop { color: #d19a66; } /* property */
        .val { color: #98c379; } /* value */
        .com { color: #7f8fa6; font-style: italic; } /* comment */
        
        /* Link Button */
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
        .btn-link:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <header>
        <h1>🔵 CSS3 Ultimate Guide</h1>
        <p class="subtitle">Selectors, Box Model, Flexbox & Grid</p>
    </header>

    <!-- 1. SELECTORS -->
    <div class="section">
        <span class="category-tag">BASICS</span>
        <h2>Common Selectors</h2>
        <p>How to target HTML elements.</p>
        
        <pre><code><span class="com">/* Target by Tag */</span>
<span class="sel">h1</span> { <span class="prop">color</span>: <span class="val">red</span>; }

<span class="com">/* Target by Class (.) */</span>
<span class="sel">.button</span> { <span class="prop">background</span>: <span class="val">blue</span>; }

<span class="com">/* Target by ID (#) */</span>
<span class="sel">#navbar</span> { <span class="prop">height</span>: <span class="val">50px</span>; }

<span class="com">/* Target Children */</span>
<span class="sel">.container > p</span> { <span class="prop">margin</span>: <span class="val">0</span>; }</code></pre>
    </div>

    <!-- 2. BOX MODEL -->
    <div class="section">
        <span class="category-tag">LAYOUT</span>
        <h2>The Box Model</h2>
        <p>Everything in CSS is a box.</p>
        <ul>
            <li><strong>Content:</strong> The text or image.</li>
            <li><strong>Padding:</strong> Space <em>inside</em> the border.</li>
            <li><strong>Border:</strong> The line around the padding.</li>
            <li><strong>Margin:</strong> Space <em>outside</em> the border.</li>
        </ul>
        
        <pre><code><span class="sel">.box</span> {
  <span class="prop">width</span>: <span class="val">200px</span>;
  <span class="prop">padding</span>: <span class="val">20px</span>; <span class="com">/* Inside */</span>
  <span class="prop">border</span>: <span class="val">1px solid black</span>;
  <span class="prop">margin</span>: <span class="val">30px</span>; <span class="com">/* Outside */</span>
}</code></pre>
    </div>

    <!-- 3. FLEXBOX -->
    <div class="section">
        <span class="category-tag">LAYOUT</span>
        <h2>Flexbox (1D Layout)</h2>
        <p>Best for arranging items in a single row or column.</p>
        
        <pre><code><span class="sel">.container</span> {
  <span class="prop">display</span>: <span class="val">flex</span>;
  <span class="prop">justify-content</span>: <span class="val">center</span>; <span class="com">/* Horizontal Align */</span>
  <span class="prop">align-items</span>: <span class="val">center</span>;     <span class="com">/* Vertical Align */</span>
  <span class="prop">gap</span>: <span class="val">1rem</span>;
}</code></pre>
    </div>

    <!-- 4. GRID -->
    <div class="section">
        <span class="category-tag">LAYOUT</span>
        <h2>CSS Grid (2D Layout)</h2>
        <p>Best for complex page layouts with rows AND columns.</p>
        
        <pre><code><span class="sel">.grid</span> {
  <span class="prop">display</span>: <span class="val">grid</span>;
  <span class="prop">grid-template-columns</span>: <span class="val">1fr 1fr 1fr</span>; <span class="com">/* 3 Equal Cols */</span>
  <span class="prop">gap</span>: <span class="val">20px</span>;
}</code></pre>
    </div>

    <!-- 5. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #f0f7ff;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation (MDN)</h2>
        <p>MDN Web Docs is the best place to reference CSS properties.</p>
        <p>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" class="btn-link">
                Visit MDN CSS Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Style the web effectively.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"

    },
    {
        id: "11",
        title: "TypeScript Ultimate Guide",
        type: "PDF Guide",
        category: "Development",
        description: "The essential guide to static typing in JavaScript. Covers Interfaces, Generics, and Utility Types.",
        iconName: "Code",
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Ultimate Guide</title>
    <style>
        :root { --primary: #3178c6; --dark: #333; --light: #f4f7fa; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } 
        .typ { color: #e5c07b; }
        .str { color: #98c379; }
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>🔵 TypeScript Ultimate Guide</h1>
        <p class="subtitle">JavaScript with Superpowers</p>
    </header>

    <div class="section">
        <span class="category-tag">BASICS</span>
        <h2>Basic Types</h2>
        <pre><code><span class="kwd">let</span> isDone: <span class="typ">boolean</span> = <span class="kwd">false</span>;
<span class="kwd">let</span> age: <span class="typ">number</span> = <span class="num">42</span>;
<span class="kwd">let</span> name: <span class="typ">string</span> = <span class="str">"LearnFlow"</span>;
<span class="kwd">let</span> list: <span class="typ">number</span>[] = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>];</code></pre>
    </div>

    <div class="section">
        <span class="category-tag">INTERFACES</span>
        <h2>Interfaces</h2>
        <p>Defining the shape of an object.</p>
        <pre><code><span class="kwd">interface</span> <span class="typ">User</span> {
  id: <span class="typ">number</span>;
  name: <span class="typ">string</span>;
  email?: <span class="typ">string</span>; <span class="com">// Optional</span>
}

<span class="kwd">const</span> user: <span class="typ">User</span> = {
  id: <span class="num">1</span>,
  name: <span class="str">"Alice"</span>
};</code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #f4f7fa;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://www.typescriptlang.org/docs/" target="_blank" class="btn-link">
                Visit TypeScript Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "12",
        title: "Tailwind CSS Cheat Sheet",
        type: "PDF Guide",
        category: "Development",
        description: "Rapidly build modern websites without ever leaving your HTML.",
        iconName: "Layout",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Cheat Sheet</title>
    <style>
        :root { --primary: #06b6d4; --dark: #0f172a; --light: #f0f9ff; --code-bg: #1e293b; --text: #334155; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #64748b; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #0f172a; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .cls { color: #38bdf8; } 
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>🌊 Tailwind CSS Cheat Sheet</h1>
        <p class="subtitle">Utility-First CSS Framework</p>
    </header>

    <div class="section">
        <span class="cat-tag">LAYOUT</span>
        <h2>Flexbox</h2>
        <pre><code><span class="cls">flex</span>          <span class="com">/* display: flex */</span>
<span class="cls">flex-col</span>      <span class="com">/* flex-direction: column */</span>
<span class="cls">items-center</span>  <span class="com">/* align-items: center */</span>
<span class="cls">justify-center</span><span class="com">/* justify-content: center */</span>
<span class="cls">gap-4</span>         <span class="com">/* gap: 1rem */</span></code></pre>
    </div>

    <div class="section">
        <span class="cat-tag">SPACING</span>
        <h2>Padding & Margin</h2>
        <pre><code><span class="cls">p-4</span>   <span class="com">/* padding: 1rem */</span>
<span class="cls">px-4</span>  <span class="com">/* padding-left/right: 1rem */</span>
<span class="cls">py-2</span>  <span class="com">/* padding-top/bottom: 0.5rem */</span>
<span class="cls">m-4</span>   <span class="com">/* margin: 1rem */</span>
<span class="cls">mt-8</span>  <span class="com">/* margin-top: 2rem */</span></code></pre>
    </div>

    <div class="section">
        <span class="cat-tag">COLORS</span>
        <h2>Colors</h2>
        <pre><code><span class="cls">bg-blue-500</span>   <span class="com">/* background-color */</span>
<span class="cls">text-white</span>    <span class="com">/* text-color */</span>
<span class="cls">border-red-500</span><span class="com">/* border-color */</span></code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #f0f9ff;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://tailwindcss.com/docs" target="_blank" class="btn-link">
                Visit Tailwind Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "13",
        title: "Node.js Ultimate Guide",
        type: "PDF Guide",
        category: "Backend",
        description: "A comprehensive guide to Node.js runtime, modules, file system, and building scalable network applications.",
        iconName: "Code",
        color: "text-green-600",
        bg: "bg-green-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js Ultimate Guide</title>
    <style>
        :root { --primary: #339933; --dark: #333; --light: #f4f7fa; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-size: 1.1rem; font-weight: 700; }
        
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } 
        .fn { color: #61dafb; }
        .str { color: #98c379; }
        .com { color: #7f8fa6; font-style: italic; }
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>Node.js Ultimate Guide</h1>
        <p class="subtitle">JavaScript on the Server</p>
    </header>

    <div class="section">
        <span class="category-tag">BASICS</span>
        <h2>What is Node.js?</h2>
        <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side, outside of the browser.</p>
        <ul>
            <li><strong>Non-blocking I/O:</strong> Efficiently handles many connections at once.</li>
            <li><strong>Single-threaded:</strong> Uses an event loop to manage operations.</li>
            <li><strong>NPM:</strong> The largest ecosystem of open source libraries in the world.</li>
        </ul>
    </div>

    <div class="section">
        <span class="category-tag">MODULES</span>
        <h2>CommonJS Modules</h2>
        <p>Node.js uses a module system to organize code.</p>
        <pre><code><span class="com">// Import a module</span>
<span class="kwd">const</span> fs = <span class="fn">require</span>(<span class="str">'fs'</span>);

<span class="com">// Export a module</span>
module.exports = {
  myFunction: () => { ... }
};</code></pre>
    </div>

    <div class="section">
        <span class="category-tag">FILE SYSTEM</span>
        <h2>Reading Files (fs)</h2>
        <pre><code><span class="kwd">const</span> fs = <span class="fn">require</span>(<span class="str">'fs'</span>);

<span class="com">// Read file asynchronously</span>
fs.<span class="fn">readFile</span>(<span class="str">'example.txt'</span>, <span class="str">'utf8'</span>, (err, data) => {
  <span class="kwd">if</span> (err) throw err;
  console.<span class="fn">log</span>(data);
});</code></pre>
    </div>
    
    <div class="section">
        <span class="category-tag">HTTP</span>
        <h2>Basic HTTP Server</h2>
        <pre><code><span class="kwd">const</span> http = <span class="fn">require</span>(<span class="str">'http'</span>);

<span class="kwd">const</span> server = http.<span class="fn">createServer</span>((req, res) => {
  res.statusCode = 200;
  res.setHeader(<span class="str">'Content-Type'</span>, <span class="str">'text/plain'</span>);
  res.end(<span class="str">'Hello World'</span>);
});

server.<span class="fn">listen</span>(3000, () => {
  console.<span class="fn">log</span>(<span class="str">'Server running at http://localhost:3000/'</span>);
});</code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #f4f7fa;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://nodejs.org/en/docs/" target="_blank" class="btn-link">
                Visit Node.js Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "14",
        title: "Express.js Ultimate Guide",
        type: "PDF Guide",
        category: "Backend",
        description: "Fast, unopinionated, minimalist web framework for Node.js. Master routing, middleware, and request handling.",
        iconName: "Layout",
        color: "text-gray-800",
        bg: "bg-gray-800/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express.js Ultimate Guide</title>
    <style>
        :root { --primary: #000000; --dark: #333; --light: #f0f0f0; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } 
        .fn { color: #61dafb; }
        .str { color: #98c379; }
        .com { color: #7f8fa6; font-style: italic; }
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>Express.js Ultimate Guide</h1>
        <p class="subtitle">The Web Framework for Node.js</p>
    </header>

    <div class="section">
        <span class="category-tag">SETUP</span>
        <h2>Hello World</h2>
        <pre><code><span class="kwd">const</span> express = <span class="fn">require</span>(<span class="str">'express'</span>);
<span class="kwd">const</span> app = <span class="fn">express</span>();
<span class="kwd">const</span> port = 3000;

app.<span class="fn">get</span>(<span class="str">'/'</span>, (req, res) => {
  res.<span class="fn">send</span>(<span class="str">'Hello World!'</span>);
});

app.<span class="fn">listen</span>(port, () => {
  console.<span class="fn">log</span>(<span class="str">\`App listening on port \${port}\`</span>);
});</code></pre>
    </div>

    <div class="section">
        <span class="category-tag">ROUTING</span>
        <h2>Basic Routing</h2>
        <p>Routing refers to determining how an application responds to a client request.</p>
        <pre><code><span class="com">// GET method</span>
app.<span class="fn">get</span>(<span class="str">'/users'</span>, (req, res) => {
  res.<span class="fn">send</span>(<span class="str">'Get all users'</span>);
});

<span class="com">// POST method</span>
app.<span class="fn">post</span>(<span class="str">'/users'</span>, (req, res) => {
  res.<span class="fn">send</span>(<span class="str">'Create a user'</span>);
});</code></pre>
    </div>

    <div class="section">
        <span class="category-tag">MIDDLEWARE</span>
        <h2>Middleware</h2>
        <p>Functions that have access to the request (req) and response (res) objects.</p>
        <pre><code><span class="com">// Application-level middleware</span>
app.<span class="fn">use</span>((req, res, next) => {
  console.<span class="fn">log</span>(<span class="str">'Time:'</span>, Date.now());
  <span class="fn">next</span>();
});</code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #f0f0f0;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://expressjs.com/" target="_blank" class="btn-link">
                Visit Express Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "15",
        title: "MongoDB Ultimate Guide",
        type: "PDF Guide",
        category: "Backend",
        description: "Master NoSQL database concepts, collections, documents, and CRUD operations with MongoDB.",
        iconName: "Database",
        color: "text-green-500",
        bg: "bg-green-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MongoDB Ultimate Guide</title>
    <style>
        :root { --primary: #47A248; --dark: #001E2B; --light: #E3FCEF; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .category-tag { display: inline-block; background: var(--dark); color: #00ED64; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } 
        .fn { color: #61dafb; }
        .str { color: #98c379; }
        .com { color: #7f8fa6; font-style: italic; }
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>MongoDB Ultimate Guide</h1>
        <p class="subtitle">The Application Data Platform</p>
    </header>

    <div class="section">
        <span class="category-tag">CONCEPTS</span>
        <h2>NoSQL vs SQL</h2>
        <p>MongoDB is a document database.</p>
        <ul>
            <li><strong>Database:</strong> Container for collections.</li>
            <li><strong>Collection:</strong> Similar to a Table.</li>
            <li><strong>Document:</strong> Similar to a Row (stores data in BSON/JSON).</li>
        </ul>
    </div>

    <div class="section">
        <span class="category-tag">CRUD</span>
        <h2>Basic Operations</h2>
        <p>Common commands in the Mongo Shell.</p>
        
        <h3>Insert</h3>
        <pre><code>db.users.<span class="fn">insertOne</span>({
  name: <span class="str">"Alice"</span>,
  age: 25,
  skills: [<span class="str">"JS"</span>, <span class="str">"Mongo"</span>]
})</code></pre>

        <h3>Find</h3>
        <pre><code><span class="com">// Find all</span>
db.users.<span class="fn">find</span>()

<span class="com">// Find with filter</span>
db.users.<span class="fn">find</span>({ age: { $gt: 20 } })</code></pre>

        <h3>Update</h3>
        <pre><code>db.users.<span class="fn">updateOne</span>(
  { name: <span class="str">"Alice"</span> },
  { $set: { age: 26 } }
)</code></pre>

        <h3>Delete</h3>
        <pre><code>db.users.<span class="fn">deleteOne</span>({ name: <span class="str">"Alice"</span> })</code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #E3FCEF;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://www.mongodb.com/docs/" target="_blank" class="btn-link">
                Visit MongoDB Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "16",
        title: "SQL & Databases Guide",
        type: "PDF Guide",
        category: "Backend",
        description: "The complete guide to Relational Databases, SQL queries, joins, and database design principles.",
        iconName: "Database",
        color: "text-blue-700",
        bg: "bg-blue-700/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Ultimate Guide</title>
    <style>
        :root { --primary: #336791; --dark: #333; --light: #f0f7ff; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: #2c3e50; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .category-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } 
        .fn { color: #61dafb; }
        .str { color: #98c379; }
        .com { color: #7f8fa6; font-style: italic; }
        
        .btn-link { display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <header>
        <h1>SQL Ultimate Guide</h1>
        <p class="subtitle">Structured Query Language</p>
    </header>

    <div class="section">
        <span class="category-tag">BASICS</span>
        <h2>Standard Commands</h2>
        
        <h3>SELECT</h3>
        <pre><code><span class="com">-- Select all columns</span>
<span class="kwd">SELECT</span> * <span class="kwd">FROM</span> users;

<span class="com">-- Select specific columns</span>
<span class="kwd">SELECT</span> name, email <span class="kwd">FROM</span> users;</code></pre>

        <h3>WHERE</h3>
        <pre><code><span class="kwd">SELECT</span> * <span class="kwd">FROM</span> users
<span class="kwd">WHERE</span> age > 18 <span class="kwd">AND</span> active = 1;</code></pre>

        <h3>INSERT</h3>
        <pre><code><span class="kwd">INSERT INTO</span> users (name, email)
<span class="kwd">VALUES</span> (<span class="str">'John'</span>, <span class="str">'john@example.com'</span>);</code></pre>
    </div>

    <div class="section">
        <span class="category-tag">RELATIONSHIPS</span>
        <h2>JOINS</h2>
        <p>Combining rows from two or more tables.</p>
        <pre><code><span class="kwd">SELECT</span> orders.id, users.name
<span class="kwd">FROM</span> orders
<span class="kwd">INNER JOIN</span> users <span class="kwd">ON</span> orders.user_id = users.id;</code></pre>
    </div>

    <div class="section" style="border-left: 5px solid var(--primary); background: #f0f7ff;">
        <span class="category-tag">REFERENCES</span>
        <h2>Official Documentation (PostgreSQL)</h2>
        <p>
            <a href="https://www.postgresql.org/docs/" target="_blank" class="btn-link">
                Visit PostgreSQL Docs ↗
            </a>
        </p>
    </div>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "17",
        title: "Figma Ultimate Guide",
        type: "PDF Guide",
        category: "Design",
        description: "Everything you need to know about Figma: Auto Layout, Components, and Prototyping.",
        iconName: "PenTool",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Figma Ultimate Guide</title>
    <style>
        :root { --primary: #a259ff; --dark: #1e1e1e; --light: #f5f5f5; --text: #333; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--primary); border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-weight: 700; }
        
        .cat-tag { background: var(--dark); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; }
        .key-command { background: #eee; padding: 2px 6px; border-radius: 4px; border: 1px solid #ccc; font-family: monospace; font-weight: bold; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        th { background-color: var(--light); color: var(--dark); }
    </style>
</head>
<body>
    <header>
        <h1>🎨 Figma Ultimate Guide</h1>
        <p class="subtitle">From Wireframes to High-Fidelity Prototypes</p>
    </header>

    <!-- 1. BASICS -->
    <div class="section">
        <span class="cat-tag">FUNDAMENTALS</span>
        <h2>1. The Basics</h2>
        <p>Figma is a vector-based design tool that runs in the browser.</p>
        
        <h3>Essential Shortcuts</h3>
        <table>
            <tr><th>Action</th><th>Windows</th><th>Mac</th></tr>
            <tr><td>Frame</td><td><span class="key-command">F</span></td><td><span class="key-command">F</span></td></tr>
            <tr><td>Text</td><td><span class="key-command">T</span></td><td><span class="key-command">T</span></td></tr>
            <tr><td>Rectangle</td><td><span class="key-command">R</span></td><td><span class="key-command">R</span></td></tr>
            <tr><td>Color Picker</td><td><span class="key-command">I</span></td><td><span class="key-command">I</span></td></tr>
            <tr><td>Duplicate</td><td><span class="key-command">Alt + Drag</span></td><td><span class="key-command">Opt + Drag</span></td></tr>
        </table>
    </div>

    <!-- 2. AUTO LAYOUT -->
    <div class="section">
        <span class="cat-tag">LAYOUT</span>
        <h2>2. Auto Layout</h2>
        <p>Auto Layout adds dynamic padding and reordering to frames. It's like CSS Flexbox for designers.</p>
        <p><strong>Shortcut:</strong> Select items -> <span class="key-command">Shift + A</span></p>
        
        <h3>Properties</h3>
        <ul>
            <li><strong>Direction:</strong> Horizontal arrow (Row) or Vertical arrow (Column).</li>
            <li><strong>Resizing:</strong>
                <ul>
                    <li><em>Fixed Width:</em> Stays the same size.</li>
                    <li><em>Hug Contents:</em> Shrinks to fit children.</li>
                    <li><em>Fill Container:</em> Expands to fill parent.</li>
                </ul>
            </li>
            <li><strong>Gap:</strong> Space between items (e.g., 8px, 16px).</li>
        </ul>
    </div>

    <!-- 3. COMPONENTS -->
    <div class="section">
        <span class="cat-tag">SYSTEMS</span>
        <h2>3. Components & Variants</h2>
        <p>Components are reusable elements. Change the Master Component, and all instances update.</p>
        
        <h3>Creating Components</h3>
        <p>Select object -> Click ❖ icon or <span class="key-command">Ctrl/Cmd + Alt + K</span>.</p>
        
        <h3>Variants</h3>
        <p>Combine multiple components (like Primary, Secondary, Disabled buttons) into a single component set. You can then toggle properties (e.g., Type=Primary, State=Hover) in the sidebar.</p>
    </div>

    <!-- 4. PROTOTYPING -->
    <div class="section">
        <span class="cat-tag">INTERACTION</span>
        <h2>4. Prototyping</h2>
        <p>Turn static designs into clickable flows.</p>
        
        <h3>Smart Animate</h3>
        <p>Figma magically animates changes between frames if the layer names match.</p>
        <ul>
            <li><strong>Slide In:</strong> Good for mobile navigation.</li>
            <li><strong>Dissolve:</strong> Soft transitions.</li>
            <li><strong>Smart Animate:</strong> For morphing buttons, cards expanding, etc.</li>
        </ul>
    </div>

    <!-- 5. PLUGINS -->
    <div class="section">
        <span class="cat-tag">POWER TOOLS</span>
        <h2>5. Essential Plugins</h2>
        <p>Supercharge your workflow with community plugins.</p>
        <ul>
            <li><strong>Unsplash:</strong> Instant free stock photos.</li>
            <li><strong>Iconify:</strong> Thousands of free icons (Material, Feather, etc.).</li>
            <li><strong>Lorem Ipsum:</strong> Generate dummy text instantly.</li>
            <li><strong>Contrast:</strong> Check accessibility contrast ratios.</li>
        </ul>
    </div>

    <!-- 6. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #f5f5f5;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://help.figma.com/" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Figma Help Center ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Design is intelligence made visible.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "18",
        title: "UI/UX Design Principles",
        type: "PDF Guide",
        category: "Design",
        description: "Core principles of good design: Hierarchy, Contrast, Balance, and Usability.",
        iconName: "Layout",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI/UX Design Principles</title>
    <style>
        :root { --primary: #e91e63; --dark: #212121; --text: #333; --light: #fce4ec; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--primary); border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-weight: 700; }
        
        .cat-tag { background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; }
        
        .principle-box { background: var(--light); padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid var(--primary); }
    </style>
</head>
<body>
    <header>
        <h1>✨ UI/UX Principles</h1>
        <p class="subtitle">Creating Interfaces That Work and Wow</p>
    </header>

    <!-- 1. VISUAL HIERARCHY -->
    <div class="section">
        <span class="cat-tag">VISUAL DESIGN</span>
        <h2>1. Visual Hierarchy</h2>
        <p>Hierarchy controls the order in which a user views information.</p>
        
        <h3>Tools of Hierarchy</h3>
        <ul>
            <li><strong>Size:</strong> Users notice larger elements first (Headings > Body).</li>
            <li><strong>Color:</strong> Bright, bold colors attract attention (CTAs).</li>
            <li><strong>White Space:</strong> Surrounding an element with space creates emphasis.</li>
            <li><strong>Z-Pattern:</strong> In low-density pages, eyes move in a 'Z' shape (Logo -> Nav -> CTA).</li>
        </ul>
    </div>

    <!-- 2. GESTALT -->
    <div class="section">
        <span class="cat-tag">PSYCHOLOGY</span>
        <h2>2. Gestalt Principles</h2>
        <p>How our brains group visual information.</p>
        
        <div class="principle-box">
            <strong>Proximity:</strong> Elements close together are perceived as related. (e.g., An image and its caption).
        </div>
        <div class="principle-box">
            <strong>Similarity:</strong> Elements that look alike share the same function. (e.g., All links are blue).
        </div>
        <div class="principle-box">
            <strong>Common Region:</strong> Elements inside a box/border are perceived as a group. (e.g., a Card).
        </div>
    </div>

    <!-- 3. LAWS OF UX -->
    <div class="section">
        <span class="cat-tag">HEURISTICS</span>
        <h2>3. Laws of UX</h2>
        
        <h3>Hick's Law</h3>
        <p>The time it takes to make a decision increases with the number and complexity of choices.</p>
        <p><em>Application:</em> Don't overwhelm users. Break complex forms into steps.</p>

        <h3>Fitts's Law</h3>
        <p>The time to acquire a target is a function of the distance to and size of the target.</p>
        <p><em>Application:</em> Make important buttons big and easy to reach (especially on mobile).</p>
    </div>

    <!-- 4. ACCESSIBILITY -->
    <div class="section">
        <span class="cat-tag">INCLUSIVE DESIGN</span>
        <h2>4. Accessibility (A11y)</h2>
        <p>Designing for everyone, including people with disabilities.</p>
        <ul>
            <li><strong>Contrast:</strong> Ensure a 4.5:1 ratio for normal text.</li>
            <li><strong>Semantic HTML:</strong> Use proper tags (&lt;button&gt; vs &lt;div&gt;) for screen readers.</li>
            <li><strong>Focus States:</strong> Never remove the outline on interactive elements without a replacement.</li>
        </ul>
    </div>

    <!-- 5. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #fce4ec;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://lawsofux.com/" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Laws of UX ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Empathy is the heart of design.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "19",
        title: "Color Theory & Typography",
        type: "PDF Guide",
        category: "Design",
        description: "Master the use of color palettes and font pairings to create stunning designs.",
        iconName: "PenTool",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color & Typography</title>
    <style>
        :root { --primary: #009688; --dark: #263238; --text: #333; --light: #e0f2f1; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--primary); border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-weight: 700; }
        
        .cat-tag { background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; }
        
        .color-demo { display: flex; gap: 10px; margin-top: 10px; }
        .color-box { width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold; }
        
        .type-demo { background: var(--light); padding: 15px; border-radius: 4px; border-left: 4px solid var(--primary); font-family: 'Georgia', serif; }
        .sans-demo { font-family: 'Arial', sans-serif; }
    </style>
</head>
<body>
    <header>
        <h1>🎭 Color & Typography</h1>
        <p class="subtitle">The Art of Visual Communication</p>
    </header>

    <!-- 1. COLOR THEORY -->
    <div class="section">
        <span class="cat-tag">COLOR</span>
        <h2>1. Color Harmonies</h2>
        <p>Formulas for creating pleasing color palettes.</p>
        
        <h3>The 60-30-10 Rule</h3>
        <p>A classic interior design rule applied to UI:</p>
        <div style="display: flex; height: 30px; border-radius: 15px; overflow: hidden; margin: 15px 0;">
            <div style="width: 60%; background: #eee;"></div>
            <div style="width: 30%; background: #009688;"></div>
            <div style="width: 10%; background: #ff5722;"></div>
        </div>
        <ul>
            <li><strong>60% Neutral:</strong> Backgrounds, surface colors (White/Grey).</li>
            <li><strong>30% Primary:</strong> Brand color (Headers, Cards).</li>
            <li><strong>10% Accent:</strong> CTAs, Alerts (Bright Orange/Blue).</li>
        </ul>

        <h3>Color Psychology</h3>
        <div class="color-demo">
            <div class="color-box" style="background: #2196f3;">Trust</div>
            <div class="color-box" style="background: #f44336;">Power</div>
            <div class="color-box" style="background: #4caf50;">Safe</div>
            <div class="color-box" style="background: #ffeb3b; color: #333;">Fun</div>
        </div>
    </div>

    <!-- 2. TYPOGRAPHY -->
    <div class="section">
        <span class="cat-tag">TYPE</span>
        <h2>2. Typography Basics</h2>
        <p>Good type leads the reader through the content.</p>
        
        <h3>Serif vs Sans-Serif</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="type-demo">
                <h3>Serif</h3>
                <p>Traditional, Elegant, Formal.</p>
                <p><em>(e.g., Times New Roman, Playfair)</em></p>
            </div>
            <div class="type-demo sans-demo">
                <h3>Sans-Serif</h3>
                <p>Modern, Clean, Minimal.</p>
                <p><em>(e.g., Helvetica, Inter, Roboto)</em></p>
            </div>
        </div>

        <h3>Type Scales</h3>
        <p>Don't pick random sizes. Use a modular scale (like 1.25 ratio).</p>
        <p style="font-size: 2.441rem; line-height: 1.2;">Heading 1 (2.44rem)</p>
        <p style="font-size: 1.953rem; line-height: 1.2;">Heading 2 (1.95rem)</p>
        <p style="font-size: 1.563rem; line-height: 1.2;">Heading 3 (1.56rem)</p>
        <p style="font-size: 1rem;">Body Text (1rem / 16px)</p>
    </div>

    <!-- 3. ACCESSIBILITY -->
    <div class="section">
        <span class="cat-tag">BEST PRACTICES</span>
        <h2>3. Designing for Readability</h2>
        <ul>
            <li><strong>Line Length:</strong> 45-75 characters per line is optimal for reading.</li>
            <li><strong>Line Height:</strong> Set to 1.5 (150%) for body text for breathing room.</li>
            <li><strong>Contrast:</strong> Ensure grey text isn't too light against a white background.</li>
        </ul>
    </div>

    <!-- 4. OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #e0f2f1;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://m3.material.io/styles/color/overview" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Material Design Color ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
        <p>Master the foundations.</p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "20",
        title: "Python for Data Science",
        type: "PDF Guide",
        category: "Data Science",
        description: "The complete guide to Python libraries: NumPy, Pandas, and Matplotlib.",
        iconName: "FileText",
        color: "text-yellow-600",
        bg: "bg-yellow-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python for Data Science</title>
    <style>
        :root { --primary: #FFD43B; --dark: #306998; --light: #f9f9f9; --code-bg: #282c34; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--dark); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--dark); border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        h3 { color: #444; margin-top: 25px; font-weight: 700; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
        
        pre { background: var(--code-bg); color: #fff; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Consolas', 'Monaco', monospace; margin: 15px 0; }
        code { font-family: inherit; }
        
        .kwd { color: #c678dd; } .fn { color: #61dafb; } .str { color: #98c379; } .com { color: #7f8fa6; font-style: italic; }
    </style>
</head>
<body>
    <header>
        <h1>🐍 Python for Data Science</h1>
        <p class="subtitle">NumPy, Pandas, and Matplotlib</p>
    </header>

    <div class="section">
        <span class="cat-tag">NUMPY</span>
        <h2>1. NumPy Arrays</h2>
        <p>The foundation of scientific computing.</p>
        <pre><code><span class="kwd">import</span> numpy <span class="kwd">as</span> np
<span class="com"># Create array</span>
arr = np.<span class="fn">array</span>([1, 2, 3])
<span class="com"># Math operations</span>
print(arr * 2) <span class="com"># [2, 4, 6]</span></code></pre>
    </div>

    <div class="section">
        <span class="cat-tag">PANDAS</span>
        <h2>2. Pandas DataFrames</h2>
        <p>Working with tabular data.</p>
        <pre><code><span class="kwd">import</span> pandas <span class="kwd">as</span> pd
<span class="com"># Load CSV</span>
df = pd.<span class="fn">read_csv</span>(<span class="str">'data.csv'</span>)
<span class="com"># Inspect data</span>
df.<span class="fn">head</span>()</code></pre>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--dark); background: #f0f7ff;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://pandas.pydata.org/docs/" target="_blank" style="display: inline-block; background: var(--dark); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Pandas Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "21",
        title: "Machine Learning Essentials",
        type: "PDF Guide",
        category: "Data Science",
        description: "Core algorithms: Linear Regression, Decision Trees, and Neural Networks explained.",
        iconName: "Code",
        color: "text-purple-600",
        bg: "bg-purple-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Machine Learning Essentials</title>
    <style>
        :root { --primary: #FF6B6B; --dark: #2D3436; --light: #f9f9f9; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; }
        h2 { color: var(--primary); border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>🤖 Machine Learning</h1>
        <p class="subtitle">From Data to Intelligence</p>
    </header>

    <div class="section">
        <span class="cat-tag">SUPERVISED</span>
        <h2>1. Linear Regression</h2>
        <p>Predicting values (e.g., House Prices) based on input features.</p>
        <p><strong>Formula:</strong> y = mx + c</p>
    </div>

    <div class="section">
        <span class="cat-tag">CLASSIFICATION</span>
        <h2>2. Decision Trees</h2>
        <p>Splitting data into branches to make a decision (e.g., Is this email Spam?).</p>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #fff5f5;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://scikit-learn.org/stable/" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Scikit-Learn Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "22",
        title: "Data Visualization Mastery",
        type: "PDF Guide",
        category: "Data Science",
        description: "Learn to tell stories with data using Matplotlib, Seaborn, and Tableau concepts.",
        iconName: "Layout",
        color: "text-indigo-600",
        bg: "bg-indigo-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization</title>
    <style>
        :root { --primary: #3F51B5; --dark: #333; --light: #f9f9f9; --text: #333; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        
        .section { margin-bottom: 40px; border: 1px solid #e1e4e8; border-radius: 8px; padding: 25px; }
        h2 { color: #333; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>📊 Data Visualization</h1>
        <p class="subtitle">Storytelling with Data</p>
    </header>

    <div class="section">
        <span class="cat-tag">CHARTS</span>
        <h2>Choosing the Right Chart</h2>
        <ul>
            <li><strong>Bar Chart:</strong> Comparing categories.</li>
            <li><strong>Line Chart:</strong> Trends over time.</li>
            <li><strong>Scatter Plot:</strong> Relationships between variables.</li>
        </ul>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #e8eaf6;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://matplotlib.org/" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Matplotlib Docs ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #888; border-top: 1px solid #e1e4e8; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "23",
        title: "Digital Marketing Fundamentals",
        type: "PDF Guide",
        category: "Business",
        description: "Master SEO, Content Marketing, and Social Media strategies to grow any business.",
        iconName: "Target",
        color: "text-red-500",
        bg: "bg-red-500/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Marketing Fundamentals</title>
    <style>
        :root { --primary: #EF4444; --dark: #1F2937; --light: #FEF2F2; --text: #374151; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #6B7280; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #E5E7EB; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--primary); border-bottom: 2px solid #FCA5A5; padding-bottom: 10px; margin-top: 0; }
        h3 { color: #1F2937; margin-top: 25px; font-weight: 700; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>🚀 Digital Marketing</h1>
        <p class="subtitle">Growth Strategies for the Digital Age</p>
    </header>

    <div class="section">
        <span class="cat-tag">SEO</span>
        <h2>1. Search Engine Optimization</h2>
        <p>The art of ranking high on Google without paying for ads.</p>
        <ul>
            <li><strong>Keywords:</strong> What users are typing into search bars.</li>
            <li><strong>On-Page SEO:</strong> Optimizing content, titles, and meta tags.</li>
            <li><strong>Backlinks:</strong> Getting other reputable sites to link to you.</li>
        </ul>
    </div>

    <div class="section">
        <span class="cat-tag">CONTENT</span>
        <h2>2. Content Marketing</h2>
        <p>Creating valuable content to attract and retain an audience.</p>
        <p><em>"Content is King."</em> - Bill Gates</p>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #FEF2F2;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://developers.google.com/search/docs" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Google SEO Guide ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "24",
        title: "Project Management Essentials",
        type: "PDF Guide",
        category: "Business",
        description: "Learn Agile, Scrum, and Kanban methodologies to deliver projects on time.",
        iconName: "Briefcase",
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Management Essentials</title>
    <style>
        :root { --primary: #2563EB; --dark: #1E3A8A; --light: #EFF6FF; --text: #1F2937; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--dark); font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: #6B7280; font-size: 1.2rem; }
        
        .section { margin-bottom: 40px; border: 1px solid #E5E7EB; border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { color: var(--primary); border-bottom: 2px solid #93C5FD; padding-bottom: 10px; margin-top: 0; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>📊 Project Management</h1>
        <p class="subtitle">Agile, Scrum, and Kanban</p>
    </header>

    <div class="section">
        <span class="cat-tag">AGILE</span>
        <h2>1. The Agile Manifesto</h2>
        <p>Iterative development, collaboration, and adaptability over rigid planning.</p>
    </div>

    <div class="section">
        <span class="cat-tag">SCRUM</span>
        <h2>2. Scrum Framework</h2>
        <ul>
            <li><strong>Sprints:</strong> Short, fixed-length work cycles (usually 2 weeks).</li>
            <li><strong>Standups:</strong> Daily 15-minute sync meetings.</li>
            <li><strong>Retrospectives:</strong> Reviewing what went well and what didn't.</li>
        </ul>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #EFF6FF;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://www.atlassian.com/agile" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit Agile Guide ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    },
    {
        id: "25",
        title: "Startup & Entrepreneurship 101",
        type: "PDF Guide",
        category: "Business",
        description: "From idea to IPO: Validating ideas, finding product-market fit, and scaling.",
        iconName: "TrendingUp",
        color: "text-green-600",
        bg: "bg-green-600/10",
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Startup & Entrepreneurship</title>
    <style>
        :root { --primary: #059669; --dark: #064E3B; --light: #ECFDF5; --text: #1F2937; }
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); max-width: 900px; margin: 0 auto; padding: 40px 20px; background-color: #fff; }
        
        header { text-align: center; margin-bottom: 50px; border-bottom: 5px solid var(--primary); padding-bottom: 30px; }
        h1 { color: var(--primary); font-size: 2.5rem; margin-bottom: 10px; }
        
        .section { margin-bottom: 40px; border: 1px solid #E5E7EB; border-radius: 8px; padding: 25px; }
        h2 { color: #065F46; border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-top: 0; }
        
        .cat-tag { display: inline-block; background: var(--dark); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>🚀 Startup 101</h1>
        <p class="subtitle">Building the Future</p>
    </header>

    <div class="section">
        <span class="cat-tag">IDEA</span>
        <h2>1. Validation (The Mom Test)</h2>
        <p>Before building, talk to users through "Customer Discovery". Don't ask if they like your idea; ask about their problems.</p>
    </div>

    <div class="section">
        <span class="cat-tag">MVP</span>
        <h2>2. Minimum Viable Product</h2>
        <p>Build the smallest thing that solves the problem. Focus on value, not features.</p>
    </div>

    <!-- OFFICIAL RESOURCES -->
    <div class="section" style="border-left: 5px solid var(--primary); background: #ECFDF5;">
        <span class="cat-tag">REFERENCES</span>
        <h2>Official Documentation</h2>
        <p>
            <a href="https://www.ycombinator.com/library" target="_blank" style="display: inline-block; background: var(--primary); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Visit YC Library ↗
            </a>
        </p>
    </div>

    <footer style="text-align: center; margin-top: 50px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px;">
        <p><strong>LearnFlow Platform Reference Guide</strong></p>
    </footer>
</body>
</html>
        `,
        extension: "html"
    }
];

export const fetchResources = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resourcesData);
        }, 1500); // Simulate API network latency
    });
};

export const fetchResourceById = (id) => {
    console.log(`[API] Fetching resource by ID: ${id} (${typeof id})`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const resource = resourcesData.find(r => r.id == id);
            if (resource) {
                console.log(`[API] Found resource: ${resource.title}`);
                resolve(resource);
            } else {
                console.error(`[API] Resource not found for ID: ${id}`);
                reject(new Error("Resource not found"));
            }
        }, 500); // Reduced latency for better UX
    });
};
