import { Router } from 'express';
import { createCustomer, getAllCustomers, getCustomerById } from '../controllers/customerController';

const router = Router();

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);

export default router;
