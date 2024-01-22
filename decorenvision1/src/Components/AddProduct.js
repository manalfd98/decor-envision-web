import React, { useState, useEffect } from 'react'
import { storage, auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import AdminNavbar from './Admin/AdminNavbar'
import './AddProduct.css'

const AddProduct = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [material, setMaterial] = useState("");
  const [fabric, setFabric] = useState("");
  const [warranty, setWarranty] = useState("");

  const [productimage, setProductImage] = useState("");

  const [link, setLink] = useState('');

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadError, setUploadError] = useState("");

  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            //console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers();
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  const types = ['image/jpg', 'image/png', 'image.PNG', 'image/jpeg'];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError('');
      }
      else {
        setProductImage(null)
        setImageError('Please enter valid image type(png or jpg)');
      }
    }
    else {
      setImageError("please select an file");
    }

  }

  const loggeduser = GetCurrentUser();
  //   if(loggeduser){
  //     console.log(loggeduser[0].email)
  //   }
  const handleAddProduct = (e) => {
    e.preventDefault();
  
    // Your existing code for uploading the image
    const storageRef = ref(storage, `product-images${producttype.toUpperCase()}/${Date.now()}`);
    uploadBytes(storageRef, productimage).then(() => {
      getDownloadURL(storageRef).then(url => {
  
        // Save product information to Firestore including the Google link
        addDoc(collection(db, `product-${producttype.toUpperCase()}`), {
          producttitle,
          producttype,
          description,
          price,
          warranty,
          color,
          material,
          fabric,
          weight,
          productimage: url,
          ARLink: link, // Assuming link is a state variable capturing the input value
        }).then(() => {
          setSuccessMsg('New Product has been added!');
        }).catch((error) => {
          setErrorMsg(error.message);
        });
      });
    });
  };
  
  function insertValue() {
    var select = document.getElementById("select"),
      textVal = document.getElementById("val").value,
      newOption = document.createElement("Option"),
      newOptionVal = document.createTextNode(textVal);

    newOption.appendChild(newOptionVal);
    select.insertBefore(newOption, select.lastChild)

  }




  return (
    <div>
      <AdminNavbar />
      {/* {loggeduser && loggeduser[0].email=="manal@gmail.com"? */}
      <div className='addprod-container'>
        <form className='addprod-form' onSubmit={handleAddProduct}>
          <p>
            Add Product
          </p>
          {successMsg && <div className='success-msg'>{successMsg}</div>}
          {errorMsg && <div className='error-msg'>{errorMsg}</div>}
          {uploadError && <div className='error-msg'>{uploadError}</div>}
          <label>Product Title</label>
          <input type="text" onChange={(e) => { setProductTitle(e.target.value) }}
            placeholder="Product Title"
          />

          <div>
            <label style={{ marginTop: '10px' }}>Product Type</label>
            <select onChange={(e) => { setProductType(e.target.value) }} id='select'
              style={{ width: '170px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '20px' }}>
              <option>Choose Product Type</option>
              <option>Sofa</option>
              <option>Chair</option>
              <option>Table</option>
              <option>Bed</option>
            </select>
            <input type='text' id='val' style={{ marginLeft: "10px", width: '200px' }}></input>
            <button style={{ marginLeft: "10px", fontSize: "14px", backgroundColor: 'black', width: '130px' }} onClick={insertValue}>Add Product Type</button>
          </div>
          <label>Product AR  </label>
          <input
            type="text"
            onChange={(e) => setLink(e.target.value)}
            placeholder="AR Link"
          />

          <div>
            <label>Color</label>
            <select onChange={(e) => { setColor(e.target.value) }} id='select'
              style={{ width: '125px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '10px' }}>
              <option>Choose Color</option>
              <option>Black</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Brown</option>
              <option>Red</option>
              <option>Grey</option>
              <option>White</option>
              <option>Off White</option>
              <option>Beige</option>
              <option>Oak</option>
              <option>Peach</option>

            </select>
            <input type='text' id='val' style={{ marginLeft: "10px" }}></input>
            <button style={{ marginLeft: "10px", fontSize: "14px", backgroundColor: 'black' }} onClick={insertValue}>Add Color</button>
          </div>

          <label>Weight</label>
          <input type="text" onChange={(e) => { setWeight(e.target.value) }}
            placeholder="Product Weight" style={{ width: '130px' }}
          />


          <div>
            <label style={{ marginTop: '10px' }}>Material</label>
            <select onChange={(e) => { setMaterial(e.target.value) }}
              style={{ width: '145px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '20px' }}>
              <option>Choose Material</option>
              <option>Wooden</option>
              <option>Metal</option>
              <option>Sheesham Wood</option>
              <option>Glass</option>
              <option>Lamination</option>

            </select>

            <label style={{ marginLeft: '50px' }}>Fabric</label>
            <select onChange={(e) => { setFabric(e.target.value) }}
              style={{ width: '125px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '10px' }}>
              <option>Choose Fabric</option>
              <option>Suede</option>
              <option>Leather</option>
              <option>Jute</option>
              <option>Velvet</option>
              <option>Polyester</option>
              <option>Woolen</option>
              <option>None</option>
            </select>

          </div>


          <label>Warranty</label>
          <select onChange={(e) => { setWarranty(e.target.value) }}
            style={{ width: '145px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px' }}>
            <option>Choose Warranty</option>
            <option>6 months</option>
            <option>1 year</option>
            <option>18 months</option>
            <option>2 years</option>
          </select>

          <label>Image</label>
          <input type="file" onChange={handleProductImg} />
          {imageError && <>
            <div className='error-msg'>{imageError}</div>
          </>}
          
          <label>Description</label>
          <textarea type="text" onChange={(e) => { setDescription(e.target.value) }}
            placeholder="Product description in brief "></textarea>

          <label>Price Without Tax</label>
          <input type="text" onChange={(e) => { setPrice(e.target.value) }}
            placeholder="Enter Price without tax"
          />

          <button type="submit">Add</button>






        </form>
      </div>:<div></div>

    </div>
  )
}

export default AddProduct