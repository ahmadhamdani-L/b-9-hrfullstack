import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.post('/', IndexCtrl.UploadDownloadCtrl.upload);
router.post('/profile/:id', IndexCtrl.UploadDownloadCtrl.upload,IndexCtrl.EmployeeCtrl.update);
router.post('/multipart/', IndexCtrl.UploadDownloadCtrl.uploadMultipart,IndexCtrl.EmployeeCtrl.create);
router.get('/:filename', IndexCtrl.UploadDownloadCtrl.download);

export default router;