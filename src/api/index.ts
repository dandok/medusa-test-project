import { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { productController } from '../controller/product.controller';
import { globalErrorHandler } from './../middleware/error-handler/error-handler';
import { use } from '../middleware/error-handler/error-wrapper';

const router = Router();
export default () => {
  router.use('', bodyParser.json());

  router.get('/store/custom-fetch', productController.fetch);
  router.get(
    '/store/custom-fetch-product/:batch_no',
    use(productController.fetchProduct),
    globalErrorHandler,
  );
  router.post(
    '/store/custom-add',
    use(productController.addProduct),
    globalErrorHandler,
  );

  return router;
};
