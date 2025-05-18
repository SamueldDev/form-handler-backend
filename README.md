

# Form Submission Backend (Node.js + Express)

This is the backend for a simple form submission app. It receives form data from the frontend and saves it to a text file. Deployed using [Railway]

## 🔌 API Endpoint

- `POST /submit` — Accepts form data and appends it to a file

## 🌐 Live API

👉 [Deployed on Railway](https://your-backend.up.railway.app/submit)

> Replace the above link with your actual Railway backend URL.

## 🛠️ Tech Stack

- Node.js
- Express
- File System (`fs`)
- CORS
- Railway (Deployment)


## 🔧 Setup Instructions (Local Development)

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file:
PORT=yourdesiredport

4. Run the server:
```bash
npm start

Test with Postman or from the frontend:

Endpoint: http://localhost:yourdesiredport/submit

Method: POST

Body: x-www-form-urlencoded or application/json

📂 Data Storage
Submissions are saved to:
/data/submission.txt


Each line includes:
Username:..., Email:..., Country:..., Gender:...


🔒 CORS Policy
The backend allows requests from:

https://form-submssion-fullstack.netlify.app
Change this in server.js if your frontend URL differs.

🤝 Acknowledgments
Created for educational purposes — demonstrating full-stack deployment using Railway and Netlify.

