import React, { useEffect, useMemo, useState } from "react";
import ProfileSidebar from "@/components/template/profileSidebar/profileSidebar";
import Input from "@/components/ui/Input";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/services/auth";
import { Controller, useForm } from "react-hook-form";

const Profile = () => {
  const { data: user, isError } = useGetUserQuery();
  const [updateUser, { data, error, isLoading }] = useUpdateUserMutation();
  const router = useRouter();
  const cookie = getCookie("token");
  useEffect(() => {
    if (!cookie || isError) {
      router.push("/login");
      toast.error("Please login first");
    }
  }, [cookie, user]);
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };

  //****************** Form Submission ******************//
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  });

  useEffect(() => {
    if (user?.data?.name) {
      setValue("name", user?.data?.name);
    }
    if (user?.data?.phone) {
      setValue("phone", user?.data?.phone);
    }
    if (user?.data?.email) {
      setValue("email", user?.data?.email);
    }
  }, [user]);

  const onsubmit = async (data) => {
    const { name, phone, email } = data;
    const payload = {
      name,
      phone,
      email,
    };
    try {
      const response = await updateUser(payload).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container">
      <div className="profile_page_wrapper">
        <div className="sidebar_content_wrapper">
          <ProfileSidebar />
        </div>
        <div className="offcanvas_button_wrapper">
          <button onClick={handleSidebar}>
            <img src="/icons/accounts.svg" alt="l" className="img-fluid" />
            <span>My Accounts</span>
          </button>
        </div>
        <div className="main_content_wrapper">
          <div className="section_wrapper">
            <div className="section_header">
              <h2>Account Settings</h2>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="section_content">
                <div className="row mb-4">
                  <div className="col-lg-12">
                    <Controller
                      control={control}
                      rules={{
                        required: "Name is required",
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          ref={ref}
                          error={errors?.name?.message}
                          placeholder="Enter your name"
                          label="Name"
                        />
                      )}
                      name="name"
                    />
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <Controller
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          ref={ref}
                          disabled={!!user?.data?.phone}
                          error={errors?.phone?.message}
                          placeholder="Add Phone Number"
                          label="Phone Number"
                        />
                      )}
                      name="phone"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Controller
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          ref={ref}
                          disabled={!!user?.data?.email}
                          error={errors?.email?.message}
                          placeholder="Add Email Address"
                          label="Email Address"
                        />
                      )}
                      name="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <button
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                      disabled={isLoading}
                      className="submit_button"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Offcanvas
        className="profile_sidebar"
        show={show}
        onHide={() => setShow(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Accounts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProfileSidebar handleClose={() => setShow(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Profile;
