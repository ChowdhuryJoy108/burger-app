import React from "react";  
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";

import  { Routes,Route } from 'react-router-dom';


const Main = () => {
    return(
        <div>
            <Header />
            <div className="container">
                <Routes>
                <Route path="/" exact element={<BurgerBuilder/>} />
                <Route path="/Orders" element={<Orders/>} />
                <Route path="/Checkout" element={<Checkout/>} />
                </Routes>
               
            {/* <BurgerBuilder /> */}

            </div>
            
        </div>

    );

}
export default Main;