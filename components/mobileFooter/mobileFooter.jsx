"use client";
import styles from "@/styles/components/mobile/mobileFooter.module.scss";
import Link from "next/link";
import { useGetSiteSettingsQuery } from "@/redux/services/auth";
import LazyImage from "@/components/ui/LazyImage";

const MobileFooter = () => {
  const { data: siteSettings, isLoading: siteLoading } =
    useGetSiteSettingsQuery();
  return (
    <footer className={styles.footer_wrapper}>
      <div className={styles.single_footer_element}>
        <div className={styles.footer_title}>Useful Links</div>
        <div className={styles.footer_menu}>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Refund Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.single_footer_element}>
        <div className={styles.footer_title}>Contact Support</div>
        <div className={styles.footer_menu}>
          <a
            className={styles.items_contact}
            href={`tel:${siteSettings?.phone ?? ""}`}
          >
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
        </div>
        <div className={styles.footer_menu}>
          <p className={styles.hints}>
            No matter the hour, we're ready to assist you, 24/7.
          </p>
        </div>
        <div className={styles.footer_menu}>
          <a
            className={`${styles.items_contact} ${styles.email}`}
            href={`tel:${siteSettings?.phone ?? ""}`}
          >
            <img
              loading="lazy"
              src="/icons/contact/email.svg"
              alt="facebook"
              width={20}
              height={20}
              style={{ objectFit: "cover" }}
            />
            <span>{siteSettings?.phone ?? ""}</span>
          </a>
        </div>
      </div>
      <div className={styles.single_footer_element_social_media}>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/hellotechbd.store"
            >
              <LazyImage
                src="/icons/social/facebook.svg"
                alt="facebook"
                style={{ objectFit: "cover" }}
              />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/hellotech">
              <LazyImage
                src="/icons/social/linkedin.svg"
                alt="facebook"
                style={{ objectFit: "cover" }}
              />
            </a>
          </li>
          <li>
            <a target="_blank" href="tiktok.com/@hellotechbd.store">
              <LazyImage
                src="/icons/social/tiktok.svg"
                alt="facebook"
                style={{ objectFit: "cover" }}
              />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://youtube.com/@hellotechbangladesh">
              <LazyImage
                src="/icons/social/youtube.svg"
                alt="whatsapp"
                style={{ objectFit: "cover" }}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default MobileFooter;
