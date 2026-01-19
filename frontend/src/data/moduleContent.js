
export const moduleContent = {
    1: {
        title: "Module 1: The Raw Materials",
        subtitle: "HTML, CSS, & JavaScript 🧱",
        description: "The three layers of the web.",
        mentalModel: {
            title: "The Building Analogy",
            explanation: "A website is like a physical bank branch.",
            points: [
                "HTML (Structure): The concrete, walls, and doors. (Ugly but functional).",
                "CSS (Presentation): The paint, carpet, and branding. (Look & Feel).",
                "JavaScript (Behavior): The automatic doors and security cameras. (Interactivity)."
            ]
        },
        realWorldExample: {
            product: "The Login Button",
            explanation: "How code creates a button:",
            points: [
                "HTML: <button>Login</button> (Just a grey box).",
                "CSS: button { color: blue } (Makes it pretty).",
                "JS: button.onClick = login() (Makes it work)."
            ]
        }
    },
    2: {
        title: "Module 2: The Browser & DOM",
        subtitle: "The Lens 🖥️",
        description: "How code becomes pixels.",
        mentalModel: {
            title: "The Painter",
            explanation: "Your code is just text. The Browser is the artist.",
            points: [
                "Parsing: Reading your HTML text.",
                "DOM Tree: Organizing elements into a family tree.",
                "Rendering: Painting the pixels on the screen."
            ]
        },
        realWorldExample: {
            product: "Inspect Element",
            explanation: "Right-click any website.",
            points: [
                "You are seeing the DOM, not the source code.",
                "You can delete the 'Password' field interactively because you are editing the live Tree."
            ]
        }
    },
    3: {
        title: "Module 3: Modern Frameworks (React)",
        subtitle: "The High-Speed Kiosk ⚛️",
        description: "Why we don't just use plain HTML anymore.",
        mentalModel: {
            title: "The Component",
            explanation: "Lego Blocks vs. Clay.",
            points: [
                "Old Web (Clay): Molds the whole page every time.",
                "React (Legos): Re-uses the 'Button' block in 50 places.",
                "Virtual DOM: Only updates the one line of text that changed."
            ]
        },
        realWorldExample: {
            product: "Facebook / Instagram",
            explanation: "Infinite scrolling.",
            points: [
                "When you scroll, it doesn't reload the page. It just snaps new 'Post Blocks' onto the bottom."
            ]
        }
    },
    4: {
        title: "Module 4: Mobile & Apps",
        subtitle: "Pocket Banking 📱",
        description: "Native vs. Web.",
        mentalModel: {
            title: "The Translator",
            explanation: "Different languages for different devices.",
            points: [
                "Web (React): Speaks Browser.",
                "iOS (Swift): Speaks iPhone.",
                "React Native: Speaks both (kind of)."
            ]
        },
        realWorldExample: {
            product: "Uber App",
            explanation: "Why not just use the website?",
            points: [
                "Access to GPS, Camera, and Push Notifications.",
                "Smoother animations (60fps)."
            ]
        }
    },
    5: {
        title: "Module 5: APIs & Communication",
        subtitle: "The Teller Window 🗣️",
        description: "How Client talks to Server.",
        mentalModel: {
            title: "The Order Slip",
            explanation: "API Requests.",
            points: [
                "GET: 'Show me the menu'.",
                "POST: 'I want to order a burger'.",
                "404: 'We don't serve pizza'."
            ]
        },
        realWorldExample: {
            product: "Weather App",
            explanation: "It doesn't measure the temp.",
            points: [
                "It asks api.weather.com 'What is the temp in NY?'"
            ]
        }
    },
    6: {
        title: "Module 6: Authentication",
        subtitle: "The Armed Guard 👮",
        description: "Security & Identity.",
        mentalModel: {
            title: "The Wristband",
            explanation: "Session Tokens.",
            points: [
                "Login: Checking your ID.",
                "Token: The Guard gives you a wristband.",
                "Access: You show the wristband at every ride (Page)."
            ]
        },
        realWorldExample: {
            product: "Google Login",
            explanation: "OAuth.",
            points: [
                "Google vouches for you so you don't need a new password for every site."
            ]
        }
    },
    7: {
        title: "Module 7: Databases",
        subtitle: "The Ledger 📒",
        description: "Persistent Memory.",
        mentalModel: {
            title: "The Filing Cabinet",
            explanation: "Structured vs. Unstructured.",
            points: [
                "SQL (Excel Sheets): Rows and Columns. Strict.",
                "NoSQL (Docs): A folder of sticky notes. Flexible."
            ]
        },
        realWorldExample: {
            product: "Wikipedia",
            explanation: "Content Storage.",
            points: [
                "Every edit is a new row in the database history."
            ]
        }
    },
    8: {
        title: "Module 8: Server Logic",
        subtitle: "The Back Office ⚙️",
        description: "Business Rules.",
        mentalModel: {
            title: "The Chef",
            explanation: "The Waiter (API) just brings the food.",
            points: [
                "The Chef (Server) cooks it, checks for allergies (Validation), and plates it."
            ]
        },
        realWorldExample: {
            product: "Uber Pricing",
            explanation: "Logic.",
            points: [
                "If raining AND high demand -> 2x Price (Surge Logic)."
            ]
        }
    },
    9: {
        title: "Module 9: Cloud & DevOps",
        subtitle: "The Global Network ☁️",
        description: "Where the code lives.",
        mentalModel: {
            title: "Renting Computers",
            explanation: "The Cloud.",
            points: [
                "You don't buy a server. You rent seconds of compute from Amazon."
            ]
        },
        realWorldExample: {
            product: "Netflix Global",
            explanation: "CDN.",
            points: [
                "The movie is stored on a server in YOUR city, not in Hollywood."
            ]
        }
    },
    10: {
        title: "Module 10: AI & Future",
        subtitle: "The Robo-Advisor 🤖",
        description: "Smart Software.",
        mentalModel: {
            title: "Probabilistic Computing",
            explanation: "Maybe results.",
            points: [
                "Standard Code: 1+1=2.",
                "AI: 1+1 is probably 2, but could be 'Window'."
            ]
        },
        realWorldExample: {
            product: "ChatGPT",
            explanation: "Predicting text.",
            points: [
                "It doesn't know facts. It knows which word likely comes next."
            ]
        }
    },
    11: {
        title: "Module 11: System Design",
        subtitle: "Architecture & Scale �️",
        description: "Designing for Requirements.",
        mentalModel: {
            title: "The Blueprint",
            explanation: "Planning the city before building the houses.",
            points: [
                "Architecture: Gateway -> LB -> Service -> DB.",
                "Scalability: Handling Black Friday traffic (TPS).",
                "CAP Theorem: The trade-off between Reliability and Availability."
            ]
        },
        realWorldExample: {
            product: "The ATM Network",
            explanation: "Why withdrawals sometimes fail.",
            points: [
                "To prevent you from withdrawing $100 twice, the system prioritizes Consistency (Safety) over Availability (Uptime)."
            ]
        }
    },
    12: {
        title: "Module 12: Environments",
        subtitle: "The Pipeline 🧪",
        description: "Dev, Staging, & Prod.",
        mentalModel: {
            title: "The Dress Rehearsal",
            explanation: "Don't practice on stage.",
            points: [
                "Dev: The Kitchen (Messy, Experimental).",
                "Staging: The Rehearsal (Exact copy of the stage).",
                "Prod: Opening Night (Must be perfect)."
            ]
        },
        realWorldExample: {
            product: "Instagram TestFlight",
            explanation: "Beta Testing.",
            points: [
                "Employees get the 'Staging' app to catch bugs before they update YOUR app."
            ]
        }
    }
};
