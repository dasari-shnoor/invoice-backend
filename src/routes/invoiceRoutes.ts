import { Router } from 'express';
import { createInvoice, getAllInvoices, getInvoiceById, updateInvoiceStatus } from '../controllers/invoiceController';

const router = Router();

router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id/status', updateInvoiceStatus);

export default router;
