import { Request, Response } from 'express';
import { Product } from '../models/product';

class ProductController {
  async fetch(req: Request, res: Response) {
    const productsService = req.scope.resolve('productService');
    res.json({
      status: 200,
      products: (await productsService.getProducts(req)) as Product[],
    });
  }

  async fetchProduct(req: Request, res: Response) {
    const productsService = req.scope.resolve('productService');
    const id = req.params.batch_no;
    res.json({
      status: 200,
      product: (await productsService.getProduct(id)) as Product[],
    });
  }

  async addProduct(req: Request, res: Response) {
    const data = req.body;
    const productsService = req.scope.resolve('productService');
    const product = (await productsService.addProducts(req, data)) as Product;
    res.json({
      status: 201,
      product,
    });
  }
}

export const productController = new ProductController();
