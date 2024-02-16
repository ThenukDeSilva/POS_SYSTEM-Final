import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

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

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch("http://localhost:8081/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setProducts([...products, data]);
            setCategoryId(null);
            setName(null);
            setPrice(null);
            setQty(null);
        }).catch(error => {
            console.log(error);
        })
    }

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
                                    <button className="btn btn-warning">
                                    <Link to={`/categories/${category.id}`} className="Nav-link"> {category.name} </Link>
                                    </button>
                                </li>
                            ))}
                            <li class="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                        </ul>

                    </div>
                </div>
            </nav>

            <h1>Home</h1>

            <ul>
                <li>
                    <Link to="/products">products</Link>
                </li>
            </ul>

            <button onClick={getProducts}>Get Products</button>

            <ol>
                {products && products.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ol>

            <form onSubmit={handleSubmit}>
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

                <button className="btn btn-primary" type="submit">Save Product</button>

            </form>
        </>
    )
}

export default Home;