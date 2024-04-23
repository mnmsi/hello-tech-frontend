import { useEffect } from "react";
import style from "@/styles/components/mainMenu.module.scss";
import Link from "next/link";
import SearchBar from "@/components/searchBar/searchBar";
import { fetchUser } from "@/redux/features/checkAuth";
import {
  useGetWishlistQuery,
  useGetCartQuery,
  useGetSiteSettingsQuery,
  useGuestCartListQuery,
} from "@/redux/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import LazyImage from "@/components/ui/LazyImage";

const MainMenu = () => {
  const { data: guestCartData, isLoading } = useGuestCartListQuery();
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
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);
  const CountMenuItems = (icon, link, count) => {
    return (
      <li className={style.counter_menu_item}>
        <Link href={link}>
          <img loading="lazy" src={icon} alt="icon" width={42} height={42} />
          {count && <span>{count}</span>}
        </Link>
      </li>
    );
  };
  let renderMenu;
  if (!login) {
    renderMenu = (
      <>
        <li className={`${style.preorder_button} ${style.login_btn}`}></li>
        {CountMenuItems("/common/user.svg", "/login")}
        {CountMenuItems(
          "/common/cart.svg",
          "/guest-cart",
          guestCartData?.data?.length > 0 ? guestCartData?.data?.length : null
        )}
      </>
    );
  } else {
    renderMenu = (
      <>
        {CountMenuItems("/common/user.svg", "/profile")}
        {CountMenuItems(
          "/common/heart.svg",
          "/wishlist",
          wishlist?.data?.length > 0 ? wishlist?.data?.length : null
        )}
        {CountMenuItems(
          "/common/cart.svg",
          "/cart",
          cart?.data?.length > 0 ? cart?.data?.length : null
        )}
      </>
    );
  }
  return (
    <section className={style.main_menu_wrapper}>
      <div className="container">
        <div className={style.main_menu_content_wrapper}>
          <div className={style.brand}>
            <div className="row align-items-center">
              <div className="col-lg-3">
                {!siteLoading && (
                  <Link href="/">
                    {siteSettings?.header_logo ? (
                      <img
                        loading="lazy"
                        src={siteSettings?.header_logo}
                        alt="logo"
                        // width={69}
                        // height={52}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : null}
                  </Link>
                )}
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-7">
                    <SearchBar />
                  </div>
                  <div className="col-lg-5">
                    <ul className={style.counter_menu}>
                      <li className={style.preorder_button}>
                        <Link href="/pre-order">
                          {" "}
                          <img
                            loading="lazy"
                            src="/common/preorder.svg"
                            alt="preorder"
                            width={39}
                            height={39}
                          />
                          <span>Pre Order</span>
                        </Link>
                      </li>
                      {!loading && renderMenu}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainMenu;
