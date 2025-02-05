import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORG,], 
    credentials: true,
  })
);
// origin: process.env.CORS_ORIGIN,

app.use(express.json({ limit: "99mb" }));
app.use(express.urlencoded({ extended: true, limit: "99mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
console.log("app.js----", process.env.CORS_ORG)


// for testing purposes
app.get("/", (req, res) => res.send("this is a AI Resume Builder"));

//routes import
import userRouter from './routes/user.routes.js'
import templete2Router from './routes/templete2.routes.js'
import portfolioRouter from './routes/portfolio.routes.js'
import websiteRouter from './routes/website.routes.js'




//routes declaration
// http://localhost:8000/api/v1/


app.use("/api/v1/user", userRouter)
app.use("/api/v1/temp", templete2Router)

app.use("/api/v1/portfolio", portfolioRouter)
app.use("/api/v1/websites", websiteRouter)

app.get('/run-cronjob', (req, res) => {
  res.send('Cron job manually triggered and server is running..');
});

export { app }