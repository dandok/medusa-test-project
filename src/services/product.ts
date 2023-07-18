import { ProductService as MedusaProductService } from '@medusajs/medusa';
import { Product } from '../../src/models/product';
import { ProductExtentionInput } from 'types/custom-types';
import { BaseService } from 'medusa-interfaces';
import { PricePallyException } from '../middleware/error-handler/customError';
import { productSchema } from '../validations/product.schema';

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

    if (product?.length === 0)
      throw new PricePallyException('no product found with batch number', 404);

    return product;
  }

  async addProducts(req, data: ProductExtentionInput): Promise<Product> {
    const { error, value } = productSchema.validate(data);
    if (error) throw new PricePallyException(error.details[0].message, 400);

    const product = await this.productRepository_.findOne({
      where: { id: value?.id },
    });
    if (product?.id === data?.id) {
      throw new PricePallyException('Product exists already', 404);
    }

    return await this.productRepository_.save(value);
  }
}

export default ProductService;
