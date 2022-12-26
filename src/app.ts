import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config";
import * as path from "path";
import logger from "morgan";
import express from "express";
import cors  from "cors";
import { corsOptions } from "./config/cors.config";
import APIRouter from "./routes/api.routes";
import os from "os";
import http from 'http';
import { Server } from 'socket.io';

(<any>process.env.UV_THREADPOOL_SIZE) = os.cpus().length;

const app = express();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

export const io = new Server(server);

export const runningApp = async () => {
	await connectDB();
	app.set("port", port);
	app.set("view engine", "pug");
	app.use(express.urlencoded({ limit: "5000mb", extended: true, parameterLimit: 500000 }));
	app.use(express.json({limit: '5000mb'}));
	app.use(cors(corsOptions));
	app.use(logger("dev"));

	app.use("/", APIRouter);

	server.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});

	
};
