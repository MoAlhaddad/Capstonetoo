const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const path = require('path');
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/build')));
//Server frontend
if(process.env.NODE_ENV === 'production') {
    app.get("/", (req, res) => res.redirect("/app/"));
    app.get('/app/*', (req, res) => res.sendFile(path.resolve(__dirname, '/build', 'index.html')))
}

app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = { app };
