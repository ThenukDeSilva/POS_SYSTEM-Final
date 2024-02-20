import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assests/image-outline-filled.png";
import ScrollToEndButton from './ScrollToEndButton';


const Product = () => {


    const [orderProducts, setOrderProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [products, setProducts] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const showMessage = (msg) => {
        setPopupMessage(msg);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            setPopupMessage('');
        }, 1000); // Adjust the duration (in milliseconds) as needed
    };

    const createOrder = async () => {
        const productIds = orderProducts.map(obj => obj.id);

        const data = {
            products: productIds
        };

        try {
            const response = await axios.post(`http://localhost:8081/orders`, data);
            if (response.status === 201) {
                // Deduct quantity of products
                orderProducts.forEach(async (product) => {
                    const updatedQty = product.qty - 1; // Assuming deducting 1 quantity per product
                    await axios.put(`http://localhost:8081/products/${product.id}`, { qty: updatedQty });
                });

                // Clear orderProducts, reset total and tax
                setOrderProducts([]);
                setTotal(0);
                setTax(0);
            }
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTax((total / 100) * 15);
    }, [total, tax]);

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

    const filteredProducts = products
        ? products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <>
            <div className="body">
                <div className="row">
                    <div className="col-md-6">
                        <h1 style={{ paddingLeft: '20px' }}>Products</h1>
                    </div>
                    <div className="col-md-4" style={{ marginTop: '10px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by product name"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                        <ScrollToEndButton />
                    </div>
                </div>
                <div className="card-container">
                    {filteredProducts &&
                        filteredProducts.map((product, index) => (
                            <div key={index} className="card">
                                <img className="card-img-top" src={image} alt="image" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p>{product.price} LKR</p>
                                    <p>Qty {product.qty}</p>
                                    <button className="btn btn-sm btn-primary" onClick={() => {
                                        setOrderProducts([...orderProducts, product]);
                                        let currentTotal = total;
                                        currentTotal = currentTotal + product.price;
                                        setTotal(currentTotal);
                                        showMessage("Product added successfully")
                                    }}>Add to Order</button>


                                </div>
                            </div>
                        ))}
                </div>
                {showPopup && (
                    <div className="popup">
                        <p>{popupMessage}</p>
                    </div>
                )}
                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '20px',
                    marginTop: '20px'
                }}>

                    <h2 style={{ paddingLeft: '20px' }}>Cart</h2>
                    <div className="cart-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price (LKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts && orderProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                {orderProducts && orderProducts.length > 0 && (
                                    <>
                                        <tr>
                                            <th colSpan="2">Net Total (LKR)</th>
                                            <th>{total}</th>
                                        </tr>
                                        <tr>
                                            <th colSpan="2">Tax (LKR)</th>
                                            <th>{tax}</th>
                                        </tr>
                                        <tr>
                                            <th colSpan="2">Grand Total (LKR)</th>
                                            <th>{tax + total}</th>
                                        </tr>
                                    </>
                                )}

                            </tfoot>
                        </table>
                    </div>
                    {orderProducts && orderProducts.length > 0 && (
                        <>
                            <button className="btn btn-primary" onClick={createOrder}>Complete Order</button>
                        </>
                    )}
                </div>


            </div >

        </>
    )
}

export default Product;