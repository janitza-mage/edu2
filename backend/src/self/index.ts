import "source-map-support/register";
import express from "express";
import cors from "cors";
import nocache from "nocache";
import {registerApis} from "./api/registerApis";

const expressApp = express();
expressApp.set("etag", false);
expressApp.disable("x-powered-by");
expressApp.use(cors({ maxAge: 86400 }));
expressApp.use(nocache());
expressApp.use((_, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  res.setHeader("X-Frame-Options", "DENY");
  // TODO res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});
expressApp.use(express.json({ limit: "10mb" }));
registerApis(expressApp);
expressApp.listen(8080);
