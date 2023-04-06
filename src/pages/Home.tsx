import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

import CartIcon from "../components/CartIcon";
import { useToast } from "../hooks/useToast";
import { Product } from "../interfaces/Services";
import getProducts from "../services/get/getProducts";
import ProductDetails from "../components/ProductDetails";

export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setLoading(false);
      setProducts(data);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        toast.error("Products not found.", {
          toastId: "error",
        });
      } else setServiceError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="header">
        <TextField
          id="name"
          name="name"
          label="Buscar produtos"
          variant="standard"
          // value={queryParams.name}
          // onChange={(e) => handleChange(e as SelectChangeEvent<string>)}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Categoria
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={10}
            // onChange={handleChange}
            label="Age"
          >
            <MenuItem value={10}>Todas</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <CartIcon
          count={1}
          open={openCart}
          products={[products[0]]}
          setOpen={() => setOpenCart(!openCart)}
        />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => {
              return (
                <div key={product._id} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    <ProductDetails product={product} />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {`R$ ${product.price}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
