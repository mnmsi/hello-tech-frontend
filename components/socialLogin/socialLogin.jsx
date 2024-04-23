import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useGoogleLoginMutation } from "@/redux/services/auth";
import { getCookie, setCookie } from "cookies-next";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import style from "@/styles/components/socialSignIn.module.scss";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/checkAuth";
import { useDispatch } from "react-redux";

const SocialLogin = () => {
  const redirectUrl = getCookie("hello_tech_visited_url");
  const dispatch = useDispatch();
  const router = useRouter();
  // handle login function

  const [googleLogin, { data, error, isLoading }] = useGoogleLoginMutation();
  useEffect(() => {
    if (data) {
      setCookie("token", data?.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      if (redirectUrl) {
        router.push(`${redirectUrl}`);
      } else {
        router.push(`/`);
      }
      dispatch(fetchUser());
    }
  }, [data]);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
  const app = initializeApp(firebaseConfig);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    uid: "",
    name: "",
    token: "",
    avatar: "",
  });

  //*********************** Handle Facebook Login Start ***********************//
  const handleFaceBook = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        let name = response?.user?.displayName ?? "test";
        let email = response?.user?.email;
        let uid = response?.user?.uid;
        let token = response?.credential?.accessToken;
        let avatar = response?.user?.photoURL;
        let typeUser =
          response?.operationType === "signIn"
            ? "Login Successful"
            : "Signup Successful";
        setFormData({
          ...formData,
          email: email,
          uid: uid,
          name: name,
          token: token,
          avatar: avatar,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //*********************** Handle Google Login End ***********************//
  //*********************** Handle Google Login ***********************//
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        let name = response?.user?.displayName ?? "test";
        let email = response?.user?.email;
        let uid = response?.user?.uid;
        let token = response.user?.accessToken;
        let avatar = response?.user?.photoURL;
        let typeUser =
          response?.operationType === "signIn"
            ? "Login Sucessfull"
            : "Signup Sucessfull";
        setFormData({
          ...formData,
          email: email,
          uid: uid,
          name: name,
          token: token,
          avatar: avatar,
        });
        googleLogin({
          email: email,
          uid: uid,
          name: name,
          token: token,
          avatar: avatar,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //*********************** Handle Google Login End ***********************//
  return (
    <div>
      {/*    auth sign in start*/}
      <div className={style.social_auth_wrapper}>
        <button onClick={handleGoogle}>
          <img
            src="/icons/social/a_google.svg"
            alt="social"
            height="40px"
            width="40px"
          />
        </button>
        {/*<button onClick={handleFaceBook}>*/}
        {/*  <img*/}
        {/*    src="/icons/social/a_facebook.svg"*/}
        {/*    alt="social"*/}
        {/*    height="40px"*/}
        {/*    width="40px"*/}
        {/*  />*/}
        {/*</button>*/}
        {/*<button onClick={handleApple}>*/}
        {/*  <img*/}
        {/*    src="/icons/social/a_apple.svg"*/}
        {/*    alt="social"*/}
        {/*    height="40px"*/}
        {/*    width="40px"*/}
        {/*  />*/}
        {/*</button>{" "}*/}
      </div>
      {/*    auth sign in end*/}
    </div>
  );
};

export default SocialLogin;
