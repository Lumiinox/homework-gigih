import {Switch, Route, Redirect} from "react-router-dom";
import CreatePlayList from "./pages/create-playlist/index";
import Home from "./pages/home/index";
import {useSelector} from 'react-redux';
import React from "react";

export default function RoutingRender(){
    const loginStatus = useSelector((state) => state.loginStatus);
    return(
        <Switch>
            <Route path="/create-playlist">
                {loginStatus ? 
                <CreatePlayList/> 
                : 
                <Redirect exact from="/create-playlist" to="/"/>
                }
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    )
}
