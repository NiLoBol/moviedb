
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import MovieID from "./MovieID";
import Buy from "./Buy";
import Createprice from "./Createprice";

function App() {
  const [time, settime] = useState("60");
  
  const [buy, setbuy] = useState(false);
  const initialShopData = localStorage.getItem("shopdata")
    ? JSON.parse(localStorage.getItem("shopdata"))
    : [];
    const initialuserList = localStorage.getItem("userList")
    ? JSON.parse(localStorage.getItem("userList"))
    : [];
  const [shopdata, setshop] = useState(initialShopData);
  const [price, setprice] = useState({price:0,num:0});
  const [userList, setUserList] = useState(initialuserList);
  useEffect(() => {
    let totel =0
    let countnum=0;
    console.log(shopdata);
    shopdata.map((i)=>{
      totel+=i.price*i.Num;
      countnum+=i.Num;
    })
    setprice({price:totel,num:countnum})
    console.log(price);
    localStorage.setItem("shopdata", JSON.stringify(shopdata));
  }, [shopdata]);
  useEffect(() => {
    console.log(userList);
    localStorage.setItem("userList", JSON.stringify(userList));
    const updatedShopdata = shopdata.map(item => {
      const matchingUser = userList.find(user => user.id === item.id);
      if (matchingUser) {
        return { ...item, price: matchingUser.price };
      }
      return item;
    });
    setshop(updatedShopdata);
  }, [userList]);
  
  return (
    
    <BrowserRouter>
      <Navbar buy={buy} setbuy={setbuy} shopdata={shopdata} setshop={setshop}></Navbar>
      <Buy price={price} buy={buy} time={time} settime={settime}></Buy>
      <div class={`${buy?'modal-backdrop fade show':null}`}></div>
      <Routes>
        

        <Route path="/createprice" element={<Createprice userList={userList} setUserList={setUserList} />}></Route>
        <Route path="/" exact={true} Component={Home}></Route>
        <Route path="/search/:name" Component={Movie}></Route>
        <Route path="/movie/:id" element={<MovieID userList={userList} shopdata={shopdata} setshop={setshop}/>}></Route>
        <Route path="/Buy" element={<Buy buy={buy} time={time} settime={settime}></Buy>} ></Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
