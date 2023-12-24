import React, {useEffect, useState} from "react";
import Preloader from "./components/generals/Preloader"
import './App.css';
import NavigationMenu from "./components/generals/NavMenu";
import {FloatButton} from "antd";
import Header from "./components/generals/Header";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import authService from "./services/authService";


const App = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();


    useEffect(() => {
        const refreshInterval = setInterval(() => {
            refreshToken();
        }, 4 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [user]);

    useEffect(() => {
        refreshToken();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2);
    }, []);

    const refreshToken = () => {
        console.log("Check for refresh");
        const userStr = sessionStorage.getItem("user");

        let userS = null;
        if (userStr) {
            userS = JSON.parse(userStr);
        } else if (localStorage.getItem("user")) {
            authService.logout();
        }
        console.log(userStr);
        if (userS) {
            const refresh_token = userS.refresh_token;
            authService.refresh(refresh_token, dispatch)
                .then((userData) => {
                    console.log("Refresh successful", userData);
                })
                .catch((error) => {
                    authService.logout();
                    console.error("Error during refresh", error);
                });
        }
    };
    return (
        <div className="App">
            {loading ? (
                <Preloader/>
            ) : (
                <div>
                    <Header/>
                    <NavigationMenu/>
                    <FloatButton.BackTop style={{width: "2.5%", height: "5%"}} visibilityHeight={100}/>
                </div>
            )}
        </div>
    );
}

export default App;
