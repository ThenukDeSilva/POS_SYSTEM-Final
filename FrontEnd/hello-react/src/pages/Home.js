import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assests/dashboard 1.jpg";
import image2 from "../assests/dashboard 2.jpg";
import image3 from "../assests/dashboard 3.jpg";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    // const [name, setName] = useState(null);
    // const [price, setPrice] = useState(null);
    // const [qty, setQty] = useState(null);
    // const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    const navigate = useNavigate();

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

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }


    }

    // const handleName = (event) => {
    //     setName(event.target.value);
    // }

    // const handlePrice = (event) => {
    //     setPrice(event.target.value);
    // }

    // const handleQty = (event) => {
    //     setQty(event.target.value);
    // }

    // const handleCategory = (event) => {
    //     setCategoryId(event.target.value);
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     const data = {
    //         "name": name,
    //         "price": price,
    //         "qty": qty,
    //         "categoryId": categoryId
    //     }

    //     fetch("http://localhost:8081/products", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((response) => {
    //         return response.json();
    //     }).then((data) => {
    //         setProducts([...products, data]);
    //         setCategoryId(null);
    //         setName(null);
    //         setPrice(null);
    //         setQty(null);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">My POS</a>

                    <div class="collapse navbar-collapse" id="navbar">
                        <ul class="navbar-nav">
                            {categories && categories.map((category) => (
                                <li class="nav-item" style={{ marginRight: '10px' }}>
                                    <Link to={`/categories/${category.id}`} className="btn btn-warning">{category.name}</Link>
                                </li>
                            ))}
                            <li class="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <div class="marquee">
                <span>Welcome to XYZ Store - Your one-stop shop for all your shopping needs! Explore our wide range of products including groceries, electronics, clothing, and more. Don't miss out on our special offers and discounts. Happy shopping!</span>
            </div>

            <h1>Home</h1>

            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={image1} alt="First slide" />
                    </div>
                    <div class="carousel-item ">
                        <img class="d-block w-100" src={image2} alt="Second slide" />
                    </div>
                    <div class="carousel-item ">
                        <img class="d-block w-100" src={image3} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
<br/>
            <Link to="/products" className="btn-custom">Check Products</Link>
            <br />
            <br />
            <Link to="/addproduct" className="btn-custom">Add Products</Link>
            <br />
            <br />
            <Link to="/stocks" className="btn-custom">Check Stocks</Link>


            {/* <ol>
                {products && products.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ol> */}

            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input type="text" required onChange={handleName} value={name} />
                </div>

                <div>
                    <label>Product Price</label>
                    <input type="text" required onChange={handlePrice} value={price} />
                </div>

                <div>
                    <label>Product Qty</label>
                    <input type="text" required onChange={handleQty} value={qty} />
                </div>

                <div>
                    <label>Category</label>
                    <select required onChange={handleCategory}>
                        <option>Please Select</option>

                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}

                    </select>
                </div>
                            <br/>
                <button className="btn-custom" type="submit">Save Product</button>

            </form> */}

        </>
    )
}

export default Home;