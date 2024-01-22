import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import useGetData from './useGetData';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'


const AdminAPBED = () => {
    const { data: productData } = useGetData('product-BED')

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'product-BED', id))
    }

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
                                            <Link to={`/UpdateBed/${item.id}`}><button className='btn-edit' >Update</button></Link></td>
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

export default AdminAPBED