import express from 'express';
const router = express.Router();

import { processUrl, findId } from './../controllers/short-url-controller.js';

router.get('/shorturl/:shortId', findId);
router.post('/shorturl', processUrl);

export default router;