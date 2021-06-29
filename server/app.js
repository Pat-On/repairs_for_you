import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

import bookingRouter from "./routers/bookingRouter";
import offersRouter from "./routers/offersRouter";
import reviewRouter from "./routers/reviewRouter";
import usersRouter from "./routers/usersRouter";
import handymanRouter from "./routers/handymanRouter";
import quotesRouter from "./routers/quotesRouter";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(logErrors());
app.use(morgan("dev"));
app.use(cors());


if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	console.log(req.headers);
	next();
});

// our router
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/offers", offersRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/users/handyman", handymanRouter);
app.use("/api/quotes", quotesRouter);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;
