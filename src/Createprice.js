import React, { useState } from 'react'

function Createprice(props) {
    const centerdisplay=' d-flex align-content-center justify-content-center align-items-center'
    const w100=' w-100vh'
    const h100=' h-100vh'
    const [user,setuser]=useState({
      id:'',
      price:''
    })
    const userList = props.userList
    const setUserList =(e)=>{props.setUserList(e)}
    const createprice=()=>{
      console.log('id:'+user.id);
      alert('id:'+user.id+'\nprice:'+user.price)
      
      const existingUser = userList.find(existingUser => existingUser.id === user.id);

      if (existingUser) {
        // อัปเดต price ของผู้ใช้ที่มี id ตรงกับใน userList
        setUserList(prevUserList =>
          prevUserList.map(prevUser =>
            prevUser.id === existingUser.id ? { ...prevUser, price: user.price } : prevUser
          )
        );
      } else {
        // เพิ่มผู้ใช้ใน userList ถ้าไม่พบ id ที่ซ้ำ
        setUserList(prevUserList => [...prevUserList, user]);
      }
    }
  return (
    <div className="d-flex align-content-center justify-content-center align-items-center h-100vh">
        <div class="card p-5 w-25 mb-3 bg-warning">
          <label for="" class="form-label mb-3">id</label>
          <input type="email" onChange={(e)=>setuser({...user, id:e.target.value})}class="form-control w-100 mb-3" name="" id="" aria-describedby="Id" placeholder="615656"></input>
          <label for=""  class="form-label mb-3">price</label>
          <input type="email" onChange={(e)=>setuser({...user, price:e.target.value})} class="form-control w-100  mb-3" name="" id="" aria-describedby="password" placeholder="$"></input>
          <a  class="btn btn-dark mt-3" onClick={()=>createprice()}  role="button">OK</a>
        </div>
    </div>
  )

}

export default Createprice
