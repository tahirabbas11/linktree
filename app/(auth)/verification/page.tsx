'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Loader from '@/app/components/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const VerificationPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [currentTheme,setCurrentTheme] = useState(localStorage.getItem('theme') ||'dark');
  const isMounted = useRef(false);

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (!token) {
      setLoading(false);
      setError(true);
      return;
    }

    verifyEmail(token);

    async function verifyEmail(token: string) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        setLoading(false);
        if (res.status === 204) {
          Swal.fire({
            title: 'Success',
            text: 'Verification completed successfully',
            icon: 'success',
            showCancelButton: false,
            background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
            confirmButtonColor: '#22c55e',
            color: currentTheme === 'dark' ? 'white' : 'black',
            confirmButtonText: 'Go to Home',
          }).then(() => {
            router.push('/');
          });
        } else {
          Swal.fire({
            title: 'Failed',
            text: 'Verification failed',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Go to Register',
            background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
            confirmButtonColor: '#22c55e',
            color: currentTheme === 'dark' ? 'white' : 'black',
          }).then(() => {
            router.push('/login');
          });
        }
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: 'Failed',
          text: 'Verification failed',
          icon: 'error',
          showCancelButton: false,
          background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
          confirmButtonColor: '#22c55e',
          color: currentTheme === 'dark' ? 'white' : 'black',
          confirmButtonText: 'Go to Register',
        }).then(() => {
          router.push('/login');
        });
      }
    }
  }, [router]);

  return (
    <div
      className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}
    >
      <h1 className="my-4 text-2xl font-semibold font-oswald">Verification</h1>

      {loading ? (
        <Loader />
      ) : (
        <p className="text-center">
          Verification completed successfully. Now you can{' '}
          <Link href="/login">Login</Link> with your account.
        </p>
      )}
      {error && (
        <p className="text-green-500 text-xs mt-1">
          Invalid Verification Token
        </p>
      )}
    </div>
  );
};

export default VerificationPage;
