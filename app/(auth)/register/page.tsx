'use client';
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from "@/app/components/Loader";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Name is required'),
});

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])
  

    const { systemTheme, theme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await axios.post("http://localhost:3002/v1/auth/register", {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                });
                console.log(response.data);
                if (response.data && !response.data.user.isEmailVerified) {
                    await axios.post("http://localhost:3002/v1/auth/send-verification-email", {}, {
                        headers: {
                            Authorization: `Bearer ${response.data.tokens.access.token}`,
                        },
                    });
                    console.log("Check your mail and verify it");
                    localStorage.setItem("accessToken", response.data.tokens.access.token);
                    // window.location.href = "/login";
                    Swal.fire({
                        title: 'Success',
                        text: 'Check your mail and verify it',
                        icon: 'success',
                        showCancelButton: false,
                        background: currentTheme === "dark" ? "#383838" : "#F9FAFB",
                        confirmButtonColor: "#22c55e",
                        color: currentTheme === "dark" ? "white" : "black",
                        confirmButtonText: 'Ok',
                    }).then(() => {
                            router.push("/");
                        });
                } else {
                    localStorage.setItem("accessToken", response.data.tokens.access.token);
                }
                setLoading(false);
            } catch (err: any) {
                if (err.response.status === 400) {
                    formik.setFieldError('password', err.response.data.message);
                } else {
                    setError(true);
                }
                setError(true);
                console.log(err.response.data);
                setLoading(false);
            }
        },
    });

    return (
        <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
            <h1 className="my-4 text-2xl font-semibold font-oswald">
                Register
            </h1>
            <form onSubmit={formik.handleSubmit} className="mb-8 flex flex-col">
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        style={{ backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff' }}
                        className="mb-2 p-4 w-full rounded-md border border-gray-300"
                    />
                    {formik.touched.name && formik.errors.name && <p className="text-green-500 text-xs mt-1">{formik.errors.name}</p>}
                </div>
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        style={{ backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff' }}
                        className="mb-2 p-4 w-full rounded-md border border-gray-300"
                    />
                    {formik.touched.email && formik.errors.email && <p className="text-green-500 text-xs mt-1">{formik.errors.email}</p>}
                </div>
                <div className="flex flex-col mb-8">
                    <input
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        style={{ backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff' }}
                        className="mb-2 p-4 w-full rounded-md border border-gray-300"
                    />
                    {formik.touched.password && formik.errors.password && <p className="text-green-500 text-xs mt-1">{formik.errors.password}</p>}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={formik.isSubmitting || loading}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >Register
                    </button>
                    {loading && <Loader />}

                </div>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link href="/login">
                    <span className="text-green-500 font-medium cursor-pointer">Login</span>
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;

