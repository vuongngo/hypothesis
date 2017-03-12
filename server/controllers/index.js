import express from 'express';
import mailRoutes from './mail';

const router = express.Router();

router.use('/api/email', mailRoutes);

module.exports = router;
