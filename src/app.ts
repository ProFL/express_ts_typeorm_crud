import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import DatabaseHandler from "./services/database-handler";

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log("Initializing database connection");
DatabaseHandler.getInstance();

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
