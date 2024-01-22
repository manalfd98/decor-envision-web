import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile';
import PgFOF from './Components/PgFOF';
import AddProduct from './Components/AddProduct';
import Allproductpage from './Components/ProductComponents/Allproductpage';
import { Specificproductpage }  from './Components/ProductComponents/Specificproductpage';
import Admin from './Components/Admin/Admin';
import AdminAllproducts from './Components/Admin/AdminAllproducts';
import AdminUsers from './Components/Admin/AdminUsers'
import AdminOrders from './Components/Admin/AdminOrders'
import AboutUs from './Components/AboutUs';
import AdminAPBED from './Components/Admin/AdminAPBED';
import AdminAPCHAIR from './Components/Admin/AdminAPCHAIR';
import AdminAPSOFA from './Components/Admin/AdminAPSOFA';
import AdminAPTABLE from './Components/Admin/AdminAPTABLE';
import AdminProfile from './Components/Admin/AdminProfile';
import Categories from './Components/Categories';
import CheckOut from './Components/CheckOut'
import CustomizeReq from './Components/CustomizeReq';
import UpdateBed from './Components/Admin/UpdateBed';
import UpdateChair from './Components/Admin/UpdateChair';
import UpdateTable from './Components/Admin/UpdateTable';
import UpdateSofa from './Components/Admin/UpdateSofa';
import UpdateUser from './Components/Admin/UpdateUser';
import Shipping from './Components/Shipping';
import Payment from './Components/Payment';
import Wishlist from './Components/Wishlist';
import OrderSummary from './Components/OrderSummary';
import ViewData from './Components/ViewData';
import ViewOrder from './Components/Admin/ViewOrder';
import MyOrders from './Components/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />}/>
        <Route exact path="/userprofile" element={<UserProfile />}/>
        <Route exact path="/addproducts" element={<AddProduct />}/>
        <Route exact path="/aboutus" element={<AboutUs />}/>
        <Route exact path="/admin" element={<Admin />}/>
        <Route exact path="/admin/dashboard" element={<Admin type={'Dashboard'}/>}/>
        <Route exact path="/adminallproducts" element={<AdminAllproducts />}/>
        <Route exact path="/adminorders" element={<AdminOrders />}/>
        <Route exact path="/adminusers" element={<AdminUsers />}/>
        <Route exact path="/adminapbed" element={<AdminAPBED />}/>
        <Route exact path="/adminapchair" element={<AdminAPCHAIR />}/>
        <Route exact path="/adminapsofa" element={<AdminAPSOFA />}/>
        <Route exact path="/adminaptable" element={<AdminAPTABLE />}/>
        <Route exact path="/adminprofile" element={<AdminProfile />}/>
        <Route exact path='/categories' element={<Categories />}/>
        <Route exact path='/checkout/:id' element={<CheckOut />}/>        
        <Route exact path='/customizereq' element={<CustomizeReq />}/>
        <Route exact path='/shipping/:id' element={<Shipping />}/>
        
        <Route exact path='/wishlist' element={<Wishlist />}/>
        <Route exact path='/Ordersummary/:id' element={<OrderSummary />}/>
        <Route exact path='/ViewOrder/:id' element={<ViewOrder />}></Route>
        <Route exact path='/viewdata' element={<ViewData />}/>
        <Route exact path='/myorders' element={<MyOrders />}></Route>



        <Route exact path='/UpdateBed/:id' element={<UpdateBed />}/>
        <Route exact path='/UpdateTable/:id' element={<UpdateTable />}/>
        <Route exact path='/UpdateChair/:id' element={<UpdateChair />}/>
        <Route exact path='/UpdateSofa/:id' element={<UpdateSofa />}/>
        <Route exact path='/UpdateUser/:id' element={<UpdateUser />}/>


        {/* Routes should be dynamic */}
        <Route exact path="/product-type/sofa" element={<Allproductpage type={'Sofa'} />}/>
        <Route exact path="/product-type/bed" element={<Allproductpage type={'Bed'} />}/>
        <Route exact path="/product-type/chair" element={<Allproductpage type={'Chair'} />}/>
        <Route exact path="/product-type/table" element={<Allproductpage type={'Table'} />}/>
        <Route path="/product/:type/:id" element={<Specificproductpage/>}></Route>
        <Route exact path="/cartdata" element={<Cart />}></Route>
        <Route path="/shipping" element={<Shipping/>}></Route>
        <Route exact path='/payment/:id' element={<Payment />}/>
        <Route exact path="*" element={<PgFOF />} />
       </Routes>

    </BrowserRouter>
  );
}

export default App;