import { app } from "./app.js"
import dotenv from "dotenv";

dotenv.config();

// PORT ON WHICH APPLICATION RUNS
const PORT = process.env.PORT || 8000; 

// LISTENING TO THE PORT
app.listen(PORT, (req, res, next) => {
    console.log(`Server is running on the ${PORT}`)
})