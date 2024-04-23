import React, { useEffect, useState } from "react";
import styles from "@/styles/template/profileSidebar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useLogoutQuery } from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/checkAuth";
import { useDispatch } from "react-redux";
import { useGetWishlistQuery } from "@/redux/services/wishlistSlice";
const ProfileSidebar = ({ handleClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isToken, setToken] = useState(skipToken);
  const { data, isSuccess } = useLogoutQuery(isToken);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout Successfully");
      deleteCookie("token", {
        path: "/",
      });
      router.push("/");
      dispatch(fetchUser());
    }
  }, [isSuccess]);
  const handleLogout = () => {
    dispatch(fetchUser());
    const token = getCookie("token");
    setToken(token);
  };

  return (
    <div className={styles.sidebar_wrapper}>
      <ul>
        <li>
          <Link
            onClick={handleClose}
            href="/profile"
            className={pathname === "/profile" ? styles.active : ""}
          >
            <img src="/icons/profile/1.svg" alt="icons" className="img-fluid" />
            <span>Account Settings</span>
          </Link>
        </li>
        <li onClick={handleClose}>
          <Link
            href="/profile/order"
            className={pathname === "/profile/order" ? styles.active : ""}
          >
            <img src="/icons/profile/2.svg" alt="icons" className="img-fluid" />
            <span>My Orders</span>
          </Link>
        </li>
        <li onClick={handleClose}>
          <Link
            href="/profile/address"
            className={pathname.includes("address") ? styles.active : ""}
          >
            <img src="/icons/profile/3.svg" alt="icons" className="img-fluid" />
            <span>Address Book</span>
          </Link>
        </li>
        <li onClick={handleClose}>
          <Link
            href="/profile/change-password"
            className={
              pathname === "/profile/change-password" ? styles.active : ""
            }
          >
            <img src="/icons/profile/4.svg" alt="icons" className="img-fluid" />
            <span>Change Password</span>
          </Link>
        </li>
        <li
          onClick={handleClose}
          style={{
            cursor: "pointer",
          }}
        >
          <a onClick={handleLogout}>
            <img src="/icons/profile/5.svg" alt="icons" className="img-fluid" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
