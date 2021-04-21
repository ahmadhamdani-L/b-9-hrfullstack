import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.post('/', IndexCtrl.UploadDownloadCtrl.upload);
router.get('/:filename', IndexCtrl.UploadDownloadCtrl.download);

export default router;