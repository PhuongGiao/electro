import {
  ShoppingCartOutlined,
  HeartOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { setCart, setCompare, setWishlist } from "../../action/productAction";
import "./ProductStyle1.scss";
const ProductStyle1 = ({ id, name, img, retailPrice, type, forSale }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compare = useSelector((state) => state.productReducer.compare);

  const openNotificationWithIcon = (type, mes, des) => {
    notification[type]({
      message: mes,
      description: des,
    });
  };
  const handleCart = (id) => {
    dispatch(setCart(id));
    openNotificationWithIcon("success", "Success", "Added to cart");
  };
  const handleCompare = (id) => {
    if (compare.length !== 3) {
      dispatch(setCompare(id));
      openNotificationWithIcon("success", "Success", "Added to compare table");
    } else {
      openNotificationWithIcon(
        "error",
        "Error",
        "The comparison table is full"
      );
    }
  };
  const handleWishList = (id) => {
    dispatch(setWishlist(id));
    openNotificationWithIcon("success", "Success", "Added to wish list");
  };
  const handleImageLoad = () => {
    setLoaded(true);
  };
  const imageStyle = !loaded ? { display: "none" } : {};
  return (
    <div className="ProductStyle1">
      <span className="type">{type[0].subName} </span>
      <p className="name" onClick={() => navigate(`/shop/${id}`)}>
        {name}
      </p>
      <div className="img" onClick={() => navigate(`/shop/${id}`)}>
        {!loaded && <Loader />}
        <img src={img} alt="" style={imageStyle} onLoad={handleImageLoad} />
      </div>
      <div className="sop">
        <p className="price">${retailPrice}.00</p>
        <ShoppingCartOutlined onClick={() => handleCart(id)} />
      </div>
      <div className="tool">
        <div className="flex" onClick={() => handleWishList(id)}>
          <HeartOutlined />
          <p>Wishlist</p>
        </div>
        <div className="flex" onClick={() => handleCompare(id)}>
          <RetweetOutlined />
          <p>Compare</p>
        </div>
      </div>
    </div>
  );
};

export default ProductStyle1;
