import styles from "@/styles/components/mobile/mobileNav.module.scss";
import Link from "next/link";
import SearchBar from "@/components/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCartQuery,
  useGetSiteSettingsQuery,
  useGetWishlistQuery,
} from "@/redux/services/auth";
import { fetchUser } from "@/redux/features/checkAuth";
import LazyImage from "@/components/ui/LazyImage";
import style from "@/styles/components/navbar.module.scss";
// import style from "@/styles/components/mainMenu.module.scss";
const MobileNav = ({ category }) => {
  const token = getCookie("token");
  const { data, loading, login } = useSelector((state) => state.checkAuth);
  const { data: wishlist } = useGetWishlistQuery(token);
  const { data: cart } = useGetCartQuery();
  const { data: siteSettings, isLoading: siteLoading } =
    useGetSiteSettingsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [login]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleLogin = () => {
    setShow(false);
    router.push("/login");
  };
  const CountMenuItems = (icon, link, count) => {
    return (
      <li className={styles.counter_menu_item}>
        <Link href={link}>
          <img loading="lazy" src={icon} alt="icon" width={36} height={36} />
          {count && <span>{count}</span>}
        </Link>
      </li>
    );
  };
  let renderMenu;
  const [isExpand, setIsExpand] = useState(true);
  const handleDropdown = () => {
    if (isExpand) {
      setIsExpand(false);
    } else {
      setIsExpand(true);
    }
  };
  const [activeCategory, setActiveCategory] = useState(0);
  const handleCategory = (id) => {
    if (activeCategory === id) {
      setActiveCategory(0);
    } else {
      setActiveCategory(id);
    }
  };
  return (
    <div className={styles.mobile_nav_wrapper}>
      <div className={styles.nav_content_wrapper}>
        {show ? (
          <div className={styles.left_side}>
            <button type="button" onClick={() => setShow(false)}>
              <img src="/icons/close.svg" alt="bar" />
            </button>
          </div>
        ) : (
          <div className={styles.left_side}>
            <button type="button" onClick={() => setShow(true)}>
              <img src="/icons/bar.svg" alt="bar" />
            </button>
          </div>
        )}
        <div className={styles.right_sie}>
          <Link href="/">
            <LazyImage
              height="36px"
              width="54px"
              src={siteSettings?.header_logo}
              alt="logo"
            />
          </Link>
          {/*<ul className={styles.counter_menu}>{!loading && renderMenu}</ul>*/}
        </div>
      </div>
      <div className={styles.nav_searchbar_wrapper}>
        <SearchBar />
      </div>
      <Offcanvas className="offcanvas_wrapper" show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <div className={styles.offcanvas_body}>
            <div className={styles.offcanvas_menu}>
              <div className={styles.nav_title}>MENU</div>
              <ul>
                <li onClick={handleClose}>
                  <Link href="/">Home</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/new-arrivals">New Arrivals</Link>
                </li>
                <li>
                  <div>
                    <Link
                      className={styles.active_parent_menu}
                      onClick={handleClose}
                      href="/products/gadgets"
                    >
                      Gadgets
                    </Link>
                  </div>
                  {isExpand && (
                    <ul className={styles.sub_dropdown_item}>
                      {category?.map((item) => {
                        return (
                          <li key={item.id}>
                            <div
                              className={
                                item?.sub_categories?.length > 0
                                  ? styles.active_sub_dropdown_item
                                  : ""
                              }
                            >
                              <div onClick={handleClose}>
                                <Link href={`/products/${item.slug}`}>
                                  {item.name}
                                </Link>
                              </div>
                              {item?.sub_categories?.length > 0 && (
                                <div className={styles.sub_dropdown_icon}>
                                  {activeCategory === item.id ? (
                                    <img
                                      src="/icons/minus.svg"
                                      alt="expand"
                                      onClick={() => handleCategory(item.id)}
                                    />
                                  ) : (
                                    <img
                                      src="/icons/plus.svg"
                                      alt="expand"
                                      onClick={() => handleCategory(item.id)}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                            {item?.sub_categories?.length > 0 && (
                              <ul
                                className={
                                  activeCategory === item.id
                                    ? styles.active_sub_dropdown_item_menu
                                    : "d-none"
                                }
                              >
                                {item?.sub_categories?.map((subItem) => {
                                  return (
                                    <li onClick={handleClose} key={subItem.id}>
                                      <Link href={`/products/${subItem.slug}`}>
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <li onClick={handleClose}>
                  <Link href="/brands">Brands</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/promotional-product">
                    <div className={style.hot_nav_item}>
                      <img
                        height="20px"
                        width="20px"
                        src="/images/flame.gif"
                        alt=""
                      />
                      <span>Hot Offer</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            {/*<div className={styles.offcanvas_footer}>*/}
            {/*  <div className={styles.nav_title}>My Account</div>*/}
            {/*  <div className={styles.offcanvas_footer_menu}>*/}
            {/*    <ul>*/}
            {/*      {login && (*/}
            {/*        <>*/}
            {/*          <span className="count-text" onClick={handleClose}>*/}
            {/*            {CountMenuItems("/common/user.svg", "/profile")}*/}
            {/*            My Account*/}
            {/*          </span>*/}
            {/*          <span className="count-text" onClick={handleClose}>*/}
            {/*            {CountMenuItems(*/}
            {/*              "/common/heart.svg",*/}
            {/*              "/wishlist",*/}
            {/*              wishlist?.data?.length > 0*/}
            {/*                ? wishlist?.data?.length*/}
            {/*                : null*/}
            {/*            )}*/}
            {/*            Favourites{" "}*/}
            {/*          </span>*/}
            {/*          <span className="count-text" onClick={handleClose}>*/}
            {/*            {CountMenuItems(*/}
            {/*              "/common/cart.svg",*/}
            {/*              "/cart",*/}
            {/*              cart?.data?.length > 0 ? cart?.data?.length : null*/}
            {/*            )}*/}
            {/*            My Cart*/}
            {/*          </span>*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*  {!login && (*/}
            {/*    <div className={styles.button_wrapper}>*/}
            {/*      <button onClick={handleLogin}>*/}
            {/*        <img*/}
            {/*          src="/icons/login_ic.svg"*/}
            {/*          alt="image"*/}
            {/*          className="img-fluid"*/}
            {/*        />*/}
            {/*        Login*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MobileNav;
