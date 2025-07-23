# 📚 Book Tracker

A visually catchy, full-stack MERN Book Tracker app to manage your reading list. Add, edit, and track books with a beautiful, responsive UI.

---

## 🚀 Tech Stack
- **MongoDB** (database)
- **Express.js** (backend API)
- **React + Vite** (frontend)
- **Node.js** (runtime)

---

## ✨ Features
- Add, edit, delete, and view books
- Track status: Read, In Progress, Not Started
- Responsive, mobile-friendly design
- Colorful cards and smooth UI

---

## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd Azure-Deployment
   ```

2. **Backend setup:**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT=5000
   # DB_CONNECTION=<your-mongodb-uri>
   npm run dev
   ```

3. **Frontend setup:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Open the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧪 API Endpoints (for Postman)

- `GET    /api/books`         → Get all books
- `POST   /api/books`         → Add a new book
- `PUT    /api/books/:id`     → Update a book
- `DELETE /api/books/:id`     → Delete a book

**Sample POST body:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "pages": 310,
  "status": "Read"
}
```

---

## 📸 Screenshots / Demo

<!-- Add screenshots or GIFs here -->

---

## 💡 Notes
- Make sure MongoDB is running and the connection string is correct.
- Use Postman or similar tools to test API endpoints.
- The frontend uses `/api/books` as the base URL (proxy setup in Vite).

---

## 📝 License
MIT 