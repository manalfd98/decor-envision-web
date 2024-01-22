import { React, useState, useEffect } from 'react'
import Navbar from './Navbar'
import bg from './Assets/bg2.jpg'
import '../Components/CustomizeReq.css'
import { db } from '../FirebaseConfig/FirebaseConfig'
import { addDoc, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig/FirebaseConfig'
import { useParams } from 'react-router-dom';


const CustomizeReq = () => {
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const [length, setLength] = useState();
    const [color, setColor] = useState();
    // const [material, setMaterial] = useState();
    // const [fabric, setFabric] = useState();
    const [description, setDescription] = useState();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState('');

    const [product, setProduct] = useState('');
    const [cproduct, setcProduct] = useState('');
    const { type, id } = useParams()

    function GetCurrentUser() {
        const [user, setUser] = useState('')
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
    const loggeduser = GetCurrentUser();

    function GetCurrentProduct() {
        useEffect(() => {
            const getProduct = async () => {
                const docRef = doc(db, `product-${type.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        }, [])
        return product
    }
    GetCurrentProduct();
  
    const customization = (event) => {
        event.preventDefault();
        if (loggeduser) {
            addDoc(collection(db, `customizationreq` ), {
                product,
              newheight:height, newwidth:width, newlength:length, newcolor:color,
                description,
            }) 
            .then(() => {
                setSuccessMsg('Product customization request has been received !');

            }).catch((error) => { setErrorMsg(error.message) });
        }
        else {
            setErrorMsg('Sorry Try Again!')
        }

    }
    const addtocart = (event) => {
      event.preventDefault();
      if (loggeduser) {
          addDoc(collection(db, `Cart-${loggeduser[0].uid}` ), {
              product,
              newheight:height, newwidth:width, newlength:length, newcolor:color,
                description,
              producttext:"Customize product",qty:1
          }) 
          .then(() => {
              setSuccessMsg('Product add to cart successfully !');

          }).catch((error) => { setErrorMsg(error.message) });
      }
      else {
          setErrorMsg('Sorry Try Again!')
      }

  }
  const handleCombinedClick = (event) => {
    event.preventDefault();
    if (!height || !width || !length || !color   || !description) {
        setErrorMsg('Please fill in all the fields.');
        return;
      }
    customization(event);
    addtocart(event);
  };



return (
    <div>
        {/* <Navbar />
            <div className='banner2'>
                <img src={bg} className='banner1' alt='' width='100%' height='500px' />
                <div className="cusreq-head">Customize Request</div>

            </div> */}

        <div className='cusreq-container'>

            <form className='cusreq-form'>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {errorMsg && <div className='error-msg'>{errorMsg}</div>}


                <h5> {product.producttitle} </h5>
                <h5> {product.producttype} </h5>
                <h5> Rs {product.price} </h5>


                <label>Height (in inches)</label>
                <input type="number" onChange={(e) => { setHeight(e.target.value) }} placeholder="Height" style={{ width: '130px' }}
                />

                <label>Width (in inches)</label>
                <input type="number" onChange={(e) => { setWidth(e.target.value) }} placeholder="Width" style={{ width: '130px' }}
                />

                <label>Length (in inches)</label>
                <input type="number" onChange={(e) => { setLength(e.target.value) }} placeholder="Length" style={{ width: '130px' }}
                />

                <label>Color</label>
                <input type="text" onChange={(e) => { setColor(e.target.value) }} placeholder="Color" style={{ width: '130px' }}
                />

                {/* <label>Material</label>
                <input type="text" onChange={(e) => { setMaterial(e.target.value) }} placeholder="Material" style={{ width: '130px' }}
                /> */}

                {/* <label>Fabric</label>
                <input type="text" onChange={(e) => { setFabric(e.target.value) }} placeholder="Fabric" style={{ width: '130px' }}
                /> */}

                <label>Description</label>
                <textarea type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Describe your customization request"
                ></textarea>

                <button type="submit" onClick={handleCombinedClick}>Submit Request</button>

            </form>
        </div>
    </div>
)
}

export default CustomizeReq