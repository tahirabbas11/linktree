'use client';
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
// import Cookies from 'js-cookie'


const RegisterPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const { systemTheme, theme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    const router = useRouter();


    const handleSubmit = async (e : any)  => {
        e.preventDefault();
        console.log("Registering with:", { email, password, name });
        try {
            const response = await axios.post("http://localhost:3002/v1/auth/register", {
                email,
                password,
                name,
            });
            console.log(response.data);
            if (response.data && !response.data.user.isEmailVerified) {
                const sendVerificationEmail = await axios.post("http://localhost:3002/v1/auth/send-verification-email", {}, {
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
                    background: currentTheme === "dark" ? "#292f3a" : "white",
                    confirmButtonColor: "#22c55e",
                    color: currentTheme === "dark" ? "white" : "black",
                    confirmButtonText: 'Ok',
                }).then(() => {
                        router.push("/");
                });
            } else {
                localStorage.setItem("accessToken", response.data.tokens.access.token);
            }
        } catch (err : any) {
            setError(true);
            console.log(err.response.data);
        }
    };

    return (
        <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
            <h1 className="my-4 text-2xl font-semibold font-oswald">
                Register
            </h1>
            <form onSubmit={handleSubmit} className="mb-8">
                {error && <p className="text-red-500">Invalid username or password</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#3e4452' : '#fff' }}
                    className="mb-4 p-4 w-full rounded-md border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#3e4452' : '#fff' }}
                    className="mb-4 p-4 w-full rounded-md border border-gray-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: currentTheme === 'dark' ? '#3e4452' : '#fff' }}
                    className="mb-4 p-4 w-full rounded-md border border-gray-300"
                />
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
            </form>
            <p className="text-center">
                Already have an account?{" "}
                <Link href="/login">
                    <span className="text-green-500 font-medium cursor-pointer">Login</span>
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;

