"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/template/checkout.module.scss";
import { useForm, Controller } from "react-hook-form";
// import ShippingAddress from "@/components/template/shippingAddress/shippingAddress";
// import { useForm } from "react-hook-form";
import Radio from "@/components/ui/radio";
import LazyImage from "@/components/ui/LazyImage";
import Checkbox from "@/components/ui/checkbox";
import Link from "next/link";
import {
  useGetDeliveryOptionsQuery,
  useGetPaymentMethodsQuery,
  useGetVoucherCodeMutation,
  useOrderFromBuyNowMutation,
  useGetSelectedProductMutation,
  useSelectedAddressQuery,
  useGuestOrderFromBuyNowMutation,
  useSelectedGuestCartMutation,
  useAddAddressMutation,
  useShippingChargeMutation,
  useGetDivisionQuery,
  useGetCityQuery,
  useGetAreaQuery,
} from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import TextArea from "@/components/ui/textArea";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "@/components/addAddress/addAddress";
import { skipToken } from "@reduxjs/toolkit/query";
import { updateAddressInfo } from "@/redux/features/selectAddress";
import dynamic from "next/dynamic";

const Select2 = dynamic(() => import("@/components/ui/select2"), {
  ssr: false,
});
import Input from "@/components/ui/Input";
import { forEach } from "react-bootstrap/ElementChildren";
import DataLayer from "@/components/dataLayer/dataLayer";
import PhoneNumberInput from "@/components/phoneInput/phoneInput";
import PhoneInput from "react-phone-input-2";
import { Form } from "react-bootstrap";

const TemplateCheckout = () => {
  const [orderFromGuestBuyNow, { isLoading: guestOrderLoading }] =
    useGuestOrderFromBuyNowMutation();
  const childButtonRef = useRef();
  const { delivery_option_name, delivery_fee, delivery_option_id } =
    useSelector((state) => state.address);
  const [orderFromBuyNow, { isLoading: orderLoading }] =
    useOrderFromBuyNowMutation();
  const [
    getSelectedProduct,
    { data: productFromCartData, isLoading: productLoading },
  ] = useGetSelectedProductMutation();

  const [selectedGuestCart, { data: guestCartData }] =
    useSelectedGuestCartMutation();
  const router = useRouter();
  const [isAddressSuccess, setIsAddressSuccess] = useState(false);
  const [deliveryId, setDeliveryId] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [voucher, setVoucher] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [product, setProduct] = useState(null);
  const [voucher_id, setVoucherId] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [isAccept, setIsAccept] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const token = getCookie("token");
  const { data: deliveryOptions, isLoading: deliveryLoading } =
    useGetDeliveryOptionsQuery();
  //******************** Handle Address ********************//
  useEffect(() => {
    if ((delivery_option_name, delivery_fee, delivery_option_id)) {
      setAddressId(1);
      setDeliveryPrice(parseInt(delivery_fee));
      setDeliveryId(delivery_option_id);
    }
  }, [delivery_option_name, delivery_fee, delivery_option_id]);
  //******************** Handle Delivery Options ********************//
  const handleDeliveryOptions = (id, amount) => {
    setDeliveryId(id);
    setDeliveryPrice(amount);
  };

  //******************** Handle Payment Method ********************//
  const handlePaymentMethod = (id) => {
    setPaymentMethodId(id);
  };
  const { data: paymentMethods, isLoading: paymentLoading } =
    useGetPaymentMethodsQuery();
  let renderPaymentMethods = null;
  if (!paymentLoading) {
    renderPaymentMethods = paymentMethods?.data?.map((method, index) => (
      <React.Fragment key={index}>
        <label
          htmlFor={method.name.split(" ").join("")}
          className={`${styles.payment_radio_button} ${
            paymentMethodId === method.id && styles.radio_active
          } `}
        >
          <Radio
            defaultChecked={method.id === 1}
            key={method.id}
            label={method.name}
            name="payment_method"
            id={method.name.split(" ").join("")}
            onChange={() => handlePaymentMethod(method.id)}
          />
          {method.id === 1 ? (
            <img src="/icons/checkout/cash.png" alt="icon" />
          ) : (
            <img src="/icons/checkout/payment.png" alt="icon" />
          )}
        </label>
      </React.Fragment>
    ));
  } else {
    renderPaymentMethods = <p>Loading...</p>;
  }

  // user address

  let renderDeliveryOptions = null;
  if (!deliveryLoading) {
    renderDeliveryOptions = deliveryOptions?.data?.map((option) => (
      <Radio
        key={option.id}
        label={option.name}
        name="delivery_options"
        id={option.id}
        onChange={() => handleDeliveryOptions(option.id, option.amount)}
      />
    ));
  } else {
    renderDeliveryOptions = <p>Loading...</p>;
  }

  //******************** Handle Voucher ********************//
  const [addVoucher, { isLoading: voucherLoading }] =
    useGetVoucherCodeMutation();
  const handleVoucher = (e) => {
    e.preventDefault();
    let params = {
      code: voucher,
      amount: subTotal,
    };
    addVoucher(params)
      .unwrap()
      .then((res) => {
        toast.success("Voucher Applied Successfully");
        setVoucher("");
        setSubTotal(res.data.discount_amount);
        setVoucherId(res.data.id);
        setDiscountAmount(res.data.value);
        setDiscountType(res.data.type);
      })
      .catch((err) => {
        toast.error("Invalid Voucher Code");
      });
  };

  //****************** Load Product If Buy Now ******************//

  useEffect(() => {
    let product = getCookie("buyNow");
    if (product) {
      setProduct(JSON.parse(product));
      setSubTotal(JSON.parse(product).product_price);
    } else {
      if (token) {
        getSelectedProduct()
          .unwrap()
          .then((res) => {
            setProduct(null);
            let totalPrice = 0;
            // console.log(res?.data);
            if (res?.data?.length) {
              res?.data?.map((product) => {
                // console.log(product.total_price);
                totalPrice += parseInt(product.total_price);
              });
              setSubTotal(totalPrice);
            } else {
              setSubTotal(0);
              router.push("/");
              toast.error("No Product Found");
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        selectedGuestCart()
          .unwrap()
          .then((res) => {
            setProduct(null);
            let totalPrice = 0;
            // console.log(res?.data);
            if (res?.data?.length) {
              res?.data?.map((product) => {
                // console.log(product.total_price);
                totalPrice += parseInt(product.total_price);
              });
              setSubTotal(totalPrice);
            } else {
              setSubTotal(0);
              router.push("/");
              toast.error("No Product Found");
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    }
  }, []);

  let renderProduct = null;
  if (product) {
    renderProduct = (
      <>
        {" "}
        {/*  single product card start*/}
        <div className={styles.product_card}>
          <div className={styles.image_wrapper}>
            <div className={styles.content_wrapper}>
              <LazyImage src={product?.image} alt="image" />
              <div>
                <h3>{product?.product_name}</h3>
                <div className={styles.price_wrapper}>
                  <div className={styles.colors}>
                    <p>Color: {product?.product_color_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.price_content}>
              <p>X {product?.quantity}</p>
              <p>৳ {product?.product_price}</p>
            </div>
          </div>
        </div>
        {/*  single product card end*/}
      </>
    );
  } else if (productFromCartData?.data?.length) {
    renderProduct = productFromCartData?.data?.map((product, index) => (
      <React.Fragment key={index}>
        {/*  single product card start*/}
        <div className={styles.product_card}>
          <div className={styles.image_wrapper}>
            <div className={styles.content_wrapper}>
              <LazyImage src={product?.image_url} alt="image" />
              <div>
                <h3>{product?.name}</h3>
                <div className={styles.price_wrapper}>
                  <div className={styles.colors}>
                    <p>Color: {product?.color_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.price_content}>
              <p>X {product?.quantity}</p>
              <p>৳ {product?.price}</p>
            </div>
          </div>
        </div>
        {/*  single product card end*/}
      </React.Fragment>
    ));
  } else if (guestCartData?.data?.length) {
    renderProduct = guestCartData?.data?.map((product, index) => (
      <React.Fragment key={index}>
        {/*  single product card start*/}
        <div className={styles.product_card}>
          <div className={styles.image_wrapper}>
            <div className={styles.content_wrapper}>
              <LazyImage src={product?.image_url} alt="image" />
              <div>
                <h3>{product?.name}</h3>
                <div className={styles.price_wrapper}>
                  <div className={styles.colors}>
                    <p>Color: {product?.color_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.price_content}>
              <p>X {product?.quantity}</p>
              <p>৳ {product?.price}</p>
            </div>
          </div>
        </div>
        {/*  single product card end*/}
      </React.Fragment>
    ));
  }

  function openExternalLink(url) {
    if (typeof window !== "undefined") {
      let a = document.createElement("a");
      a.href = url;
      a.click();
    }
  }

  // ******************** Handle Submit ********************//

  const [
    addAddress,
    {
      isSuccess: addressSuccess,
      isError: addressError,
      isLoading: addressLoading,
    },
  ] = useAddAddressMutation();

  // address functionality start
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const dispatch = useDispatch();
  const [city, setCity] = useState(skipToken);
  const [area, setArea] = useState(skipToken);
  const { data, isLoading } = useGetDivisionQuery();
  const handleDivision = (value) => {
    setValue("city", "");
    setValue("area", "");
    shippingCharge(value.label)
      .unwrap()
      .then((res) => {
        dispatch(
          updateAddressInfo({
            delivery_fee: res.data?.amount,
            delivery_option_id: res?.data.id,
            delivery_option_name: res.data?.name,
          }),
        );
      });
  };
  const [shippingCharge, { data: shippingData }] = useShippingChargeMutation();
  const handleCity = (value) => {
    setValue("area", "");
  };
  // **************** Handle Districts **************** //
  let renderDistricts = null;
  if (data?.data) {
    let district = data?.data?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    renderDistricts = (
      <Controller
        name="division"
        control={control}
        defaultValue={null}
        rules={{ required: "Division is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={(e) => {
              onChange(e);
              setCity(e.value);
              handleDivision(e);
            }}
            value={value || null}
            ref={ref}
            options={district}
            label="Division"
            placeholder="Select Division"
            error={errors?.division?.message}
          />
        )}
      />
    );
  } else {
    renderDistricts = (
      <Controller
        name="division"
        control={control}
        defaultValue={null}
        rules={{ required: "Division is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={(e) => {
              onChange(e);
              setCity(e.value);
            }}
            value={value || null}
            ref={ref}
            options={[]}
            label="Division"
            placeholder="Select Division"
            error={errors?.division?.message}
          />
        )}
      />
    );
  }
  // **************** Handle City **************** //
  const { data: cityData, isLoading: cityLoading } = useGetCityQuery(city);
  let renderCity = null;
  if (cityData?.data) {
    let city = cityData?.data?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    renderCity = (
      <Controller
        name="city"
        control={control}
        defaultValue={null}
        rules={{ required: "City is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={(e) => {
              onChange(e);
              setArea(e.value);
              handleCity(e);
            }}
            value={value || null}
            ref={ref}
            options={city}
            label="City"
            placeholder="Select City"
            error={errors?.city?.message}
          />
        )}
      />
    );
  } else {
    renderCity = (
      <Controller
        name="city"
        control={control}
        defaultValue={null}
        rules={{ required: "City is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={(e) => {
              onChange(e);
              setArea(e.value);
            }}
            value={value || null}
            ref={ref}
            options={[]}
            label="City"
            placeholder="Select City"
            error={errors?.city?.message}
          />
        )}
      />
    );
  }
  // **************** Handle Area **************** //
  const { data: areaData, isLoading: areaLoading } = useGetAreaQuery(area);
  let renderArea = null;
  if (areaData?.data) {
    let area = areaData?.data?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    renderArea = (
      <Controller
        name="area"
        control={control}
        defaultValue={null}
        rules={{ required: "Area is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={onChange}
            value={value || null}
            ref={ref}
            options={area}
            label="Area"
            placeholder="Select Area"
            error={errors?.area?.message}
          />
        )}
      />
    );
  } else {
    renderArea = (
      <Controller
        name="area"
        control={control}
        defaultValue={null}
        rules={{ required: "Area is required" }}
        render={({ field: { onChange, ref, value } }) => (
          <Select2
            onChange={onChange}
            value={value || null}
            ref={ref}
            options={[]}
            label="Area"
            placeholder="Select Area"
            error={errors?.area?.message}
          />
        )}
      />
    );
  }

  const [dataLayerData, setDataLayerData] = useState({});

  // address functionality end
  const handleBuy = async (data) => {
    if (!isAccept) {
      toast.error("Please Accept Terms & Conditions");
    } else if (!paymentMethodId) {
      toast.error("Please Select Payment Method");
    } else {
      let params = {
        name: data?.name,
        phone: data?.phone,
        address_line: data?.address_line,
        division_id: data?.division?.value,
        city_id: data?.city?.value,
        area_id: data?.area?.value,
        shipping_amount: deliveryPrice ? deliveryPrice : null,
        discount_rate: discountAmount,
        total_price: parseInt(subTotal) + parseInt(deliveryPrice),
        subtotal_price: subTotal,
        delivery_option_id: deliveryId ? deliveryId : null,
        payment_method_id: 1,
        product_color_id: product?.product_color_id,
        voucher_id: voucher_id,
        product_id: product?.product_id,
        quantity: product?.quantity,
        product_feature_id: JSON.stringify(product?.product_data),
        cart_id: productFromCartData?.data?.length
          ? productFromCartData?.data?.map((product) => product?.id)
          : null,
        order_note: orderNote,
      };
      if (token) {
        let ProductInfo = [];
        if (productFromCartData?.data?.length) {
          guestCartData?.data?.map((product) => {
            ProductInfo.push({
              product_name: product?.name,
              product_id: product?.product_id,
              quantity: product?.quantity,
              price: product?.price,
              product_code: product?.product_code,
            });
          });
          setDataLayerData({
            items: ProductInfo,
            revenue: parseInt(subTotal) + parseInt(deliveryPrice),
          });
        } else {
          let productInfo = [];
          productInfo.push({
            product_name: product?.product_name,
            product_id: product?.product_id,
            quantity: product?.quantity,
            price: product?.product_price,
            product_code: product?.product_code,
          });
          setDataLayerData({
            items: ProductInfo,
            revenue: parseInt(subTotal) + parseInt(deliveryPrice),
          });
        }
        orderFromBuyNow(params)
          .unwrap()
          .then((res) => {
            if (res.status === true) {
              deleteCookie("buyNow");
              toast.success("Order Placed Successfully");
              let orderData = {
                date: new Date(),
                order_id: res.data?.order_id,
                order_key: res.data?.order_key,
                transaction_id: res.data?.transaction_id,
                total_price: res?.data?.total,
                payment_method:
                  paymentMethodId === 1 ? "Cash On Delivery" : "Online Payment",
              };
              setCookie("payment_success", JSON.stringify(orderData), {
                path: "/",
              });
              if (res.data?.data) {
                openExternalLink(res.data?.data);
              } else {
                // console.log(res.data);
                router.push(`/order/success`);
              }
            } else {
              toast.error(res.message);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error(err.message);
          });
      } else {
        let guestPrams = {
          ...params,
          guest_user_id: getCookie("guest_id"),
          guest_cart_id: guestCartData?.data?.length
            ? guestCartData?.data?.map((product) => product?.id)
            : null,
          shipping_amount: deliveryPrice ? deliveryPrice : 0,
          product_id: product?.product_id,
          quantity: product?.quantity,
          product_feature_id: JSON.stringify(product?.product_data),
          discount_rate: discountAmount,
          total_price: parseInt(subTotal) + parseInt(deliveryPrice),
          subtotal_price: subTotal,
        };
        let ProductInfo = [];
        if (guestCartData?.data?.length) {
          guestCartData?.data?.map((product) => {
            ProductInfo.push({
              product_name: product?.name,
              product_id: product?.product_id,
              quantity: product?.quantity,
              price: product?.price,
              product_code: product?.product_code,
            });
          });
          setDataLayerData({
            items: ProductInfo,
            revenue: parseInt(subTotal) + parseInt(deliveryPrice),
          });
        } else {
          ProductInfo.push({
            product_name: product?.product_name,
            product_id: product?.product_id,
            quantity: product?.quantity,
            price: product?.product_price,
            product_code: product?.product_code,
          });
          setDataLayerData({
            items: ProductInfo,
            revenue: parseInt(subTotal) + parseInt(deliveryPrice),
          });
        }
        orderFromGuestBuyNow(guestPrams)
          .unwrap()
          .then((res) => {
            deleteCookie("buyNow");
            toast.success("Order Placed Successfully");
            let orderData = {
              date: new Date(),
              order_id: res.data?.order_id,
              order_key: res.data?.order_key,
              transaction_id: res.data?.transaction_id,
              total_price: res?.data?.total,
              payment_method:
                paymentMethodId === 1 ? "Cash On Delivery" : "Online Payment",
            };
            setCookie("payment_success", JSON.stringify(orderData), {
              path: "/",
            });
            if (res.data?.data) {
              openExternalLink(res.data?.data);
            } else {
              // console.log(res.data);
              router.push(`/order/success`);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error("something went wrong");
          });
      }
    }
  };
  return (
    <div className={styles.form_wrapper}>
      <form
        onSubmit={handleSubmit(handleBuy)}
        className={styles.checkout_content_wrapper}
      >
        <div className={styles.checkout_wrapper}>
          <div className={styles.address_wrapper}>
            <div className={styles.address_header}>
              <h2>Customer Information</h2>
            </div>
            <div className={styles.address_content}>
              <div className={` col-lg-12 `}>
                <Controller
                  rules={{
                    required: "Name is required",
                  }}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      onChange={onChange}
                      ref={ref}
                      value={value || ""}
                      error={errors?.name?.message}
                      label="Full Name"
                      placeholder="Enter your name"
                    />
                  )}
                  name="name"
                />
              </div>
            </div>
            <div className={styles.address_content}>
              <div className="row">
                <div className="col-lg-12">
                  <Controller
                    rules={{
                      required: "Address Line is required",
                    }}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <TextArea
                        onChange={onChange}
                        ref={ref}
                        value={value || ""}
                        error={errors?.address_line?.message}
                        label="Address Line"
                        placeholder="Enter your address"
                      />
                    )}
                    name="address_line"
                  />
                </div>
              </div>
            </div>
            <div className={styles.address_content}>
              <div className="row">
                <div className="col-lg-12">{renderDistricts}</div>
              </div>
            </div>
            <div className={styles.address_content}>
              <div className="row">
                <div className="col-lg-12">{renderCity}</div>
              </div>
            </div>
            <div className={styles.address_content}>
              <div className="row">
                <div className="col-lg-12">{renderArea}</div>
              </div>
            </div>
            <div className={styles.address_content}>
              <div className="row">
                <div className="col-lg-12">
                  <Controller
                    rules={{
                      required: "Phone is required",
                      validate: (value) =>
                        value.length === 13 || "Invalid phone number",
                    }}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="phone_input_wrapper checkout_phone">
                        <label htmlFor="">Phone</label>
                        <PhoneInput
                          country={"bd"}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          value={value || ""}
                          onChange={onChange}
                        />
                      </div>
                    )}
                    name="phone"
                  />
                  {errors?.phone?.message && (
                    <Form.Text
                      className="text-danger ms-3"
                      style={{ fontSize: "12px" }}
                    >
                      {errors?.phone?.message}
                    </Form.Text>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.address_content}>
              <div className={styles.order_note_content_wrapper}>
                <div className={styles.order_header}>
                  <h2>Order Note</h2>
                </div>
                <div className={styles.textarea_wrapper}>
                  <TextArea
                    name="order_note"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Enter order note (optional)"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*    product area start*/}
          <div className={styles.product_area_wrapper}>
            <div className={styles.product_area}>
              <div className={styles.delivery_options_wrapper}>
                <div className={`${styles.delivery_options_items}`}>
                  <h2 className={styles.card_title}>Delivery Options</h2>
                  <div className={styles.radio_item}>
                    <Radio
                      className="delivery_options_radio"
                      checked={delivery_option_name === "Inside Dhaka"}
                      disabled={true}
                      label="Inside Dhaka"
                      name=""
                      id="insideDhaka"
                    />
                    <Radio
                      className="delivery_options_radio"
                      checked={delivery_option_name === "Outside Dhaka"}
                      disabled={true}
                      label="Outside Dhaka"
                      name=""
                      id="outSidedeDhaka"
                    />
                  </div>
                </div>
                <div className={styles.payment_method_wrapper}>
                  <h2 className={styles.card_title}>Payment Method</h2>
                  <div className={styles.radio_items_wrapper}>
                    {renderPaymentMethods}
                  </div>
                </div>
              </div>
              {/*<div className={styles.section}>*/}
              {/*  <div className={styles.section_header}>*/}
              {/*    <h2>Delivery Options</h2>*/}
              {/*  </div>*/}
              {/*  <div className={styles.delivery_options}>*/}
              {/*    {renderDeliveryOptions}*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className={styles.section}></div>*/}
              <div className={styles.voucher_wrapper}>
                <div className={styles.section_header}>
                  <h2>Add Coupon or Voucher</h2>
                </div>
                <div className={styles.voucher}>
                  <div>
                    <input
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      name="voucher"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                    <button
                      onClick={handleVoucher}
                      style={{
                        cursor: voucherLoading ? "not-allowed" : "pointer",
                      }}
                      disabled={voucherLoading}
                      type="button"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.section_product_area}>
                <div className={styles.section_header}>
                  <h2>Order Summary</h2>
                  {renderProduct}
                  {/*    order summary area start*/}
                  <div className={styles.order_summary_wrapper}>
                    <div className={styles.subtotal}>
                      <p>Subtotal</p>
                      <p>৳ {subTotal}</p>
                    </div>
                    <div className={styles.subtotal}>
                      <p>Discount</p>
                      <p>
                        {discountType === "amount" ? "৳" : "%"} {discountAmount}
                      </p>
                    </div>
                    <div className={styles.shipping}>
                      <p>Shipping</p>
                      <p>৳ {deliveryPrice}</p>
                    </div>
                    <div className={styles.total}>
                      <p>Total</p>
                      <p>৳ {parseInt(subTotal) + parseInt(deliveryPrice)}</p>
                    </div>
                  </div>
                  {/*    order summary area end*/}
                </div>
              </div>
              <div className={styles.submit_wrapper}>
                <div className={styles.terms_wrapper}>
                  <Checkbox
                    handleChange={() => setIsAccept(true)}
                    name="terms"
                    id="terms"
                  />
                  <label htmlFor="terms">
                    By clicking "Proceed to Payment", you agree to our{" "}
                    <Link href="/terms-and-conditions">Terms of Service</Link>
                  </label>
                </div>
                <button
                  style={{
                    cursor:
                      orderLoading || guestOrderLoading
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={orderLoading || guestOrderLoading}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
          {/*    product area end*/}
        </div>
      </form>
      <DataLayer checkout={dataLayerData} />
    </div>
  );
};

export default TemplateCheckout;
