import React, { useState } from "react";
import styles from "@/styles/template/changePassword.module.scss";
import ProfileSidebar from "@/components/template/profileSidebar/profileSidebar";
import Input from "@/components/ui/Input";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useChangePasswordMutation } from "@/redux/services/auth";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const { data, loading, login } = useSelector((state) => state.checkAuth);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const onSubmit = async (data) => {
    let formData = new FormData();
    if (data?.current_password) {
      formData.append("current_password", data.current_password);
    } else {
      formData.append("uid", data.uid);
    }
    formData.append("new_password", data.password);
    console.log(data);
    changePassword(formData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        router.push("/profile");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
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
        {data?.data && (
          <div className="main_content_wrapper">
            <div className="section_wrapper">
              <div className="section_header">
                <h2>Change Password</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="section_content">
                  {!data?.data?.uid ? (
                    <div className="row mb-4">
                      <div className="col-lg-6">
                        <Controller
                          control={control}
                          rules={
                            !data?.data?.uid && {
                              required: "Current password is required",
                            }
                          }
                          render={({ field: { onChange, value, ref } }) => (
                            <Input
                              type="password"
                              onChange={onChange}
                              value={value || ""}
                              error={errors.current_password?.message}
                              ref={ref}
                              placeholder="Enter your current password"
                              label="Current Password"
                            />
                          )}
                          name="current_password"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row mb-4 d-none">
                      <div className="col-lg-6">
                        <Controller
                          defaultValue={data?.data?.uid}
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <Input
                              type="text"
                              onChange={onChange}
                              value={value || ""}
                              ref={ref}
                              label="Current Password"
                            />
                          )}
                          name="uid"
                        />
                      </div>
                    </div>
                  )}

                  <div className="row mb-5">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <Controller
                        control={control}
                        rules={{
                          required: "New password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Input
                            type="password"
                            onChange={onChange}
                            value={value || ""}
                            error={errors.password?.message}
                            ref={ref}
                            placeholder="Enter your new password"
                            label="New Password"
                          />
                        )}
                        name="password"
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <Controller
                        control={control}
                        rules={{
                          required: "Confirm password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                          validate: (value) =>
                            value === getValues("password") ||
                            "The passwords do not match",
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Input
                            type="password"
                            onChange={onChange}
                            value={value || ""}
                            error={errors.confirm_password?.message}
                            ref={ref}
                            placeholder="Confirm your new password"
                            label="Confirm Password"
                          />
                        )}
                        name="confirm_password"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <button className="submit_button" type="submit">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
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

export default ChangePassword;
