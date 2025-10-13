# 💻 CodeQuest: A Real-Time Collaborative DSA Platform

## 🌟 Hosted Link

Experience the application live:
[codequest-rose.vercel.app/](https://codequest-rose.vercel.app/)

---

## 📝 Description

**CodeQuest** is a full-stack platform built for **collaborative questions solving environment**. It goes beyond traditional coding environments by offering a **real-time collaborative coding experience** coupled with **integrated voice communication**. Users can create private rooms, connect with peers, work on the same problem simultaneously, and discuss their approach voice chat, making it an ideal tool for pair programming, mock interviews, and group study sessions.

---

## ✨ Features

- **Collaborative Coding Rooms:** Users can join rooms to work on DSA problems together in a synchronized environment.
- **Integrated Code Editor & Compiler:** A built-in code editor (using `react-simple-code-editor`) with **real-time compilation and execution** capabilities, powered by the **Judge0 API**.
- **Real-Time Code Sync:** The entire coding session is synchronized across all users in the room using **Socket.io**, ensuring everyone sees the exact same code instantly.
- **WebRTC Voice Chat:** Seamless **peer-to-peer (P2P) voice chat** is enabled via **WebRTC**, allowing for high-quality audio communication directly within the coding room.
- **User Authentication:** Secure sign-up and login for personalized access and room management.

---

## 🛠️ Tech Stack

This project is built using a modern, scalable, and real-time capable stack.

| Category | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | Building the user interface. |
| **Code Editor** | `react-simple-code-editor` | Providing the functional, syntax-highlighted coding area. |
| **Real-Time Sync** | **Socket.io** | Managing low-latency, bi-directional event-based communication for code syncing. |
| **Voice Chat** | **WebRTC** | Enabling P2P voice chat. |
| **Compiler** | **Judge0 API** | The execution engine to compile code. |
| **Backend** | **Node.js** & **Express.js** | The server-side runtime and RESTful API framework, managing rooms and users. |
| **Database** | **MongoDB** | Data storage for users. |

---
