import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";

const Category = () => {

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const params = useParams();

  const getCategory = () => {
    fetch(`http://localhost:8081/categories/${params.id}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        setCategory(data);
      }).catch((error) => {
        console.log(error);
      })
  }

  const getProductByCategory = () => {
    fetch(`http://localhost:8081/categories/${params.id}/products`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        setProducts(data);
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getCategory();
    getProductByCategory();
  }, [])

  return (
    <>
      <h5>Categories</h5>
      <div>
      {category &&
        <h1>{category.name}</h1>
      }
      </div>
      <ol>
        {products && products.map((product) => (
          <li><Link to={`/products/${product.id}`}>{product.name}</Link></li>
        ))}
      </ol>
    </>
  );

}

export default Category;