import { Poppins } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/app.scss";
import { ReduxProvider } from "@/redux/provider/provider";
import Footer from "@/components/footer/footer";
import FloatingCart from "@/components/floatingCart/floatingCart";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import MainHeader from "@/components/mainHeader/mainHeader";
// import Seo from "@/components/seo/seo";
const FloatingFooter = dynamic(
  () => import("@/components/floatingFooter/floatingFooter"),
  { ssr: false },
);
import MobileFooter from "@/components/mobileFooter/mobileFooter";

const MessengerChat = dynamic(
  () => import("@/components/messenger/messenger"),
  {
    ssr: false,
  },
);
const WelcomePopup = dynamic(
  () => import("@/components/welcomePopup/welcomePopup"),
  {
    ssr: false,
  },
);

const inter = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// export async function generateMetadata({ params }) {
//   const headersList = headers();
//   const domain = headersList.get("x-forwarded-host") || "";
//   const protocol = headersList.get("x-forwarded-proto") || "";
//   const pathname = headersList.get("x-invoke-path") || "";
//   const url = `${protocol}://${domain}${pathname}`;
//   const response = await fetch(
//     process.env.NEXT_PUBLIC_API_URL + `/seo-settings?page_url=${url}`,
//     { cache: "no-cache" },
//   );
//   const data = await response.json();
//   if (data?.data?.length > 0) {
//     return {
//       title: data?.data?.page_title,
//       description: data?.data?.page_description,
//       keywords: data?.data?.page_keywords?.split(","), // array of keywords
//     };
//   } else {
//     return {
//       title: "Hello Tech - Best Online Shopping Store in Bangladesh",
//       description:
//         "Hello Tech is a E-commerce Website for Gadgets and Tech Products",
//       keywords: [], // array of keywords
//     };
//   }
// }

export default function RootLayout({ children, stars }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WVJ6KNH8" />
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toaster position="top-right" />
        <MessengerChat />
        <ReduxProvider>
          <FloatingCart />
          <MainHeader />
          <div
            style={{
              minHeight: "calc(100vh - 400px)",
            }}
          >
            {children}
          </div>
          {/*<WelcomePopup />*/}
          <MobileFooter />
          <Footer />
          <FloatingFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}
