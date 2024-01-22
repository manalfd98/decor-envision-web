import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

const AdminAPCHAIR = () => {
    const useGetData = () => {
        const [data, setData] = useState([])
        const collectionRef = collection(db, "product-CHAIR")

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
        await deleteDoc(doc(db, 'product-CHAIR', id))
    }


    const { data: productData } = useGetData('product-CHAIR')

    return (
        <div>

            <div className='table-container' style={{ marginLeft: '15px' }}>
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
                                        <Link to={`/UpdateChair/${item.id}`}><button class="btn-edit" >Update</button></Link></td>
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

export default AdminAPCHAIR