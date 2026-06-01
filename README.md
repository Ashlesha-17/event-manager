# 📅 Event Manager

A full-stack event management web application that allows users to create, join, and manage events. Built with React, Node.js, Express, and MongoDB.

🌐 **Live Demo:** [event-manager-flame-alpha.vercel.app](https://event-manager-flame-alpha.vercel.app)

---

## ✨ Features

- **Authentication** – User signup and login with JWT
- **Create Events** – Add new events with details
- **Browse Events** – View all available events
- **Event Details** – See full information about any event
- **Join Events** – Register your attendance for events
- **My Events** – View events you've created or joined
- **Responsive UI** – Clean, styled interface across all pages

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| CSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | HTTP Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |

---

## 📁 Project Structure

```
event-manager/
├── backend/
│   ├── models/
│   │   ├── event.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── events.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── auth.css
│   │   │   ├── createEvent.css / createEvent.jsx
│   │   │   ├── eventDetails.jsx
│   │   │   ├── home.css / home.jsx
│   │   │   ├── joinedEvents.css / joinedEvents.jsx
│   │   │   ├── joinEvent.css / joinEvent.jsx
│   │   │   ├── login.jsx
│   │   │   ├── myEvents.css / myEvents.jsx
│   │   │   └── signup.jsx
│   │   ├── App.css / App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── index.html
```

---

## ⚙️ Environment Variables

### Frontend — `frontend/.env`

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🚀 Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How It Works

1. User signs up or logs in — JWT token is stored for auth
2. Authenticated users can create new events
3. All users can browse and view event details
4. Users can join events and track them under "Joined Events"
5. "My Events" shows all events created by the logged-in user

---

## 🚢 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** can be deployed on [Render](https://render.com) or [Railway](https://railway.app)

> Set `REACT_APP_BACKEND_URL` to your deployed backend URL before deploying the frontend.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 👩‍💻 Author

**Ashlesha** — [github.com/Ashlesha-17](https://github.com/Ashlesha-17)
