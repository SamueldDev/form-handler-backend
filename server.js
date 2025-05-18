

import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || "localhost";


const app = express()

// server static files
app.use(express.static('public'))


// middleware to parse data
app.use(express.urlencoded({ extended: true }));

// post some formdata
app.post("/submit", (req, res) => {
    
    
    const {username, email, country, gender } = req.body
    const submission = `Username:${username}, Email:${email}, Country:${country}, Gender:${gender}\n`

    console.log("Received form:", req.body) 

    const filePath = path.join(__dirname, "data", "submission.txt");

    // Ensure the directory exist
    fs.mkdir(path.join(__dirname, "data"), {recursive: true}, (err) => {
        if(err){
            console.error("Error creating folder:". err.message)
            return res.status(500).send("server error")
        }
    })

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