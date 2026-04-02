import { Router } from 'express';
import { createCustomer, getAllCustomers, getCustomerById } from '../controllers/customerController';
import { createProduct, getAllProducts } from '../controllers/productController';
import { createInvoice, getAllInvoices, getInvoiceById, updateInvoiceStatus } from '../controllers/invoiceController';

const router = Router();

// Customers
router.post('/api/customers', createCustomer);
router.get('/api/customers', getAllCustomers);
router.get('/api/customers/:id', getCustomerById);

// Products
router.post('/api/products', createProduct);
router.get('/api/products', getAllProducts);

// Invoices
router.post('/api/invoices', createInvoice);
router.get('/api/invoices', getAllInvoices);
router.get('/api/invoices/:id', getInvoiceById);
router.put('/api/invoices/:id/status', updateInvoiceStatus);

export default router;
