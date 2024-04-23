// "use client";
// import { CustomChat, FacebookProvider } from "react-facebook";
//
// const Messenger = () => {
//   return (
//     <div className="messenger_chat">
//       <FacebookProvider appId="263460446653763" chatSupport>
//         <CustomChat pageId="116957431304449" minimized={true} />
//       </FacebookProvider>
//     </div>
//   );
// };
//
// export default Messenger;

"use client";
import React, { useEffect, useRef } from "react";

const Messenger = () => {
  const MessengerRef = useRef();
  useEffect(() => {
    MessengerRef.current.setAttribute("page_id", "159790223875407");
    MessengerRef.current.setAttribute("attribution", "biz_inbox");
    MessengerRef.current.setAttribute("referrerPolicy", "no-referrer");
    MessengerRef.current.setAttribute("data-guest", "true");
    // turn on guest mode

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v16.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div
        ref={MessengerRef}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </>
  );
};
export default Messenger;
