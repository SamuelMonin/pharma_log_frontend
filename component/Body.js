import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Login from './Login';
import Menu from './Menu';
import CommandList from './CommandList';
import DeliveryMenList from './DeliveryMenList';
import ProductList from './ProductList';
import UserList from './UserList';
import AddCommand from './AddCommand';
import AddDeliveryMen from './AddDeliveryMen';
import AddProducts from './AddProducts';
import AddUsers from './AddUsers';

export default function Body() {

    const showLogin = useSelector((state) => state.view.showLogin)
    const showMenu = useSelector((state) => state.view.showMenu)
    const showCommandList = useSelector((state) => state.view.showCommandList)
    const showDeliveryMenList = useSelector((state) => state.view.showDeliveryMenList)
    const showProductList = useSelector((state) => state.view.showProductList)
    const showUserList = useSelector((state) => state.view.showUserList)
    const showAddCommand = useSelector((state) => state.view.showAddCommand)
    const showAddDeliveryMen = useSelector((state) => state.view.showAddDeliveryMen)
    const showAddProducts = useSelector((state) => state.view.showAddProducts)
    const showAddUsers = useSelector((state) => state.view.showAddUsers)


    if(showLogin === true){
        return(
            <Login/>
        )
    }

    if(showMenu === true){
        return(
            <Menu/>
        )
    }

    if(showCommandList === true){
        return(
            <CommandList/>
        )
    }

    if(showDeliveryMenList === true){
        return(
            <DeliveryMenList/>
        )
    }

    if(showProductList === true){
        return(
            <ProductList/>
        )
    }

    if(showUserList === true){
        return(
            <UserList/>
        )
    }

    if(showAddCommand === true){
        return(
            <AddCommand/>
        )
    }

    if(showAddDeliveryMen === true){
        return(
            <AddDeliveryMen/>
        )
    }

    if(showAddProducts === true){
        return(
            <AddProducts/>
        )
    }

    if(showAddUsers === true){
        return(
            <AddUsers/>
        )
    }

}