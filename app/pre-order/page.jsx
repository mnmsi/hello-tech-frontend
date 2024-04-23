"use client";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Banner from "@/components/banner/banner";
import style from "@/styles/pages/preOrder.module.scss";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/textArea";
import CheckBox from "@/components/ui/checkbox";
import { usePostPreOrderMutation } from "@/redux/services/preOrder";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const PreOrderPage = () => {
  const router = useRouter();
  const [postData, { isLoading, data, isError }] = usePostPreOrderMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Add an Image");
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const submit = async (data) => {
    let formData = new FormData();
    formData.append("product_name", data.product_name);
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    formData.append("phone", data.phone);
    formData.append("product_image", data.product_image);
    formData.append("name", data.name);
    formData.append("product_quantity", parseInt(data.quantity));
    await toast.promise(postData(formData), {
      loading: "Submitting...",
      success: "Pre-order submitted successfully",
      error: "Something went wrong",
    });
    await router.push("/");
  };
  // console.log(isLoading, isError);
  return (
    <div className="container ">
      <Banner image="images/banners/2.jpg" title="Pre Order" />
      <div className={style.preorder_title}>
        <h2>To pre-order, fill all the information's here</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="row">
            <h2 className={style.product_title}>Product Information</h2>
            <div className="col-lg-6 mb-lg-0 mb-4">
              <Controller
                rules={{
                  required: "Product name is required",
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    label="Product Name"
                    onChange={onChange}
                    value={value || ""}
                    ref={ref}
                    error={errors.product_name?.message}
                    placeholder="Enter product name or product url"
                  />
                )}
                name="product_name"
                control={control}
              />
            </div>
            <div className="col-lg-6">
              <div className={style.file_input_wrapper}>
                <label>Product Image</label>
                <Controller
                  name="product_image"
                  rules={{
                    required: "Product image is required",
                  }}
                  control={control}
                  render={({ field: onChange, ref }) => (
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={(e) => {
                        setFileName(
                          e.target.files[0].name.length > 20
                            ? e.target.files[0].name.slice(0, 20) + "..."
                            : e.target.files[0].name
                        );
                        onChange.onChange(e.target.files[0]);
                      }}
                    />
                  )}
                />
                <div className={style.input} onClick={handleFileUpload}>
                  <img src="/icons/file.svg" alt="upload" />
                  <span>{fileName}</span>
                </div>
              </div>
              {errors.product_image && (
                <span className={style.input_error}>
                  {errors.product_image?.message}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <h2 className={`${style.product_title} ${style.product_info}`}>
              Your Information
            </h2>
            <div className="col-lg-6 mb-4">
              <Controller
                control={control}
                rules={{
                  required: "Name is required",
                }}
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    ref={ref}
                    onChange={onChange}
                    value={value || ""}
                    label="Name"
                    error={errors.name?.message}
                    placeholder="Enter your name"
                  />
                )}
                name="name"
              />
            </div>
            <div className="col-lg-6 mb-4">
              <Controller
                control={control}
                rules={{
                  required: "Phone is required",
                }}
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    ref={ref}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.phone?.message}
                    label="Phone Number"
                    placeholder="Phone Number"
                  />
                )}
                name="phone"
              />
            </div>
            <div className="col-lg-6 mb-4">
              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    ref={ref}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.email?.message}
                    label="Email"
                    placeholder="Enter your email"
                  />
                )}
                name="email"
              />
            </div>
            <div className="col-lg-6 mb-4">
              <Controller
                control={control}
                rules={{
                  required: "Quantity is required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Quantity must be a number",
                  },
                  minLength: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                }}
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    label="Order Quantity"
                    error={errors.quantity?.message}
                    ref={ref}
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Enter order quantity"
                  />
                )}
                name="quantity"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Controller
                control={control}
                render={({ field: { onChange, ref, value } }) => (
                  <TextArea
                    label="Address"
                    error={errors.address?.message}
                    ref={ref}
                    rows={5}
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Enter your address"
                  />
                )}
                name="address"
              />
            </div>
          </div>
          <div className={style.checkbox_wrapper}>
            <Controller
              rules={{
                required: "Please accept the terms and conditions",
              }}
              render={({ field: { onChange, ref, value } }) => (
                <CheckBox
                  handleChange={onChange}
                  value={value || ""}
                  defaultChecked={value || ""}
                  ref={ref}
                  id="terms"
                />
              )}
              name="terms"
              control={control}
            />
            <label htmlFor="terms">
              I hereby accept the <Link href="/">terms and conditions</Link> of
              pre-order and read the pre-order{" "}
              <Link href="/">terms and conditions</Link> carefully.
            </label>
          </div>
          {errors.terms && (
            <span className={style.input_error}>{errors.terms?.message}</span>
          )}
          <div className={style.submit_btn}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreOrderPage;
