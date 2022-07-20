import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controlls/Controls";
import Summary from "./Summary/Summary";

import { 
    Modal, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
    Button } from "reactstrap";
    import { connect } from "react-redux";
    import {addIngredient,removeIngredient,updatePurchasable} from '../../redux/actionCreator.js';

// const INGREDIENT_PRICES = {
//     salad:20,
//     cheese:40,
//     meat:90, 
//   }

const mapStateToProps = (state) => {
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable,
    }
}

 const mapDispatchToProps = dispatch => {
    return {
            addIngredient:(igtype) =>dispatch(addIngredient(igtype)),
            removeIngredient:(igtype) =>dispatch(removeIngredient(igtype)),
            updatePurchasable:()=>dispatch(updatePurchasable()),
        }
    }

class BurgerBuilder extends Component {
   
    state = {
        // ingredients:[
        //     {
        //         type:'salad', 
        //         amount:0
        //     },
        //     {
        //         type:'cheese', 
        //         amount:0
        //     },
        //     {
        //         type:'meat', 
        //         amount:0
        //     }
        // ],
        // totalPrice:50,
        modalOpen:false,
        // purchasable:false

    }

    // updatePurchasable = ingredients =>{
    //     const sum = ingredients.reduce((sum,element)=>{
    //         return sum +element.amount;
    //     },0);
    //     this.setState({
    //         purchasable: sum > 0
    //     })
    // }

    addIngredientHandle = type =>{
       this.props.addIngredient(type);
       this.props.updatePurchasable();
    } // more button's function for redux

    removeIngredientHandle = type =>{
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    } // less button function for redux

    toggleModal = ()=>{
        this.setState({modalOpen:!this.state.modalOpen})
    } // click to open modal (pop-up)

    render(){
        return(
            <div>
               <div className="d-flex flex-md-row flex-column">
                 <Burger ingredients={this.props.ingredients} /> {/*
                 1st display the burger with top and bottom bread only  */}
                 <Controls 
                 ingredientAdded={this.addIngredientHandle} 
                 ingredientRemove={this.removeIngredientHandle}  
                 price={this.props.totalPrice}
                 purchasable={this.props.purchasable}
                 toggleModal={this.toggleModal}/>
                 {/* thn display the controls card with less more button modal also part of it coz the button which will display the modal ww will create in control component */}
                </div>

             <Modal isOpen={this.state.modalOpen}>
                 <ModalHeader>Your Order Summary</ModalHeader>
                 <ModalBody>
                    <h5>Total Price {this.props.totalPrice.toFixed(0)} BDT</h5> 
                    <Summary ingredients={this.props.ingredients} />
                 </ModalBody>
                 <ModalFooter>
                    <Button style={{backgroundColor:"#D70F64"}}  >Continue to Checkout</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                 </ModalFooter>
             </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);
