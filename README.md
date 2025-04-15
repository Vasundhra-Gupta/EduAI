# 📚 EduAI – Smart Doubt Resolution System

EduAI is an AI-powered web platform enabling real-time student doubt resolution and personalized test generation for teachers

---

# 🔗 Prototype 
[EduAI.com](https://pragati-eduai.onrender.com)

## 🖥 Frontend – React.js, Chart.js

- Built with **React.js** for a responsive student-teacher interface  
- **Chart.js** for interactive analytics visualizations  
- Students submit doubts; teachers track engagement and assign AI-curated tests

---

## 🔁 Backend & APIs – Node.js, Express.js

- RESTful API built with **Node.js** & **Express.js**
- Handles sessions, doubts, and topic mapping

### API Routes

## Live session view
### GET /        
![Live Session](https://res.cloudinary.com/dwcne31bv/image/upload/v1743887629/kbn75hj6d9buoznwxauh.png) 

### AI suggested polls
![Auto Suggested Poll](https://res.cloudinary.com/dwcne31bv/image/upload/v1743887396/wgwgyurigahdjabfbo2k.png) 

## AI-generated test
### GET /test    
![Generated Test](https://res.cloudinary.com/dwcne31bv/image/upload/v1743887371/zlvk2ajwiw62mpl4orzr.png) 

## Post-session analysis report
### GET /post    
![Post Analysis](https://res.cloudinary.com/dwcne31bv/image/upload/v1743887375/sw3193xf53x7xolisqvg.png) 
---

## 🧠 AI/ML Engine – SBERT, FAISS, T5, RoBERTa, Hydra

- SBERT + FAISS + PyTorch: Semantic clustering of doubts.
- T5 + TensorFlow : Generates test questions.
- RoBERTa: Subject-wise classification.
- Hydra: Suggests concept re-explanations based on feedback.

---

## 🗃 Database – MongoDB

- Stores doubts, sessions, feedback, and generated content.
- Optimized for flexible schema and analytics queries.

---

## ☁ Cloud Infrastructure – Google Cloud Platform

- APIs & AI services hosted with load balancing and auto-scaling.
- Cloud storage supports image/media-based doubt inputs.

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```
npm install
```

#### Run Server
```
npm run dev
```

#### Build for Production
```
npm run build
```