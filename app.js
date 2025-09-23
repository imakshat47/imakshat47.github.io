// Code snippets for typewriter animation
const codeSnippets = [
    `import torch
import transformers
from transformers import AutoModel, AutoTokenizer

# Load healthcare-specific BERT model
model = AutoModel.from_pretrained('dmis-lab/biobert-v1.1')
tokenizer = AutoTokenizer.from_pretrained('dmis-lab/biobert-v1.1')

# Process clinical text
clinical_text = "Patient presents with chest pain and shortness of breath"
inputs = tokenizer(clinical_text, return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state

print(f"Clinical embeddings shape: {embeddings.shape}")`,

    `from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# Initialize LLM for medical consultation
llm = OpenAI(temperature=0.3, model_name="gpt-4")
memory = ConversationBufferMemory()
conversation = ConversationChain(llm=llm, memory=memory)

# Process patient query
patient_query = "What are the symptoms of diabetes?"
response = conversation.predict(input=patient_query)

print(f"Medical AI Response: {response}")`,

    `import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load EHR dataset
ehr_data = pd.read_csv('patient_data.csv')
X = ehr_data[['age', 'bmi', 'glucose_level', 'blood_pressure']]
y = ehr_data['diabetes_risk']

# Train predictive model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model for deployment
joblib.dump(model, 'diabetes_risk_model.pkl')
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.3f}")`,

    `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# Build neural network for medical image analysis
model = keras.Sequential([
    layers.Conv2D(32, 3, activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

print("Medical imaging model compiled successfully")`,

    `from pyspark.sql import SparkSession
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression

# Initialize Spark for big data processing
spark = SparkSession.builder.appName("HealthcareAnalytics").getOrCreate()

# Load large-scale health dataset
health_df = spark.read.csv("hdfs://health_records.csv", header=True)

# Prepare features for ML
assembler = VectorAssembler(
    inputCols=["age", "weight", "height", "heart_rate"],
    outputCol="features"
)

# Train distributed ML model
lr = LogisticRegression(featuresCol="features", labelCol="diagnosis")
model = lr.fit(health_df)

print("Distributed healthcare ML model trained")`,

    `import asyncio
import aiohttp
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Healthcare AI API")

class PatientData(BaseModel):
    symptoms: str
    age: int
    medical_history: list

@app.post("/diagnose")
async def ai_diagnosis(patient: PatientData):
    # AI-powered diagnosis logic
    diagnosis_model = await load_medical_model()
    
    prediction = diagnosis_model.predict(
        symptoms=patient.symptoms,
        demographics={"age": patient.age}
    )
    
    return {
        "diagnosis": prediction.diagnosis,
        "confidence": prediction.confidence,
        "recommendations": prediction.treatment_plan
    }

print("Healthcare AI API initialized")`
];

// Neural Network Canvas Animation
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        this.isActive = true;
        
        this.colors = {
            primary: '#3b82f6',
            secondary: '#1e40af',
            accent: '#8b5cf6',
            success: '#22c55e'
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    createNodes() {
        this.nodes = [];
        const nodeCount = Math.min(30, Math.floor((this.width * this.height) / 20000));
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                activity: 0,
                color: this.colors.primary,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = Math.min(120, this.width * 0.12);
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        nodeA: i,
                        nodeB: j,
                        opacity: (maxDistance - distance) / maxDistance * 0.4,
                        activity: 0
                    });
                }
            }
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x <= 0 || node.x >= this.width) node.vx *= -0.8;
            if (node.y <= 0 || node.y >= this.height) node.vy *= -0.8;
            
            node.x = Math.max(5, Math.min(this.width - 5, node.x));
            node.y = Math.max(5, Math.min(this.height - 5, node.y));
            
            node.activity *= 0.95;
            node.pulsePhase += 0.02;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const nodeA = this.nodes[conn.nodeA];
            const nodeB = this.nodes[conn.nodeB];
            
            const opacity = conn.opacity * 0.6;
            this.ctx.strokeStyle = nodeA.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const pulseOpacity = Math.sin(node.pulsePhase) * 0.1 + 0.1;
            const totalOpacity = Math.min(0.8, node.opacity + pulseOpacity + node.activity);
            
            // Node glow
            if (node.activity > 0.1) {
                const glowRadius = node.radius + 6;
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, glowRadius
                );
                gradient.addColorStop(0, node.color + '40');
                gradient.addColorStop(1, node.color + '00');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Node core
            this.ctx.fillStyle = node.color + Math.floor(totalOpacity * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!this.isActive) return;
        
        this.updateNodes();
        this.draw();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    pause() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    resume() {
        this.isActive = true;
        this.animate();
    }
    
    destroy() {
        this.pause();
        this.nodes = [];
        this.connections = [];
    }
}

// Typewriter Animation Class
class TypewriterAnimation {
    constructor(element, snippets) {
        this.element = element;
        this.snippets = snippets;
        this.currentSnippet = 0;
        this.currentChar = 0;
        this.isTyping = true;
        this.isDeleting = false;
        this.typeSpeed = 50;
        this.deleteSpeed = 20;
        this.pauseDuration = 3000;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const snippet = this.snippets[this.currentSnippet];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = snippet.substring(0, this.currentChar - 1);
            this.currentChar--;
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentSnippet = (this.currentSnippet + 1) % this.snippets.length;
                setTimeout(() => this.type(), 500);
                return;
            }
            
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Typing characters
            this.element.textContent = snippet.substring(0, this.currentChar + 1);
            this.currentChar++;
            
            if (this.currentChar === snippet.length) {
                // Finished typing, wait then start deleting
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseDuration);
                return;
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        }
    }
}

// Smooth Scroll Function
function smoothScrollTo(targetElement) {
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Navigation Class
class Navigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }
        
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();
                this.handleNavClick(link);
            });
        });
        
        // Hero buttons navigation
        document.querySelectorAll('[data-section]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = button.getAttribute('data-section');
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    smoothScrollTo(targetSection);
                    this.updateActiveLink(sectionId);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu && !this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Scroll effects and active link highlighting
        this.setupScrollEffects();
        this.setupActiveLinks();
    }
    
    toggleMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        }
    }
    
    closeMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
    }
    
    handleNavClick(link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                smoothScrollTo(targetSection);
                this.updateActiveLink(sectionId);
            }
        }
    }
    
    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupScrollEffects() {
        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Navbar background on scroll
            if (this.navbar) {
                if (currentScrollY > 50) {
                    this.navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                    this.navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
                } else {
                    this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                    this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 150;
            let activeSection = null;
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = section.id;
                }
            });
            
            if (activeSection) {
                this.updateActiveLink(activeSection);
            }
        };
        
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial call
    }
}

// Animation Utils
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .experience-card, .project-card, .professional-link'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });
    
    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach((stat, index) => {
                    const finalValue = stat.textContent;
                    const numValue = parseInt(finalValue);
                    
                    if (!isNaN(numValue)) {
                        animateCounter(stat, 0, numValue, 2000 + (index * 200), finalValue.includes('+'));
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }
}

function animateCounter(element, start, end, duration, hasPlus) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = currentValue + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Button Interactions
function setupButtonInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't prevent default for actual links
            if (this.hasAttribute('href') && this.getAttribute('href').startsWith('http')) {
                return;
            }
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-effect {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Neural network visibility optimization
    const heroSection = document.getElementById('home');
    let neuralNetwork = null;
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!neuralNetwork && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const canvas = document.getElementById('neural-canvas');
                    if (canvas) {
                        neuralNetwork = new NeuralNetwork(canvas);
                        window.neuralNetwork = neuralNetwork;
                    }
                }
                if (neuralNetwork) {
                    neuralNetwork.resume();
                }
            } else {
                if (neuralNetwork) {
                    neuralNetwork.pause();
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Page visibility handling
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (neuralNetwork) {
                neuralNetwork.pause();
            }
        } else {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                if (neuralNetwork) {
                    neuralNetwork.resume();
                }
            }
        }
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
        if (neuralNetwork) {
            neuralNetwork.resize();
            neuralNetwork.createNodes();
            neuralNetwork.createConnections();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Initializing...');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize core systems
    const navigation = new Navigation();
    
    // Initialize typewriter animation
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement && !prefersReducedMotion) {
        console.log('🔤 Initializing typewriter animation...');
        new TypewriterAnimation(typewriterElement, codeSnippets);
    }
    
    // Setup animations and interactions
    setupAnimations();
    setupButtonInteractions();
    setupPerformanceOptimizations();
    
    // Email functionality logging
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('📧 Email link clicked');
        });
    });
    
    // External link handling
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('🔗 External link clicked:', link.href);
        });
    });
    
    // Loading complete
    setTimeout(() => {
        console.log('✅ Portfolio Online');
        document.body.classList.add('loaded');
    }, 1000);
    
    // Easter egg for 'AI' key sequence
    let keySequence = [];
    const aiSequence = [65, 73]; // A, I keys
    
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.keyCode);
        if (keySequence.length > aiSequence.length) {
            keySequence.shift();
        }
        
        if (JSON.stringify(keySequence) === JSON.stringify(aiSequence)) {
            console.log('🧠 AI Neural System Activated!');
            // Trigger special neural activity
            if (window.neuralNetwork) {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const randomNode = Math.floor(Math.random() * window.neuralNetwork.nodes.length);
                        if (window.neuralNetwork.nodes[randomNode]) {
                            window.neuralNetwork.nodes[randomNode].activity = 1;
                        }
                    }, i * 100);
                }
            }
        }
    });
});