import React, { useEffect, useState } from "react";

function Buy(props) {
  const price = props.price.price;
  const num = props.price.num;
  const time = props.time;
  const buy = props.buy;
  const settime = (i) => {
    props.settime(i);
  };

  useEffect(() => {
    let interval;

    if (buy && time > 0) {
      interval = setInterval(() => {
        settime((prevTime) => prevTime - 1);
      }, 1000);
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearInterval(interval);
    };
  }, [buy, time]);

  return (
    <div className=" w-100 h-100 d-block bg-dark">
      <div className="z-1500 position-absolute top-50 start-50 translate-middle ">
        <div class={`card w500 text-start ${buy ? "d-block" : "d-none"}`}>
          <img
            class="card-img-top"
            src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
            alt="Title"
          />
          <div class="card-body">
            <h4 class="card-title">ซื้อสินค้าทั้งสิ้น:{num}ชิ้น</h4>
            <h4 class="card-title">ราคาทั้งหมด:{price} บาท</h4>
            {num > 3 ? (
              num > 5 ? (
                <h4 class="card-title">
                  ราคาหลังได้รับส่วนลด:{price * 0.8} บาท
                </h4>
              ) : (
                <h4 class="card-title">
                  ราคาหลังได้รับส่วนลด:{price * 0.9} บาท
                </h4>
              )
            ) : (
              <h4 class="card-title">คุณไม่ได้ส่วนลด</h4>
            )}
            <h1 class="card-text">กรุณาชำระเงินภายใน : {time}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
