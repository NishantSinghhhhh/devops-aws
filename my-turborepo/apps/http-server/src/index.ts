import express from "express";
import { client } from '@repo/db/client';
// You would also import a hashing library
// import bcrypt from 'bcrypt';

const app = express();

// 1. Add the JSON middleware to parse request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hii there ");
});

// 2. Change the route to app.post() and make it an async function
app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // Basic validation (you should add more)
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // 4. (Security) Hash the password before storing it
        // const hashedPassword = await bcrypt.hash(password, 10);

        // 3. await the asynchronous database call
        const user = await client.user.create({
            data: {
                username: username,
                // Store the hashed password, not the plain one
                password: password // In a real app: password: hashedPassword
            }
        });

        res.status(201).json({
            message: "SignUp successful",
            // The user object is now available from the 'await'
            id: user.id
        });

    } catch (error) {
        // Add basic error handling
        console.error(error);
        res.status(500).json({ message: "An error occurred during signup." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});