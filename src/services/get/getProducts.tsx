import { Products } from '../../interfaces/Services';
import api from '../api';

export default async function getProducts(): Promise<{
  data: Products[];
  status: number;
}> {
  const { data, status } = await api.get(`/products`);
  return { data, status };
}
