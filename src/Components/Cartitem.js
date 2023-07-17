import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { actionType } from "./reducer";
let cartItems = [];

function Cartitem({ price, imgSrc, name, itemId }) {
  const [qty, setQty] = useState(1);
  const [{ cart }, dispatch] = useStateValue();
  const [itemPrice, SetitemPrice] = useState(parseInt(qty) * parseInt(price));

  useEffect(() => {
    cartItems = cart;
    SetitemPrice(parseInt(qty) * parseInt(price));
  }, [qty]);

  const updateQuantity = (action, id) => {
    if (action === "Add") {
      setQty(qty + 1);
    } else {
      if (qty === 1) {
        cartItems.pop(id);
        dispatch({
          type: actionType.SET_CART,
          cart: cartItems,
        });
      }else{
        setQty(qty - 1);
      }
      
    }
  };

  return (
    <div className="cardItem">
      <div className="imgBox">
        <img src={imgSrc} alt=""></img>
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <div className="itemQuantity">
          <span>x {qty}</span>

          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQuantity("remove", itemId)}
            />

            <AddRounded
              className="itemAdd"
              onClick={() => updateQuantity("Add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="dolorSign">$</span>
        <span className="itemPriceValue">{itemPrice}</span>
      </p>
    </div>
  );
}

export default Cartitem;
