import { Product } from '../../interfaces/Services';
import api from '../api';

export default async function getProducts(): Promise<{
  data: Product[];
  status: number;
}> {
  const { data, status } = await api.get(`/products`);
  return { data, status };
}
