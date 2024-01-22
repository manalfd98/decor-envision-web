import React from 'react'
import useGetUser from './useGetUser'
import AdminNavbar from './AdminNavbar'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { getDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { addDoc, updateDoc, query, where, getDocs, } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
const UpdateSofa = () => {
  const { type, id } = useParams()
  const [product, setproduct] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [producttitle, setProductTitle] = useState('');
  const [producttype, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [material, setMaterial] = useState('');
  const [fabric, setFabric] = useState('');
  const [warranty, setWarranty] = useState('');

  useEffect(() => {
    const getproduct = async () => {
      try {
        const docRef = doc(db, 'product-SOFA', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setproduct(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };
    getproduct();
  }, [id]);
  //   console.log(product)

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'product-SOFA', id);
      const updatedProduct = {

        producttitle: producttitle || product.producttitle,
        producttype: producttype || product.producttype,
        description: description || product.description,
        price: price || product.price,
        color: color || product.color,
        weight: weight || product.weight,
        material: material || product.material,
        fabric: fabric || product.fabric,
        warranty: warranty || product.warranty

      };

      await updateDoc(docRef, updatedProduct);
      setSuccessMsg('Product details updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMsg('An error occurred while updating product details');
    }
  };


  return (
    <div>
      <AdminNavbar />
      <div className='update-container'>
        <div>
          <form className='update-form'>
            {successMsg && <div className='success-msg'>{successMsg}</div>}
            {errorMsg && <div className='error-msg'>{errorMsg}</div>}

            <h1>Update Product</h1>

            <label>Product Title</label>
            <input type='text' value={producttitle || product.producttitle}
              onChange={(e) => setProductTitle(e.target.value)} placeholder='producttitle' />

            <label>Product Type</label>
            <input type='text' value={producttype || product.producttype}
              onChange={(e) => setProductType(e.target.value)} placeholder='producttype' disabled style={{ width: '125px' }} />


            <label>Color</label>
            <select onChange={(e) => { setColor(e.target.value) }} id='select' value={color || product.color}
              style={{ width: '125px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px' }}>
              <option>Choose Color</option>
              <option>Black</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Brown</option>
              <option>Red</option>
              <option>Grey</option>
              <option>White</option>

            </select>

            <label>Weight</label>
            <input type='text' value={weight || product.weight}
              onChange={(e) => setWeight(e.target.value)} placeholder='weight' style={{ width: '130px' }} />

            <div>
              <label style={{ marginTop: '10px' }}>Material</label>
              <select onChange={(e) => { setMaterial(e.target.value) }} value={material || product.material}
                style={{ width: '145px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '20px' }}>
                <option>Choose Material</option>
                <option>Wooden</option>
                <option>Metal</option>
                <option>Sheesham Wood</option>
                <option>Glass</option>
                <option>Lamination</option>
              </select>

              <label style={{ marginLeft: '50px' }}>Fabric</label>
              <select onChange={(e) => { setFabric(e.target.value) }} value={fabric || product.fabric}
                style={{ width: '125px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px', marginLeft: '10px' }}>
                <option>Choose Fabric</option>
                <option>Suede</option>
                <option>Leather</option>
                <option>Jute</option>
                <option>Velvet</option>
                <option>Polyester</option>
                <option>none</option>
              </select>

            </div>

            <label>Warranty</label>
            <select onChange={(e) => { setWarranty(e.target.value) }} value={warranty || product.warranty}
              style={{ width: '145px', border: 'border: 2px solid rgb(154, 154, 154)', color: 'gray', fontSize: '15px', height: '33px', borderRadius: '5px' }}>
              <option>Choose Warranty</option>
              <option>6 months</option>
              <option>1 year</option>
              <option>18 months</option>
              <option>2 years</option>
            </select>

            <label>Description</label>
            <textarea type='text' value={description || product.description}
              onChange={(e) => setDescription(e.target.value)} placeholder='description' />

            <label>Price</label>
            <input type='text' value={price || product.price}
              onChange={(e) => setPrice(e.target.value)} placeholder='price' />

            <button type='submit' onClick={handleEdit}>
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateSofa