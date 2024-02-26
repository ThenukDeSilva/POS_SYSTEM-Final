import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assests/dashboard 1.jpg";
import image2 from "../assests/dashboard 2.jpg";
import image3 from "../assests/dashboard 3.jpg";
import image4 from "../assests/pos Image.png";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);


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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                    <img src={image4} alt="Logo" height="50"/>
                          My POS</a>

                    <div class="collapse navbar-collapse" id="navbar">
                        <ul class="navbar-nav">

                            <Link to="/products" className="btn-custom">Check Products</Link>

                            <Link to="/addproduct" className="btn-custom">Add Products</Link>

                            <Link to="/stocks" className="btn-custom">Check Stocks</Link>



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

            <h1><center>Hi! Welcome to MyPOS</center></h1>

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
            <br />

            <div class="home-buttons">

                {categories && categories.map((category) => (
                        <Link to={`/categories/${category.id}`} className="btn btn-warning">{category.name}</Link>
                ))}

            </div>

            <footer>
                Thanks for using MyPOS<br />
                ~Thenuk De Silva~
            </footer>

        </>
    )
}

export default Home;