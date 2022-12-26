import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Commemorative");
  const categories = [
    {
      name: "Commemorative",
      imageUrl:
        "https://thecoinshoppe.ca/wp-content/uploads/2017/07/623932044500_2__47206-1-768x780.jpg",
    },
    {
      name: "Investment",
      imageUrl:
        "https://coins.su/forum/uploads/2017/10/05/kanada_5_tsentov_2015_(revers).jpg.68cbb194ecabe3ddbbcd89c30725a371.jpg",
    },
    {
      name: "Exclusive",
      imageUrl: "https://itemimg.com/i/245538031.0.208x208.jpg",
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/products/getproducts");
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`categoryFlex ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4 className="categoryName">{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height={60}
              width={60}
            />
          </div>
        ))}
      </div>
      <Row>
        {productData
          .filter((i) => i.category === selectedCategory)
          .map((product) => (
            <Col xs={24} sm={6} md={12} lg={6}>
              <Product key={product.id} product={product} />
            </Col>
          ))}
      </Row>
    </LayoutApp>
  );
};
export default Home;
