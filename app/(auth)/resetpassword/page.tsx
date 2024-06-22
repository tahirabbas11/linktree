'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const { resolvedTheme, theme } = useTheme();
    const currentTheme = resolvedTheme || theme;

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            // @ts-ignore
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const query = new URLSearchParams(window.location.search);
            const token = query.get('token');
            if (!token) {
                setError(true);
                return;
            }
            try {
                const response = await axios.post(`http://localhost:3002/v1/auth/reset-password?token=${token}`, {
                    password: values.password,
                });
                console.log(response);
                Swal.fire({
                    title: 'Success',
                    text: 'Password reset successfully',
                    icon: 'success',
                    showCancelButton: false,
                    background: currentTheme === "dark" ? "#383838" : "#F9FAFB",
                    confirmButtonColor: "#22c55e",
                    color: currentTheme === "dark" ? "white" : "black",
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                        router.push("/login");
                    });
            } catch (err: any) {
                setError(true);
                console.log(err.response.data);
                Swal.fire({
                    title: 'Error',
                    text: 'Link is either used or expired or invalid',
                    icon: 'error',
                    showCancelButton: false,
                    background: currentTheme === "dark" ? "#383838" : "#F9FAFB",
                    confirmButtonColor: "#22c55e",
                    color: currentTheme === "dark" ? "white" : "black",
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                        router.push("/login");
                    });
            }
        },
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
            <h1 className="my-4 text-2xl font-semibold font-oswald">
                Reset Password
            </h1>
            <form onSubmit={formik.handleSubmit} className="mb-8">
                <input
                    type="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff' }}
                    className={`mb-4 p-4 w-full rounded-md border border-gray-300`}
                />
                <div className="h-6 mb-4">
                    {formik.touched.password && formik.errors.password && <p className="text-green-500 text-xs mt-1">{formik.errors.password}</p>}
                </div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                    className={`mb-4 p-4 w-full rounded-md border border-gray-300`}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff' }}
                    // className={`mb-4 p-4 w-full rounded-md border border-gray-300 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-green-500" : ""}`}
                />
                <div className="h-6 mb-4">
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-green-500 text-xs mt-1">{formik.errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Reset Password
                </button>
            </form>
            <p className="text-center">
                <Link href="/login">
                    <span className="text-green-500 font-medium cursor-pointer">Go to Login</span>
                </Link>
            </p>
        </div>
    );
};

export default ResetPasswordPage;

