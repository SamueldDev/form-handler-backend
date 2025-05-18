
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

// get the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set up port
const PORT = process.env.PORT || 3000;

const app = express()

// allow cross origin platform 
app.use(cors({
    origin: "https://form-submssion-fullstack.netlify.app/",
    methods: ["POST"]
})); 

// server static files
app.use(express.static('public'))

// middleware to parse data
app.use(express.urlencoded({ extended: true }));


// ensure the data folder exist before handling routes
const dataDir = path.join(__dirname, "data")

try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("✅ 'data' folder created.");
  }
} catch (err) {
  console.error("Failed to create 'data' folder:", err.message);
  process.exit(1); // Stop the app completely due to fatal error
}

// post some formdata
app.post("/submit", (req, res) => {
    
    const {username, email, country, gender } = req.body
    const submission = `Username:${username}, Email:${email}, Country:${country}, Gender:${gender}\n`

    console.log("Received from:", req.body) 

    const filePath = path.join(__dirname, "data", "submission.txt");

        // append the submssion from the frontend to the file
         fs.appendFile(filePath, submission, "utf8", (err) => {
        if(err){
            console.error("Erro saving file:", err.message)
            return res.status(500).send("could not save submission")
        }

         res.status(200).send(`
            <h2>Submission successful!</h2>
            <p>Thank you, ${req.body.email}.</p>
            <a href="/">Back to form</a>
        `);
    })

})

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`) 
})














