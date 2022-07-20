import React,{Component} from "react";
import {Button} from 'reactstrap'

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
        console.log(this.state.values);
    }

    render(){
       return(
         <div>
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
export default Checkout;