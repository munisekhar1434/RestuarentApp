import {
  AccountBalanceWalletRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import "./App.css";
import Header from "./Components/Header";
import MenuContainer from "./Components/MenuContainer";
import { useEffect, useState } from "react";
import BannerName from "./Components/BannerName";
import SubMenuContainer from "./Components/SubMenuContainer";
import MenuCard from "./Components/MenuCard";
import { MenuItems, Items } from "./Components/Data";
import Itemcard from "./Components/Itemcard";
import DebitCard from "./Components/DebitCard";
import Cartitem from "./Components/Cartitem";
import { useStateValue } from "./Components/StateProvider";

function App() {
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId === "buger01")
  );

  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    //menucard active toggle

    const menuCards = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenucard");

    function setMenuCardActive() {
      menuCards.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuCards.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [isMainData,cart]);

  // setmain dish
  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId === itemId));
  };

  return (
    <div className="App">
      {/* {header section} */}

      <Header />
      {/* main section */}
      <main>
        <div className="mainContainer">
          {/* Banner */}
          <div className="banner">
            <BannerName name={"Muni"} discount={"20"} link={"#"} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              className="deliveryPic"
              alt=""
            ></img>
          </div>
          {/* dishcontainer */}
          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer
                name={"Menu category"}
                className="subMenuContainer"
              />
            </div>
            <div className="rowContainer">
              {MenuItems &&
                MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)}>
                    <MenuCard
                      imgSrc={data.imgSrc}
                      name={data.name}
                      isActive={data.id === 1 ? true : false}
                    />
                  </div>
                ))}
            </div>
            <div className="dishItemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <Itemcard
                    key={data.id}
                    itemId={data.id}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={data.price}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="rightMenu">
          <div className="debitCardContainer">
            <div className="debitCard">
              <DebitCard />
            </div>
          </div>

          {!cart ? (
            <div></div>
          ) : (
            <div className="cartCheckoutContainer">
              <SubMenuContainer name={"cart Items"} />
              <div className="cartContainer">
                <div className="cartItems">
                  {
                    cart && cart.map(data =>(
                      <Cartitem
                      key={data.id}
                      itemId={data.itemId}
                      name={data.name}
                      imgSrc={
                        data.imgSrc
                      }
                      price={data.price}
                    />
                    ))
                  }
                 
                </div>
              </div>

              <div className="totalSection">
                <h3>Total</h3>
                <p>
                  <span>$ </span>45.0
                </p>
              </div>
              <button className="checkOut">Check Out</button>
            </div>
          )}
        </div>
      </main>
      {/* bottom menu */}
      <div className="bottomMenu">
        <ul id="menu">
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<HomeRounded />} isHome />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Chat />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<AccountBalanceWalletRounded />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Favorite />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<SummarizeRounded />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Settings />} />
          <div className="indicator"></div>
        </ul>
      </div>
    </div>
  );
}

export default App;
