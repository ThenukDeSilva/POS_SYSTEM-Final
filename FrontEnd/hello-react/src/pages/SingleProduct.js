import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {

    const param = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById();
    });

    const getProductById = () => {
        fetch(`http://localhost:8081/products/${param.id}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                setProduct(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div>
                <h1>{product.name}</h1>
                <div>{product.price}</div>
                <div>{product.qty}</div>
            </div>

        </>
    )
}
export default SingleProduct;