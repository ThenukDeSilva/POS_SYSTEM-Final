import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Product = () => {

    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);
    

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8081/products");
            setProducts(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }

    }

    return (
        <>
            <div className="body">
            <h1>Products</h1>

            <div className="card-container">
                {products &&
                    products.map((product, index) => (
                        <div key={index} className="card">
                            <img className="card-img-top" src="src/image-outline-filled.png" alt="image" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p>{product.price} LKR</p>
                                <p>Qty {product.qty}</p>
                                <a href="#" className="btn btn-primary">Add to cart</a>
                            </div>
                        </div>
                    ))}
            </div>

        </div >

        </>
    )
}

export default Product;