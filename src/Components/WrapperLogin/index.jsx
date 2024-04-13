import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { applicationContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import * as yup from "yup";
import "./wrapper-login.scss";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material";
const WrapperLogin = () => {
  const navigate = useNavigate();
  const adminID = "32HKi0Q7dVQ1zQX4xnhnn1mKNpH3";
  const { setAccessToken, setIsAdmin, setUser, setUserData, setUid, uid } =
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
      .then(async (userCredential) => {
        setAccessToken(userCredential.user.accessToken);
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const docsData = docSnap.data();
        console.log(userCredential.user.uid);

        setUid(userCredential.user.uid);
        if (userCredential.user.uid) {
          localStorage.setItem("uid", JSON.stringify(userCredential.user.uid));
        }
        // console.log(uid);
        if (userCredential?.user?.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userCredential?.user?.accessToken)
          );

          setUserData(docsData);

          localStorage.setItem("userData", JSON.stringify(docsData));

          setUser(values.email);
          localStorage.setItem("user", JSON.stringify(values.email));
        }
        if (userCredential?.user?.uid === adminID) {
          setIsAdmin(adminID);
          localStorage.setItem("admin", JSON.stringify(adminID));
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
            <Field
              type="text"
              name="email"
              placeholder="Email"
              style={{
                backgroundColor: "white",
                height: "44px",
                fontSize: "20px",
                width: "100%",
              }}
            />
            <p className="error-handle">
              <ErrorMessage name="email" />
            </p>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              style={{
                backgroundColor: "white",
                height: "44px",
                fontSize: "20px",
                width: "100%",
              }}
            />
            <p className="error-handle">
              <ErrorMessage name="password" />
            </p>
            {/* <button
              type="submit"
              style={{ background: "transparent", border: "0" }}
            >
              <img
                className="pointer"
                src={`${process.env.PUBLIC_URL}/login2.png`}
                alt="pointer-img"
                style={{ width: "200px" }}
              />
            </button> */}
            <Button variant="contained" size="large" type="submit">
              LOG IN
            </Button>
            <p className="error-handle">{wrongCredentials}</p>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default WrapperLogin;
