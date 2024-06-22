'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '@/app/components/Loader';
import { useSelector, useDispatch } from '@/lib/store';
import { loginSuccess, logoutSuccess } from '@/lib/slices/mainSlice';
import { setUserDetails } from '@/lib/slices/userSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { systemTheme, theme } = useTheme();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      password: Yup.string().required('This field is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoginLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          {
            email: values.email,
            password: values.password,
          }
        );
        if (response.data.user.isEmailVerified) {
          // Assuming response.data.tokens.access.token contains the access token
          const token = response.data.tokens.access.token;
          console.log(response.data);

          // Set the access token in a cookie for 30 minutes
          Cookies.set('accessToken', token, { expires: 0.5 });
          dispatch(loginSuccess(true));
          // Dispatch setUserDetails action to update Redux state
          dispatch(
            setUserDetails({
              name: response.data.user.name,
              displayName: response.data.user.displayName,
              email: response.data.user.email,
              isEmailVerified: response.data.user.isEmailVerified,
            })
          );
          router.push('/');
        } else {
          console.log('Email not verified');
          Swal.fire({
            title: 'Email not verified',
            text: 'Check your mail and verify it your',
            icon: 'error',
            showCancelButton: false,
            background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
            confirmButtonColor: '#22c55e',
            color: currentTheme === 'dark' ? 'white' : 'black',
            confirmButtonText: 'Ok',
          }).then(() => {
            // router.push("/login");
            axios
              .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/send-verification-email`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${response.data.tokens.access.token}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data, 'send');
              });
          });
        }
      } catch (err: any) {
        formik.setFieldError('password', err.response.data.message);
      } finally {
        setIsLoginLoading(false);
      }
    },
  });

  const handleForgotPassword = async () => {
    setIsForgotPasswordLoading(true);
    // @ts-ignore
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      text: 'Check your mail and verify it your',
      icon: 'error',
      input: 'email',
      showCancelButton: true,
      background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
      confirmButtonColor: '#21C55D',
      color: currentTheme === 'dark' ? 'white' : 'black',
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      inputValidator: (value: string) => (!value ? 'Email is required' : false),
      customClass: {
        container: currentTheme === 'dark' ? 'dark' : '',
        popup: currentTheme === 'dark' ? 'dark' : '',
        title: currentTheme === 'dark' ? 'dark' : '',
        content: currentTheme === 'dark' ? 'dark' : '',
        input: 'border-green-600 focus:border-green-600 focus:ring-green-600',
        inputError: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      },
    });

    if (email) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
          {
            email,
          }
        );
        Swal.fire({
          title: 'Email Sent',
          text: 'We sent a verification email to your email address. Please check your email to continue.',
          icon: 'success',
          showCancelButton: false,
          background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
          confirmButtonColor: '#22c55e',
          color: currentTheme === 'dark' ? 'white' : 'black',
          confirmButtonText: 'Ok',
        });
      } catch (err) {
        Swal.fire({
          title: 'Failed',
          text: 'Email not sent',
          icon: 'error',
          showCancelButton: false,
          background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
          confirmButtonColor: '#22c55e',
          color: currentTheme === 'dark' ? 'white' : 'black',
          confirmButtonText: 'Ok',
        });
      }
    }
    setIsForgotPasswordLoading(false);
  };

  return (
    <div className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}>
      <h1 className="my-4 text-2xl font-semibold font-oswald">Login</h1>
      <form onSubmit={formik.handleSubmit} className="mb-8 flex flex-col">
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-green-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col mb-8">
          <input
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-green-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || isLoginLoading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          {isForgotPasswordLoading && <Loader />}
        </div>
      </form>
      
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/register">
          <span className="text-green-500 font-medium cursor-pointer text-sm">
            Register
          </span>
        </Link>
        <div>

        <button
            type="button" // Add type="button" to prevent form submission
            className="text-blue-500 font-medium cursor-pointer text-sm"
            onClick={handleForgotPassword} // Simplify the onClick handler
          >
            Forgot Password
          </button> 
        </div>
      </p>
    </div>
  );
};

export default LoginPage;

