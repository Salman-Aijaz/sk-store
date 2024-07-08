import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"

const AddProduct = () => {

  const [img,setImg]=useState(false);
   const[productDetails,setProductDetails] =useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
   })
  const imageHandler=(e)=>{
    setImg(e.target.files[0]); 
  }

  const changeHandler=(e)=>{
   setProductDetails({...productDetails,[e.target.name]:e.target.value})
  } 

  const productAdd= async()=>{
    console.log(productDetails)
    let responseData;
    let product=productDetails;
    let formData= new FormData();
    // console.log(formData)
    formData.append('product',img)
    await fetch('http://localhost:4000/upload',{
      method:"POST",
      headers:{
        Accept:"application/json"
      },
      body:formData
    }).then((resp)=> resp.json()).then((data)=>{responseData = data})

    if(responseData.success){
         product.image = responseData.imageUrl
         console.log(product)
         await fetch("http://localhost:4000/addProduct",{
          method:"POST",
          headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
          },
          body:JSON.stringify(product)
         }).then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Product Added"):alert("Failed")
         })
    }
  }

  return (
    <div className='add-product'>
    <div className="addproduct-itemfield">
      <p>Product Title</p>
      <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
      </div>    
      <div className='addproduct-price'>
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type Here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type Here' />
      </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={img? URL.createObjectURL(img) :upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={()=> {productAdd()}} className='addproduct-btn'> Add</button>
    </div>
  )
}

export default AddProduct