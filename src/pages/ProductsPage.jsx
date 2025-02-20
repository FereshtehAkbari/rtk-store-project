import Card from "../components/Card";
// import { useProducts } from "../context/ProductContext";
import styles from "./ProductsPage.module.css";
import Loader from "../components/Loader";
import { fetchProducts } from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox.jsx";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";
import { useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  // const products = useProducts();
  // const products = [];
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <SideBar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}
export default ProductsPage;
