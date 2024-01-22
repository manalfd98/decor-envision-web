import { React} from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import './Adminallproducts.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminAPBED from './AdminAPBED';
import AdminAPSOFA from './AdminAPSOFA';
import AdminAPCHAIR from './AdminAPCHAIR';
import AdminAPTABLE from './AdminAPTABLE';

const AdminAllproducts = () => {

    return (
        <div>
            <AdminNavbar />
            <div className='container'>

                <h3>All Products</h3>
                <div className='allproduct'>
                    <br />
                    <Link to='/addproducts'><button>Add Products</button></Link>
                </div>
                <br/>

                <Tabs
                    id="uncontrolled-tab"
                    className="btn-tab"
                    fill
                >
                    <Tab eventKey="bed"  title="Bed">
                        <AdminAPBED />
                    </Tab>
                    <Tab eventKey="sofa" title="Sofa">
                        <AdminAPSOFA />
                    </Tab>
                    <Tab eventKey="chair" title="Chair">
                        <AdminAPCHAIR />
                    </Tab>
                    <Tab eventKey="table" title="Table">
                        <AdminAPTABLE />
                    </Tab>
                </Tabs>
                </div>
            </div>

    )
}

export default AdminAllproducts