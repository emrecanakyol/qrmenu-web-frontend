import React from "react";
import Register from "@/containers/Auth/Register";
import Login from "@/containers/Auth/Login";

const page = () => {
    //Güvenlik amaçlı bilerek Register kapatıp Logine yönlendiriyoruz. 
    //return <Register />;
    return <Login />;
};

export default page; 