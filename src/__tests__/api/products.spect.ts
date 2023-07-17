import { ContainerRegister } from '../../types/tests';
import { testDatabase } from '../../test-helpers/test-database';
import ProductService from '../../services/product';
import { Product } from '../../models/product';
import { setupTestServer } from '../../test-helpers/setup-test-server';
import {
  testProduct,
  testProduct1,
} from '../../test-helpers/test-data/product';

jest.setTimeout(90000);

describe('API: CustomProduct', () => {
  async function containerRegisters(): Promise<ContainerRegister[]> {
    const productRepository = await testDatabase
      .getConnection()
      .getRepository(Product);

    const productService = new ProductService({ productRepository });

    return [
      {
        name: 'productService',
        instance: productService,
      },
    ];
  }

  beforeAll(async () => {
    await testDatabase.setup();
    const registers = await containerRegisters();
    await setupTestServer.setup(registers);
  });

  afterAll(async () => {
    await setupTestServer.destroy();
    await testDatabase.destroy();
  });

  describe('GET /store/custom-fetch', () => {
    describe('Fetch Products', () => {
      // it.only('returns an empty array', async () => {
      //   const api = setupTestServer.getApi();
      //   const res = await api.get(`/store/custom-fetch`);
      //   const data = res.data.products;
      //   console.log(data)
      //   JSON.stringify(data);
      //   expect(res.status).toEqual(200);
      //   // expect(data.length).toEqual(0);
      // }); //works when the db is empty

      it('returns an array of products', async () => {
        const api = setupTestServer.getApi();
        const res = await api.get(`/store/custom-fetch`);
        const data = res.data.products;
        JSON.stringify(data);
        expect(res.status).toEqual(200);
        expect(data.length).toEqual(3);
      });

      it('returns a product when batch_no is passed', async () => {
        const batch_no = '1234';
        const api = setupTestServer.getApi();
        const res = await api.get(`/store/custom-fetch-product/${batch_no}`);
        const data = res.data.product;
        JSON.stringify(data);
        expect(res.status).toEqual(200);
      });

      it('returns empty array when a wrong batch_no is passed', async () => {
        const batch_no = '1244';
        const api = setupTestServer.getApi();
        const res = await api.get(`/store/custom-fetch-product/${batch_no}`);
        const data = res.data.product;
        JSON.stringify(data);
        expect(res.status).toEqual(200);
        expect(data.length).toEqual(0);
      });
    });

    describe('Create products', () => {
      it('should create a product', async () => {
        const api = setupTestServer.getApi();
        const res = await api.post('/store/custom-add', testProduct);

        expect(res.status).toEqual(200);
      });

      it.only('should reject when no title is given', async () => {
        const api = setupTestServer.getApi();
        const res = await api.post('/store/custom-add', testProduct1);

        expect(res).toEqual(404); //require better error handling in the code to work properly!!
      });
    });
  });
});
