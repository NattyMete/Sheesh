import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
// import multer from "multer"
import path from "path"
import helmet from "helmet"
import morgan from "morgan"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
// import { register } from "./routes/auth.js" 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
console.log(__dirname);
const corsOptions = {
    exposedHeaders: ['x-auth-token'],
  };
dotenv.config();
const app = express();
// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

  
// File storage
// const storage  = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/assets")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }});
// const upload = multer({storage});

// Routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
// Mongoose
const port = process.env.PORT || 3001;
mongoose.connect('mongodb://127.0.0.1:27017/SpaceBook')
        .then(() => console.info('Connected to MongoDB...'))
        .then(() => app.listen(port, () => console.log(`Listening on port ${port}...`)));
