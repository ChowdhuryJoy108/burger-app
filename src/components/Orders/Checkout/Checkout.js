import React,{Component} from "react";
import {Button, Modal, ModalBody } from 'reactstrap'
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import {resetIngredient} from '../../../redux/actionCreator';


const mapStateToProps = (state) => {
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
            resetIngredient:()=>dispatch(resetIngredient()),
        }
    }
    

class Checkout extends Component{
    state = {
        values:{
            deliveryAddress:"",
            phone:"",
            paymentMethod:"Open this select menu",
        },

        isLoading : false,
        isModalOpen:false,
        modalMsg:"",

    }

    // goBack = () =>{
    //     this.props.history.goBack("/")
    // } // not working!

    toggleModal = () =>{
       this.setState({
        isModalOpen:!this.state.isModalOpen,
       })
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
        this.setState({
            isLoading:true
        })
       const order = {
            ingredients:this.props.ingredients,
            customer : this.state.values,
            price : this.props.totalPrice,
            orderTime:new Date(),

       }
       axios.post("https://burger-app-29c23-default-rtdb.firebaseio.com/orders.json",order)
       .then(res =>{
        if(res.status === 200){
            this.setState({
                isLoading:false,
                isModalOpen:true,
                modalMsg:"Order placed Successfully!"
            })
            this.props.resetIngredient();
        }else{
            this.setState({
                isLoading:false,
                isModalOpen:true,
                modalMsg:"Something went wrong, Order Again!"
            })
        }

       })
       .catch(err => {
        this.setState({
            isLoading:false,
            isModalOpen:true,
                modalMsg:"Something went wrong, Order Again!"
        })
       })

    //    console.log(order);
    }

    render(){
        let form = (<div>
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
                <Button style={{backgroundColor:"#D70F64"}} onClick={this.submitHandler} disabled={!this.props.purchasable} >Place Order</Button>
                <Button color="secondary" style={{marginLeft:"5px"}} onClick={this.goBack}>Cancel Order</Button>
            </form>
        </div>)
       return(
         <div>
           {this.state.isLoading ? <Spinner /> : form}
           <Modal isOpen={this.state.isModalOpen} onClick={this.toggleModal}>
            <ModalBody>
                <p>{this.state.modalMsg}</p>
            </ModalBody>

           </Modal>
         </div>
       )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);