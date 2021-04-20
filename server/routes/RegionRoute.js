import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.get('/', IndexCtrl.RegionCtrl.findAll);

export default router;