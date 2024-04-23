// import React, { useEffect, useState } from "react";
// import styles from "@/styles/components/selectAddress.module.scss";
// import Radio from "@/components/ui/radio";
// import Link from "next/link";
// import Modal from "react-bootstrap/Modal";
// import { useRouter } from "next/navigation";
// // import {  } from "@/redux/services/auth";
// import { setCookie } from "cookies-next";
// import { useDispatch, useSelector } from "react-redux";
// import { updateAddressInfo } from "@/redux/features/selectAddress";
//
// const SelectAddress = ({ handleAddNewAddress, data }) => {
//   const dispatch = useDispatch();
//   const [selectedAddressMutation, { data: selectedAddressData, isLoading }] =
//     useSelectedAddressMutation();
//   const openAddressModal = () => {
//     setShow(true);
//   };
//   const [show, setShow] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const handleClose = () => setShow(false);
//
//   //********************* Handle Add New Address ********************//
//   useEffect(() => {
//     selectedAddressMutation(selectedAddress);
//     if (selectedAddressData?.data) {
//       dispatch(
//         updateAddressInfo({
//           selected_address_id: selectedAddressData?.data?.address?.id,
//           delivery_fee: selectedAddressData?.data?.options?.shipping_fee,
//           delivery_option_id: selectedAddressData?.data?.options?.shipping_id,
//         })
//       );
//     }
//   }, [selectedAddress]);
//
//   const handleSelectedAddress = (id) => {
//     setSelectedAddress(id);
//   };
//   //********************* Handle Shipping Address ********************//
//   let renderAddress = null;
//   if (selectedAddressData?.data?.address) {
//     dispatch(
//       updateAddressInfo({
//         selected_address_id: selectedAddressData?.data?.address?.id,
//         delivery_fee: selectedAddressData?.data?.options?.shipping_fee,
//         delivery_option_id: selectedAddressData?.data?.options?.shipping_id,
//       })
//     );
//     let address = selectedAddressData?.data?.address;
//     renderAddress = (
//       <div className={styles.address_body}>
//         <div className={styles.address_card}>
//           <div className={styles.radio_wrapper}>
//             <Radio defaultChecked />
//           </div>
//           <div className={styles.address_info}>
//             <h4
//               style={{
//                 textTransform: "capitalize",
//               }}
//             >
//               {address?.type}
//             </h4>
//             <p>
//               {address?.address_line} {address?.division} {address?.zip_code}
//               <br />
//               {address?.phone}
//             </p>
//           </div>
//         </div>
//         <div className={styles.add_address_button}>
//           <button onClick={handleAddNewAddress}>
//             <img
//               src="/images/pointer.svg"
//               alt="icon"
//               height="21px"
//               width="19px"
//             />
//             <span>Add Shipping Address</span>
//           </button>
//         </div>
//       </div>
//     );
//   }
//
//   let renderAllAddress = null;
//   if (data?.length > 0) {
//     renderAllAddress = data?.map((item, index) => (
//       <label
//         htmlFor={item?.id + item?.name.split(" ")[0]}
//         key={index}
//         className={styles.address_card}
//       >
//         <div className={styles.radio_wrapper}>
//           <Radio
//             onChange={() =>
//               handleSelectedAddress(
//                 item?.id,
//                 item.address_line,
//                 item.division,
//                 item.zip_code,
//                 item.phone
//               )
//             }
//             id={item?.id + item?.name.split(" ")[0]}
//             name="select"
//             defaultChecked={item.id === selectedAddress}
//           />
//         </div>
//         <div className={styles.address_info}>
//           <h4
//             style={{
//               textTransform: "capitalize",
//             }}
//           >
//             {item.type}
//           </h4>
//           <p>
//             {item.address_line} {item.division} {item.zip_code}
//             <br />
//             {item.phone}
//           </p>
//         </div>
//       </label>
//     ));
//   }
//
//   return (
//     <div>
//       <div className={styles.address_wrapper}>
//         <div className={styles.address_header}>
//           <h3>Shipping Address</h3>
//           <button className={styles.add_address} onClick={openAddressModal}>
//             <img src="/icons/change.svg" alt="icons" />
//             <span>Change</span>
//           </button>
//         </div>
//         {renderAddress}
//       </div>
//       <Modal
//         className="address_modal"
//         show={show}
//         onHide={handleClose}
//         animation={false}
//         centered
//         size="xl"
//       >
//         <Modal.Body>
//           <div className="icon_wrapper" onClick={handleClose}>
//             <img src="/images/close.svg" alt="" />
//           </div>
//           <div className={styles.modal_header}>
//             <h3>Saved Addresses</h3>
//           </div>
//           <div className={styles.modal_body}>
//             {renderAllAddress}
//             <div className={styles.button_wrapper}>
//               <div className="row">
//                 <div className="col-lg-4 col-6">
//                   <button onClick={handleClose} type="submit">
//                     Continue
//                   </button>
//                 </div>
//                 <div className="col-lg-4 col-6">
//                   <button type="reset" onClick={handleClose}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };
//
// export default SelectAddress;
