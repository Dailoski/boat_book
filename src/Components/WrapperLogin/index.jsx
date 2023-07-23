import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { applicationContext } from "../../context";
import {useNavigate} from "react-router-dom"
import { auth } from "../../firebase";
import * as yup from "yup";
import "./wrapper-login.scss";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
const WrapperLogin = () => {
  const navigate = useNavigate();
  const adminID = "32HKi0Q7dVQ1zQX4xnhnn1mKNpH3";
  const { setAccessToken, setIsAdmin, setUser, userData, setUserData } =
    useContext(applicationContext);
  const [wrongCredentials, setWrongCredentials] = useState("");
  const defaultLoginValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: yup
      .string()
      .required("Please choose your password")
      .min(6, "Minimum 6 characters"),
  });
  const signIn = (values) => {
    signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then(async(userCredential) => {
        setAccessToken(userCredential.user.accessToken);
        console.log(userCredential.user.uid)
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const docsData = docSnap.data()
        console.log(docsData)
        if (userCredential?.user?.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userCredential?.user?.accessToken)
          );

          setUserData(docsData)
          localStorage.setItem(
            "userData",
            JSON.stringify(docsData)
          );

          setUser(values.email)
          localStorage.setItem(
            "user",
            JSON.stringify(values.email)
          );
        }
        if (userCredential?.user?.uid === adminID) {
          setIsAdmin(adminID)
          localStorage.setItem(
            "admin", JSON.stringify(adminID)
          );
          navigate("/admin_page");
        } else navigate("/reservation");
      })
      .catch(() => {
        setWrongCredentials("Please insert correct credentials");
      });
  };

  return (
    <div className="div-wrapper-login">
      <Formik
        initialValues={defaultLoginValue}
        validationSchema={validationSchema}
        onSubmit={signIn}
      >
        <section>
          <Form>
            <h1>LogIn</h1>
            <Field  type="text" name="email" placeholder="Email" style={{    height: "44px", fontSize: "20px"}} />
            <p className="error-handle">
              <ErrorMessage name="email" />
            </p>
            <Field type="password" name="password" placeholder="Password" style={{    height: "44px", fontSize: "20px"}} />
            <p className="error-handle">
              <ErrorMessage name="password" />
            </p>
            <button type="submit" className="submit-btn login">
              LogIn
            </button>
            <p className="error-handle">{wrongCredentials}</p>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default WrapperLogin;
