import { doc, setDoc, updateDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../FirebaseConfig/FirebaseConfig';
import './CartCard.css'
import deletebtn from '../Components/Assets/deletebtn.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import ViewCustomize from '../ViewCustomize';
import ViewData from './ViewData';
import { addDoc, query, where, getDocs, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig/FirebaseConfig'


const CartCard = (props) => {
    const [prodquantity, setProdQuantity] = useState(props.itemdata.qty);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let p = props.itemdata.product.price
    let mrp = parseInt(p)
    const saleprice = (mrp) * prodquantity

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
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
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

    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `Cart-${loggeduser[0].uid}`

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
            }).catch('Error Error Error')
        }
        getcartdata()

    }
    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(db, `Cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
            qty: prodquantity + 1
        }).then(() => { console.log('changed quantity') })
        console.log(itemref)
        // console.log(props.itemdata.id)
    }
    const decreasequantity = async () => {
        if (prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(db, `Cart-${props.userid}`, `${props.itemdata.id}`)
            await updateDoc(itemref, {
                qty: prodquantity - 1
            }).then(() => { console.log('changed quantity') })
            console.log(itemref)
        }
        else {
            await deleteDoc(doc(db, `Cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
        }
    }

    const deletecartitem = async () => {
        await deleteDoc(doc(db, `Cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
    }

    // const useGetData = () => {
    //     const [data, setData] = useState([])
    //     const collectionRef = collection(db, "customizereq")

    //     useEffect(() => {
    //         const getData = async () => {
    //             await onSnapshot(collectionRef, (snapshot) => {
    //                 setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //             });
    //         }
    //         getData()
    //     }, [])

    //     return { data };
    // };

    // const { data: customData } = useGetData('customizereq')


    return (
        <div className='cart-prod-container'>
            <div className='cart-prod-imgtitle'>
                <div className='prod-image'><img src={props.itemdata.product.productimage} alt='' /> </div>
                <div className='prod-title'>{props.itemdata.product.producttitle}
                    <h3 className='customize-text' onClick={handleShow}>{props.itemdata.producttext}</h3>

                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>View Customization Data </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ViewData itemdata={props.itemdata}  {...props.itemdata} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal></div>


            </div>
            <div className='prodquantity-div'>
                <button onClick={increasequantity}>+</button>
                <p>{prodquantity}</p>
                <button onClick={decreasequantity}>-</button>
            </div>
            <div className='prodprice'>Rs {saleprice}</div>
            <button className='deletebtn' onClick={deletecartitem}>
                <img src={deletebtn} alt='' />
            </button>

        </div >


    )
}

export default CartCard