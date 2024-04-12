import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import routes from './routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST'],
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User Registration API',
        version: '1.0.0',
        description: 'This API is used to handle user registration',
      },
      servers: [
        {
          url: `http://localhost:${process.env.SERVER_PORT}/api`,
          description: 'Development Server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', routes())

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
    console.info(`Server running on port ${process.env.SERVER_PORT}`)
});

mongoose.Promise = Promise;
mongoose.connect(`${process.env.MONGO_URI}`);
mongoose.connection.on('error', (error: Error) => console.error(error))
