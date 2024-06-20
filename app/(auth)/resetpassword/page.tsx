'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const { resolvedTheme, theme } = useTheme();
    const currentTheme = resolvedTheme || theme;

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        if (!token) {
            setError(true);
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3002/v1/auth/reset-password?token=${token}`, {
                password,
            });
            console.log(response);
            Swal.fire({
                title: 'Success',
                text: 'Password reset successfully',
                icon: 'success',
                showCancelButton: false,
                background: currentTheme === "dark" ? "#292f3a" : "white",
                confirmButtonColor: "#22c55e",
                color: currentTheme === "dark" ? "white" : "black",
                confirmButtonText: 'Go to Login',
            }).then(() => {
                    router.push("/login");
                });
        } catch (err) {
            setError(true);
            console.log(err.response.data);
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
            <h1 className="my-4 text-2xl font-semibold font-oswald">
                Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#3e4452' : '#fff' }}
                    className="mb-4 p-4 w-full rounded-md border border-gray-300"
                />
                <div className="h-6 mb-4">
                    {error && <p className="text-red-500">Link is not valid or has expired</p>}
                </div>
                <button
                    type="submit"
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
