import express from "express"
import performancesRoutes from "./routes/performancesRoutes.js"
import usersRoutes from "./routes/usersRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000




// middleware
app.use(express.json());
app.use(cors());

app.use("/api/performances", performancesRoutes);
app.use("/api/users", usersRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
});
