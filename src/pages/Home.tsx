import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, SelectChangeEvent } from '@mui/material';

import CartIcon from '../components/CartIcon';
import { useToast } from '../hooks/useToast';
import { Product } from '../interfaces/Services';
import getProducts from '../services/get/getProducts';
import ProductDetails from '../components/ProductDetails';
import Loading from '../components/Loading';
import Error from '../components/Error';

type FilterType = 'category' | 'name';

export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Todas');
  const [cartList, setCartList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setLoading(false);
      setProducts(data);
      setFilteredProducts(data);
      const categories = [...new Set(data.map((product) => product.category))];
      setCategoryList(categories);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        toast.error('Products not found.', {
          toastId: 'error',
        });
      } else setServiceError(true);
    }
    setLoading(false);
  };

  const clearFilters = () => {
    setCategory('Todas');
    setName('');
  };

  const loadCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setCartList(items);
    }
  };

  const handleChange = (event: SelectChangeEvent, type: FilterType) => {
    if (type === 'category') {
      setCategory(event.target.value);
    } else {
      setName(event.target.value);
    }
  };

  useEffect(() => {
    let newList = [];
    newList = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));

    if (category !== 'Todas') {
      newList = newList.filter((product) => product.category === category);
    }

    setFilteredProducts(newList);
  }, [name, category]);

  useEffect(() => {
    fetchProducts();
    loadCartItems();
  }, []);

  if (loading) return <Loading />;
  if (serviceError) return <Error />;

  return (
    <>
      <div className="header">
        <TextField
          id="name"
          name="name"
          label="Buscar produtos"
          variant="standard"
          value={name}
          onChange={(e) => handleChange(e as SelectChangeEvent<string>, 'name')}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category">Categoria</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={category}
            onChange={(e) => handleChange(e as SelectChangeEvent<string>, 'category')}
          >
            <MenuItem value="Todas">Todas</MenuItem>
            {categoryList.map((cat) => (
              <MenuItem value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <button
          type="button"
          onClick={() => clearFilters()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Limpar Filtros
        </button>
        <CartIcon
          cartItems={cartList}
          setCartItems={setCartList}
          open={openCart}
          setOpen={() => setOpenCart(!openCart)}
        />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                  <ProductDetails
                    product={product}
                    cartItems={cartList}
                    setCartItems={setCartList}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {`R$ ${product.price}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
