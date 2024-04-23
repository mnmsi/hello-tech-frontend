"use client";
import React from "react";
import style from "@/styles/components/footer.module.scss";
import Link from "next/link";
import { useGetSiteSettingsQuery } from "@/redux/services/auth";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  let path = pathname.split("/")[1];
  const { data: siteSettings, isLoading: siteLoading } =
    useGetSiteSettingsQuery();
  const BottomFooter = () => {
    return (
      <section className={style.bottom_footer_wrapper}>
        <div className="container">
          <p className="m-0">
            &copy; Copyright Hello Tech Ltd. {new Date().getFullYear()}{" "}
          </p>
        </div>
      </section>
    );
  };

  return (
    <footer>
      <div className={style.footer_wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className={style.footer_logo}>
                {!siteLoading && (
                  <img
                    loading="lazy"
                    width={150}
                    height={72}
                    src={siteSettings?.footer_logo ?? "/images/logo.png"}
                    alt="logo"
                  />
                )}
              </div>
              <p className={style.address}>
                {siteSettings?.site_address ?? ""}
              </p>
              <div className={style.contact_info}>
                <ul>
                  <li>
                    <a href={`tel:${siteSettings?.phone ?? ""}`}>
                      <img
                        loading="lazy"
                        src="/icons/contact/phone.svg"
                        alt="facebook"
                        width={20}
                        height={20}
                        style={{ objectFit: "cover" }}
                      />
                      <span>{siteSettings?.phone ?? ""}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${siteSettings?.email ?? ""}`}>
                      <img
                        src="/icons/contact/email.svg"
                        alt="twitter"
                        width={20}
                        height={20}
                        style={{ objectFit: "cover" }}
                      />
                      <span>{siteSettings?.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className={style.footer_menu}>
                <h4>About</h4>
                <ul>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/about">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/about">Updates</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className={style.footer_menu}>
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/products/gadgets">Our Store</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 mt-lg-0 mt-5">
              <div className={style.footer_menu}>
                <h4>Customer Service</h4>
                <ul>
                  <li>
                    <Link href="/about">Refund Policy</Link>
                  </li>
                  <li>
                    <Link href="/about">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/products/gadgets">Our Store</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter />
    </footer>
  );
};

export default Footer;
