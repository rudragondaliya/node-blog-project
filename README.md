---
# 📝 Node Blog Project

A fully functional blogging platform built with **Node.js**, **Express**, **EJS**, and **MongoDB**, featuring user authentication, session handling, and blog post management.
Live Demo: **[Click Here](https://node-blog-project-rx8w.onrender.com/)**

---

## 📌 Features

* User registration and login
* Session-based authentication (using `express-session` & `connect-mongo`)
* Create, edit, delete blog posts
* Image upload support
* Responsive EJS-based UI
* MongoDB for data storage

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js
**Frontend:** EJS templating engine
**Database:** MongoDB (with Mongoose)
**Auth:** express-session, connect-mongo
**Other:** dotenv, body-parser, multer (for uploads)

---

## 🚀 Live Demo

🔗 **[https://node-blog-project-rx8w.onrender.com/](https://node-blog-project-rx8w.onrender.com/)**

---

## 📂 Project Structure

```
.
├── config/
│   └── db.js            # MongoDB connection
├── models/              # Mongoose models (User, Blog, etc.)
├── routers/             # Route definitions
├── uploads/             # Uploaded images
├── views/               # EJS templates
├── public/              # Static files (CSS, JS)
├── server.js            # Main entry point
├── package.json
└── .env
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:

   ```env
   MONGO_URL=mongodb+srv://<your-mongo-uri>
   SESSION_SECRET=your-secret-key
   PORT=8003
   ```

4. **Run the application**

   ```bash
   npm start
   ```

   Visit: `http://localhost:8003`

---

## 📜 Available Scripts

* `npm start` → Run server in production mode
* `npm run dev` → Run server with nodemon (if configured)

---

## 🔐 Authentication

* Users remain logged in via sessions stored in MongoDB.
* To log out: visit `/logout`.

---

## 📸 Screenshots (Optional)

*Add screenshots of your home page, blog list, and create post form here.*

---

## 📄 License

This project is open-source under the **MIT License**.
---
