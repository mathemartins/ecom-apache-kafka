import * as express from 'express';

const router = express.Router();
import * as orderController from '../controllers/orderController';


router.post('/create-order', orderController.createOrder);


export default router;
