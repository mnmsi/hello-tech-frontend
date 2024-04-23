import React, { useEffect, useState } from "react";
import styles from "@/styles/components/addAddress.module.scss";
import Radio from "@/components/ui/radio";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/textArea";
import Select2 from "@/components/ui/select2";
import { Controller, useForm } from "react-hook-form";
import CheckBox from "@/components/ui/checkbox";
import {
  useEditAddressQuery,
  useUpdateAddressMutation,
  useGetCityQuery,
  useGetAreaQuery,
  useGetDivisionQuery,
} from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
const EditAddress = ({ id }) => {
  const [city, setCity] = useState(skipToken);
  const [area, setArea] = useState(skipToken);

  const router = useRouter();
  const [updateAddress, { isLoading: updateAddressLoading }] =
    useUpdateAddressMutation();
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { currentData: editAddressData, isLoading: editAddressLoading } =
    useEditAddressQuery(id);
  useEffect(() => {
    setValue("address_label", editAddressData?.data?.data);
    setValue("name", editAddressData?.data?.name);
    setValue("phone", editAddressData?.data?.phone);
    setValue("address_line", editAddressData?.data?.address_line);
    setValue("zip_code", editAddressData?.data?.zip_code);
    setValue("division", {
      value: editAddressData?.data?.division_id,
      label: editAddressData?.data?.division,
    });
    setValue("city", {
      value: editAddressData?.data?.city_id,
      label: editAddressData?.data?.city,
    });
    setValue("area", {
      value: editAddressData?.data?.area_id,
      label: editAddressData?.data?.area,
    });
    setValue("email", editAddressData?.data?.email ?? "");
    setValue("is_default", editAddressData?.data?.is_default ?? false);
    setValue("address_label", editAddressData?.data?.type ?? "");
  }, [editAddressData?.data]);
  const [active, setActive] = useState("");
  const { data, isLoading } = useGetDivisionQuery();
  const division = watch("division");
  const watchCity = watch("city");
  const handleDivision = (value) => {
    setValue("city", "");
    setValue("area", "");
  };
  const handleCity = (value) => {
    setValue("area", "");
  };
  // **************** Handle Form **************** //
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("type", data.address_label);
    formData.append("address_line", data.address_line);
    formData.append("division_id", data.division?.value);
    formData.append("city_id", data.city?.value);
    formData.append("area_id", data.area?.value);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("is_default", data.is_default ? 1 : 0);
    updateAddress({ id: id, data: formData })
      .unwrap()
      .then((res) => {
        toast.success("Address updated successfully");
        router.back();
        // router.push("/account/address");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
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
              handleDivision(e.value);
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
              handleCity(e.value);
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
  return (
    <div className={styles.add_address_wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.section_header}>
          <h2>Edit Address</h2>
        </div>
        <div className={styles.form_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_group}>
              <div className="row">
                <div className="col-lg-6">
                  <div className={styles.label}>Address Label</div>
                  <div className={styles.radio_wrapper}>
                    <label
                      htmlFor="home"
                      className={`${styles.radio_item} ${
                        active === "home" ? styles.active : ""
                      }`}
                    >
                      <Controller
                        control={control}
                        rules={{ required: "Address label is required" }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Radio
                            onChange={(e) => {
                              onChange(e);
                              setActive(e.target.value);
                            }}
                            defaultChecked={
                              editAddressData?.data?.type === "home"
                            }
                            value="home"
                            ref={ref}
                            label="Home"
                            id="home"
                            name="address_label"
                          />
                        )}
                        name="address_label"
                      />
                    </label>
                    <label
                      htmlFor="work"
                      className={`${styles.radio_item} ${
                        active === "work" ? styles.active : ""
                      }`}
                    >
                      <Controller
                        control={control}
                        rules={{ required: "Address label is required" }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Radio
                            onChange={(e) => {
                              onChange(e);
                              setActive(e.target.value);
                            }}
                            defaultChecked={
                              editAddressData?.data?.type === "work"
                            }
                            value="work"
                            ref={ref}
                            label="Work"
                            id="work"
                            name="address_label"
                          />
                        )}
                        name="address_label"
                      />
                    </label>
                    <label
                      htmlFor="other"
                      className={`${styles.radio_item} ${
                        active === "other" ? styles.active : ""
                      }`}
                    >
                      <Controller
                        control={control}
                        rules={{ required: "Address label is required" }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Radio
                            onChange={(e) => {
                              onChange(e);
                              setActive(e.target.value);
                            }}
                            value="other"
                            ref={ref}
                            defaultChecked={
                              editAddressData?.data?.type === "other"
                            }
                            label="Other"
                            id="other"
                            name="address_label"
                          />
                        )}
                        name="address_label"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
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
              {errors?.address_label?.message && (
                <div className="text-danger" style={{ fontSize: "12px" }}>
                  {errors?.address_label?.message}
                </div>
              )}
            </div>

            <div className={styles.form_group}>
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
                        placeholder="Enter your dddress"
                      />
                    )}
                    name="address_line"
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_group}>
              <div className="row">
                <div className="col-lg-6 mb-lg-0 mb-4">{renderDistricts}</div>
                <div className="col-lg-6 mb-lg-0 mb-4">{renderCity}</div>
              </div>
            </div>
            <div className={styles.form_group}>
              <div className="row">
                <div className="col-lg-6 ">{renderArea}</div>
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <Controller
                    rules={{
                      required: "Phone is required",
                    }}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        value={value || ""}
                        ref={ref}
                        error={errors?.phone?.message}
                        onChange={onChange}
                        label="Phone"
                        placeholder="Phone"
                      />
                    )}
                    name="phone"
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_group}>
              <div className="row">
                <div className="col-lg-9">
                  <div className={styles.save_as_wrapper}>
                    <div className={styles.label}>Save As</div>
                    <div className={styles.radio_wrapper}>
                      <Controller
                        control={control}
                        defaultValue={
                          editAddressData?.data?.is_default ? "true" : "false"
                        }
                        render={({ field: { onChange, value, ref } }) => (
                          <CheckBox
                            onChange={onChange}
                            defaultChecked={
                              editAddressData?.data?.is_default ? true : false
                            }
                            value={value || ""}
                            ref={ref}
                            label="Default Address"
                            id="default_address"
                          />
                        )}
                        name="is_default"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.button_wrapper}>
              <div className="row">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <button type="submit">Save Address</button>
                </div>
                <div className="col-lg-6">
                  <button
                    type="button"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
