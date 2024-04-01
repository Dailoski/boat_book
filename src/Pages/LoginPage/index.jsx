import React from "react";
import "./login-page.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import WrapperLogin from "../../Components/WrapperLogin";
import LogInHeader from "../../Components/LoginHeader";

const LoginPage = () => {
  return (
    <div className="div-login-page">
      <LogInHeader />
      <WrapperLogin />
      <Footer />
    </div>
  );
};

export default LoginPage;
