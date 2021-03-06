import ProductsRepository from '@repositories/ProductsRepository';
import { Product } from '@entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productNameExists = await productsRepository.findByName(name);

    if (productNameExists) {
      throw new AppError(`Product '${name}' already exists.`);
    }

    return await productsRepository.createAndSave(name, price, quantity);
  }
}
