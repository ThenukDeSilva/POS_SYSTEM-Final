import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories();
    }, [])

    const navigate = useNavigate();

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

    return (
        <>

            <div id="add-product-form" className="form-container">
                <h1>Add Products</h1>
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
                    <br/>
                    <button className="btn-custom" type="submit">Save Product</button>
                </form>
            </div>
        </>
    )

}

export default AddProducts;