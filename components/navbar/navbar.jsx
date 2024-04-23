import Link from "next/link";
import React from "react";
import style from "@/styles/components/navbar.module.scss";
const Navbar = ({ data, error }) => {
  let renderCategory = null;
  if (data?.length) {
    renderCategory = data?.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div
            className={`${style.dropdown_item} ${
              item.sub_categories.length ? style.dropdown_item_active : null
            }`}
          >
            <Link href={`/products/${item.slug}`}>
              <span>{item.name}</span>
              {item.sub_categories.length > 0 && (
                <img src="/icons/dropdown-arrow.svg" alt="" />
              )}
            </Link>
            {item.sub_categories.length > 0 && (
              <div className={style.dropdown_sub}>
                {item.sub_categories.map((sub, index) => {
                  return (
                    <Link href={`/products/${sub.slug}`} key={index}>
                      <span>{sub.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </React.Fragment>
      );
    });
  }
  return (
    <nav className={style.nav_wrapper}>
      <div className="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/new-arrivals">Tending</Link>
          </li>

          <li className={style.dropdown_wrapper}>
            <Link href="/products/gadgets">Gadgets</Link>
            {!error ? (
              <div className={style.dropdown}>{renderCategory}</div>
            ) : null}
          </li>
          <li>
            <Link href="/brands">Brands</Link>
          </li>
          <li>
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
    </nav>
  );
};

export default Navbar;
