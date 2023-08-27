import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [search, setsearch] = useState("");
  const buy = props.buy;
  const setbuy = (e) => {
    props.setbuy(e);
  };
  const shopdata = props.shopdata;
  const setshop = (e) => {
    props.setshop(e);
  };
  const deleteItem = (id) => {
    const updatedShopData = shopdata.filter((item) => item.id !== id);
    setshop(updatedShopData);
  };
  return (
    <nav className="navbar navbar-warning  bg-warning fixed-top">
      <div className="container">
        <a className="navbar-brand fw700 col-2" href="/">
          Home
        </a>
        <nav className="use-in-pc-im nav justify-content-center w-75 ">
          <div className="dropdown open">
            <a
              className="nav-link text-dark w-25 text-center fw700 dropdown-toggle me-xl-5 me-3 px-0"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-shop"></i>
            </a>
            <div className="dropdown-menu w-200 bg-warning " aria-labelledby="triggerId">
              <li>
                <a class="dropdown-item text-center" href="#">
                  <b>รถเข็น</b>
                </a>
                {shopdata.length > 0 ? <hr /> : null}
              </li>
              <div className="overflow-auto mh-300">
                {shopdata.map((item) => {
                  return (
                    <li>
                      <div
                        id={`item-${item.id}`}
                        class="row mx-3 card-market-item mb-2"
                      >
                        <img class="col-3 p-0 " src={item.path} alt="" />
                        <div class="col-7 px-2 my-auto">
                          {item.name}
                          <p className="m-0">
                            ${item.price} x {item.Num}{" "}
                            <b>${item.price * item.Num}</b>
                          </p>
                        </div>
                        <div class="col-1 my-auto">
                          <button
                            onClick={() => {
                              deleteItem(item.id);
                            }}
                            type="button"
                            class="btn scart"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>

              {shopdata.length > 0 ? <hr /> : <div className="py-3"></div>}
              <li>
                <div class="row mx-3 card-market-item ">
                  <div className="col-6">
                    <a
                      className="btn btn-dark w-100"
                      onClick={() => {
                        setbuy(!buy);
                      }}
                      role="button"
                    >
                      Buy
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      className="btn btn-dark w-100 "
                      onClick={() => {
                        localStorage.removeItem("shopdata");
                        setshop([]);
                      }}
                      role="button"
                    >
                      Clear
                    </a>
                  </div>
                </div>
              </li>
            </div>
          </div>
          <input
            id="todo"
            type="text"
            className="form-control2   bg-input fw700 col-xl-6 col-4"
            aria-label="Text input with checkbox"
            onKeyPress={(event) => {
              if (event.keyCode === 13 || event.which === 13){
                setsearch(event.target.value);
                window.location.href = `/search/${search}`;
              }
            }}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="search..."
          />
          <span className="position-relative iconNav ">
            <a
              className="text-dark"
              href={`/search/${search}`}
              aria-current="page"
            >
              <i className="fa-solid fa-magnifying-glass "></i>
            </a>
          </span>
          <a
            className="nav-link text-dark col-xl-3 col-5 text-center fw700"
            href="/createprice"
          >
            create price
          </a>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
