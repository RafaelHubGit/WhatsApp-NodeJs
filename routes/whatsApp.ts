import { Router } from 'express';
import { whatsAppInit, whatsAppSend } from '../controllers/whatsApp';

const router = Router();

router.get('/', whatsAppInit);
// router.get('/:id', getUsuario);
router.post('/', whatsAppSend);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);


export default router;