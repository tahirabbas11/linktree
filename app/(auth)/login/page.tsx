'use client';
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const { systemTheme, theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    // const handleSubmit = async (e : any) => {
    //     e.preventDefault();
    //     console.log("Registering with:", { email, password, name });
    //     try {
    //         const response = await axios.post("http://localhost:3002/v1/auth/login", {
    //             email,
    //             password,
    //         });
    //         console.log(response.data);
    //         // window.location.href = "/";
    //     } catch (err : any) {
    //         setError(true);
    //         console.log(err.response.data);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registering with:", { email, password, name });
        try {
            const response = await axios.post("http://localhost:3002/v1/auth/login", {
                email,
                password,
            });
    
            // Assuming response.data.tokens.access.token contains the access token
            const token = response.data.tokens.access.token;
            console.log(response.data);
    
            // Set the access token in a cookie for 30 minutes
            Cookies.set('accessToken', token, { expires: 0.5 }); // 0.5 day = 12 hours; 0.5/24 = 0.02083 day = 30 minutes
            router.push('/')
        } catch (err: any) {
            setError(true);
            console.log(err.response.data);
        }
    };

    return (
        <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
            {/* <Image
                alt="Logo"
                src="/logo.png"
                width={128}
                height={128}
                className="rounded-full"
            /> */}
            <h1 className="my-4 text-2xl font-semibold font-oswald">
                Login
            </h1>
            <form onSubmit={handleSubmit} className="mb-8">
                {error && <p className="text-red-500">Invalid email or password</p>}
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
                    Login
                </button>
            </form>
            <p className="text-center">
                Don't have an account?{" "}
                <Link href="/register">
                    <span className="text-green-500 font-medium cursor-pointer">Register</span>
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
