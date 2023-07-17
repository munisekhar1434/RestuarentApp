import { AddRounded, Favorite, StarRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Items } from "./Data";
import { useStateValue } from "./StateProvider";
import { actionType } from "./reducer";
let cartData=[]

function Itemcard({ imgSrc, name, ratings, price,itemId }) {
  const [isFavourite, setFavourite] = useState(false);
  const [currentvalue, setCurrentValue] = useState(Math.floor(ratings));

  const [isCart,setCart]=useState(null);
  const [{},dispatch]=useStateValue();

  useEffect(()=>{
if(isCart){
 cartData.push(isCart)
 console.log(cartData)
 dispatch({
  type:actionType.SET_CART,
  cart:cartData
 })
}
  },[isCart]);

  const handleClick = (value) => {
    setCurrentValue(value);
    
  };

  return (
    <div className="itemCard" id={itemId}>
      <div
        className={`isfavourite ${isFavourite ? "active" : ""}`}
        onClick={() => setFavourite(!isFavourite)}
      >
        <Favorite />
      </div>

      <div className="imgBox">
        <img src={imgSrc} alt="" className="itemImage"></img>
      </div>
      <div className="itemContent">
        <h3 className="itemName">{name}</h3>
        <div className="bottom">
          <div className="ratings">
            {Array.apply(null, { length: 5 }).map((e, i) => (
              <i
                key={i}
                className={`rating ${currentvalue > i ? "orange" : "grey"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <h3 className="price">
              <span>$ </span>
              {price}
            </h3>
          </div>
          <i className="addtoCart" onClick={()=>setCart(Items.find(n=>n.id===itemId))}>
            <AddRounded />
          </i>
        </div>
      </div>
    </div>
  );
}

export default Itemcard;
