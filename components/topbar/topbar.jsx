import style from "@/styles/components/topbar.module.scss";
import { useGetSiteSettingsQuery } from "@/redux/services/auth";
import LazyImage from "@/components/ui/LazyImage";

const Topbar = () => {
  const { data: siteSettings } = useGetSiteSettingsQuery();
  return (
    <section className={style.topbar_wrapper}>
      <div className="container">
        <div className={style.nav_content_wrapper}>
          <div className={style.social_icon}>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/hellotechbd.store"
                >
                  <LazyImage
                      height={24}
                      width={24}
                    src="/icons/social/facebook.svg"
                    alt="facebook"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/hellotech">
                  <LazyImage
                        height={24}
                        width={24}
                    src="/icons/social/linkedin.svg"
                    alt="facebook"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.tiktok.com/@hellotechbd.store">
                  <LazyImage
                    height={24}
                    width={24}
                    src="/icons/social/tiktok.svg"
                    alt="facebook"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://youtube.com/@hellotechbangladesh"
                >
                  <LazyImage
                    height={24}
                    width={24}
                    src="/icons/social/youtube.svg"
                    alt="whatsapp"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className={style.contact_info}>
            <ul>
              <li>
                <a href={`tel:${siteSettings?.phone}`}>
                  <LazyImage
                    src="/icons/contact/phone.svg"
                    alt="facebook"
                    width="20px"
                    height="20px"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{siteSettings?.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteSettings?.email}`}>
                  <LazyImage
                    src="/icons/contact/email.svg"
                    alt="twitter"
                    width="24px"
                    height="24px"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{siteSettings?.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
