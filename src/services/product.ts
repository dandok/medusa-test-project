import { ProductService as MedusaProductService } from '@medusajs/medusa';
import { Product } from '../../src/models/product';
import { ProductExtentionInput } from 'types/custom-types';
import { BaseService } from 'medusa-interfaces';

class ProductService extends BaseService {
  protected productRepository_;
  constructor({ productRepository }) {
    super();
    this.productRepository_ = productRepository;
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository_.find();
  }

  async getProduct(batch_no: string): Promise<Product[] | undefined> {
    const product = await this.productRepository_.find({
      where: {
        batch_no,
      },
    });

    if (!product) return null;
    return product;
  }

  async addProducts(req, data: ProductExtentionInput): Promise<Product> {
    const product = await this.productRepository_.findOne({
      where: { id: data.id },
    });
    if (product?.id === data?.id) {
      throw new Error('Product exists already');
    }

    return await this.productRepository_.save(data);
  }
}

export default ProductService;
