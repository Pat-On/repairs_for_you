import express from "express";
import morgan from "morgan";
import path from "path";

import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

import bookingRouter from "./routers/bookingRouter";
import offersRouter from "./routers/offersRouter";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(logErrors());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

// our router
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/offers", offersRouter);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;