import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define a type for the product data
interface Product {
  name: string;
  price: string;
}

const FormEditProduct: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Type the id parameter

  useEffect(() => {
    const getProductById = async () => {
      if (id) {
        try {
          const response = await axios.get<Product>(`http://localhost:5000/products/${id}`);
          setName(response.data.name);
          setPrice(response.data.price);
        } catch (error: any) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.patch(`http://localhost:5000/products/${id}`, {
          name,
          price,
        });
        navigate("/products");
      } catch (error: any) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
