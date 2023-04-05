import React, { useEffect, useState } from 'react';
import { useToast } from '../hooks/useToast';
import { Products } from '../interfaces/Services';
import getProducts from '../services/get/getProducts';


export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setLoading(false);
      setProducts(data);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        toast.error('Products not found.', {
          toastId: 'error',
        });
      } else setServiceError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="main">
        <h1>Teste</h1>
    </div>
  );
}
