import React,{Component} from "react";
import {Button} from 'reactstrap'

import {connect} from 'react-redux';
import axios from 'axios';


const mapStateToProps = (state) => {
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable,
    }
}

class Checkout extends Component{
    state = {
        values:{
            deliveryAddress:"",
            phone:"",
            paymentMethod:"Open this select menu",
        }
    }

    goBack = () =>{
        this.props.history.goBack("/")
    }

    inputChangeHandler = (e)=>{
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]:e.target.value,
            }
        })
    }

    submitHandler = () =>{
       const order = {
            ingredients:this.props.ingredients,
            customer : this.state.values,
            price : this.props.totalPrice,
            orderTime:new Date(),

       }
       axios.post("https://burger-app-29c23-default-rtdb.firebaseio.com/orders.json",order)
       .then(res => console.log(res))
       .catch(err => console.log(err))
       console.log(order);
    }

    render(){
       return(
         <div>
            <h4 style={{
                border:'1px solid gray',
                padding:'20px',
                boxShadow:'1px 1px #888888',
                borderRadius:'5px',

            }}>Payment:{this.props.totalPrice}BDT</h4>

            <form style={{
                border:'1px solid gray',
                padding:'20px',
                boxShadow:'1px 1px #888888',
                borderRadius:'5px',

            }}>
                
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} class="form-control" id="textAreaExample6" rows="3" placeholder="Your address"  onChange={(e)=>this.inputChangeHandler(e)}></textarea>
                <br />
                <input name="phone" className="form-control" value={this.state.values.phone} placeholder="your phone NO"   onChange={(e)=>this.inputChangeHandler(e)}/>
                <br />
                <select name="paymentMethod" className="form-control" value={this.state.values.paymentMethod} onChange={(e)=>this.inputChangeHandler(e)} >
                    <option selected>Open this select menu</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button style={{backgroundColor:"#D70F64"}} onClick={this.submitHandler} >Place Order</Button>
                <Button color="secondary" style={{marginLeft:"5px"}} onClick={this.goBack}>Cancel Order</Button>
            </form>
         </div>
       )
    }
}
export default connect(mapStateToProps)(Checkout);