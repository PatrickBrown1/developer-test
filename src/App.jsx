import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItem } from './redux/actions';
import styled from 'styled-components'

const Screen = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgb(209, 209, 209);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const WishlistContainer = styled.div`
    height: 540px;
    width: 400px;
    background-color: rgb(252, 192, 203);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    h1 {
        font-size: 24px;
        margin: 0;
    }
    border-radius: 12px;
    box-shadow: 0px 0px 12px 0px #000000;

`;
const WishlistDiv = styled.div`
    max-height: 280px;
    min-height: 280px;
    width: 280px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    background-color: white;
    border: 1px solid black;
    * {
        display: block;
        overflow-wrap: anywhere;
        margin: 1em 1em 0em 1em;
    }
`;
const Button = styled.button`
    width: ${props => props.half ? "140px" : "280px"};
    min-height: 36px;
    color: black;
    font-weight: bold;
    background-color: rgb(145, 235, 146);
    border: 0px solid black;
    border-radius: 5px;
    box-shadow: 0px 0px 4px 0px #000000;
`;
const TextInput = styled.input`
    height: 12px;
    width: 253px;
    padding: 0px;
    padding: 1em;
    border: 1px solid black;
    border-radius: 5px;
`;
const App = (props) => {
    // inputWish tracks the user's current wish input
    const [inputWish, setInputWish] = useState("");
    
    // validates inputWish, adds inputWish (state) to wishList
    const handleAdd = () => {
        // make sure input is valid, no empty or no already existing
        if(inputWish === "" || props.wishList.includes(inputWish)){
            return;
        }
        // add current input wish to state
        props.addItem(inputWish);
        // clear current wish input
        setInputWish("");
    }
    // removes item from wishList
    const handleRemove = (item) => {
        props.deleteItem(item);
    }
    // clears wishList and text input if it's not empty, alert user if sent
    const handleSubmit = () => {
        if(props.wishList.length > 0){
            setInputWish("")
            props.wishList.forEach(each => handleRemove(each));
            alert("Wish list submitted to Santa!")
        }
    }
    return (
        <Screen>
            <WishlistContainer>
                <h1>MY WISHLIST</h1>
                <WishlistDiv>
                    {
                        props.wishList.map(item => (
                            <p onClick={() => handleRemove(item)}>{item}</p>
                        ))
                    }
                </WishlistDiv>
                <TextInput type="text" value={inputWish} onChange={e => setInputWish(e.target.value)}>
                </TextInput>
                <Button half onClick={() => handleAdd(inputWish, setInputWish)}>
                    Add
                </Button>
                <Button onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </WishlistContainer>
        </Screen>
    )
}

const mapStateToProps = state => ({wishList: state.wishList});
export default connect(
  mapStateToProps,
  {addItem, deleteItem},
)(App);