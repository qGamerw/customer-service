import React, {useEffect, useState} from "react";
import Preloader from "./components/generals/Preloader"
import './App.css';
import NavigationMenu from "./components/generals/NavMenu";
import {FloatButton} from "antd";
import Header from "./components/generals/Header";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2);
  }, []);

  return (
      <div className="App">
        {loading ? (
            <Preloader />
        ) : (
            <div>
              <Header/>
              <NavigationMenu/>
              <FloatButton.BackTop style={{width: "2.5%", height:"5%"}} visibilityHeight={100} />
            </div>
        )}
      </div>
  );
}

export default App;