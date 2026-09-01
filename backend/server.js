import "./load-env.js";
import { app } from "./app.js";

// PORT ON WHICH APPLICATION RUNS
const PORT = process.env.PORT || 8000; 

// LISTENING TO THE PORT
app.listen(PORT, (req, res, next) => {
    console.log(`Server is running on the ${PORT}`)
})