import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'


const AdminAPSOFA = () => {
    const useGetData = () => {
        const [data, setData] = useState([])
        const collectionRef = collection(db, "product-SOFA")

        useEffect(() => {
            const getData = async () => {
                await onSnapshot(collectionRef, (snapshot) => {
                    setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                });
            }
            getData()
        }, [])


        return { data };
    };

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'product-SOFA', id))
    }


    const { data: productData } = useGetData('product-SOFA')

    return (
        <div>

            <div className='table-container'>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productData.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.productimage} alt="" width="100" height="100" />
                                    </td>
                                    <td>{item.producttitle}</td>
                                    <td>{item.producttype}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <td><button className='btn-delete' onClick={() => { deleteProduct(item.id) }}>Delete</button>
                                        <Link to={`/UpdateSofa/${item.id}`}><button className='btn-edit' >Update</button></Link></td>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default AdminAPSOFA