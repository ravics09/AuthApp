import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import SwaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'yaml';
import connectDB from './app/config/db.config';

dotenv.config({ path: '.env-dev' });


// Create an Express application
const app: Application = express();
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    // Start your application or perform other tasks
    try {
      // Load and parse the OpenAPI specification from the YAML file
      const yamlFile = fs.readFileSync(path.join(__dirname, 'public', 'swagger', 'openapi.yaml'), 'utf8');
      const swaggerDocument = yaml.parse(yamlFile);
    
      // Serve the OpenAPI specification using Swagger UI
      app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
    
      // Define a route handler for the default home page
      app.get("/", (req: Request, res: Response) => {
        res.send("Hello world!");
      });
    
      // Start the Express server
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (e) {
      console.error("Error: ", e);
    }
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
