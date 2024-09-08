import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// Routes
import userRoutes from './routes/user';
import productRoutes from './routes/products';
import orderedProductRoutes from './routes/orderedProducts';
import orderRoutes from './routes/orders';

export const app: express.Application = express();
const address: string = '0.0.0.0:3000';

// Cors
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Routes
userRoutes(app);
productRoutes(app);
orderRoutes(app);
orderedProductRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
