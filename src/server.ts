import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import SwaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import * as fs from "fs";
import * as yaml from "yaml";
import connectDB from "./app/config/db.config";
import { AuthRouter } from "./app/routes/auth.router";
dotenv.config({ path: ".env-dev" });
import cookieParser from "cookie-parser";

import { notFound, errorHandler } from "./app/middlewares/errorMiddleware";

// Create an Express application
const app: Application = express();
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    try {
      // Load and parse the OpenAPI specification from the YAML file
      const yamlFile = fs.readFileSync(
        path.join(__dirname, "public", "swagger", "openapi.yaml"),
        "utf8"
      );
      const swaggerDocument = yaml.parse(yamlFile);

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      // Serve the OpenAPI specification using Swagger UI
      app.use("/swagger", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
      app.use("/auth", AuthRouter.buildRouter());

      app.use(notFound);
      app.use(errorHandler);

      // Start the Express server
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (e) {
      console.error("Internal Server Error", e);
    }
  })
  .catch((error) => {
    console.error(error);
  });
