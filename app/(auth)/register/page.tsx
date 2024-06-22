'use client';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // corrected import from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '@/app/components/Loader';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('Name is required'),
  displayName: Yup.string().required('Display Name is required'),
  bio: Yup.string().required('Bio is required'), // corrected field name
});

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      displayName: '',
      bio: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
          {
            email: values.email,
            password: values.password,
            name: values.name,
            displayName: values.displayName,
            bio: values.bio,
          }
        );

        if (response.data && !response.data.user.isEmailVerified) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/send-verification-email`,
            {},
            {
              headers: {
                Authorization: `Bearer ${response.data.tokens.access.token}`,
              },
            }
          );
          Swal.fire({
            title: 'Success',
            text: 'Check your email and verify it',
            icon: 'success',
            showCancelButton: false,
            background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
            confirmButtonColor: '#22c55e',
            color: currentTheme === 'dark' ? 'white' : 'black',
            confirmButtonText: 'Ok',
          }).then(() => {
            router.push('/');
          });
        } else {
          localStorage.setItem(
            'accessToken',
            response.data.tokens.access.token
          );
        }
        setLoading(false);
      } catch (err: any) {
        if (err.response.status === 400) {
          formik.setFieldError('password', err.response.data.message);
        } else {
          console.error('Registration error:', err);
          // Handle other errors as needed
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center flex-col mx-auto w-full pt-12 px-8">
      <h1 className="my-4 text-2xl font-semibold font-oswald">Register</h1>
      <form onSubmit={formik.handleSubmit} className="mb-8 flex flex-col">
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Username"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-green-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>
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
        <div className="flex flex-col mb-4">
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
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Display Name"
            value={formik.values.displayName}
            onChange={formik.handleChange('displayName')}
            onBlur={formik.handleBlur('displayName')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300"
          />
          {formik.touched.displayName && formik.errors.displayName && (
            <p className="text-green-500 text-xs mt-1">
              {formik.errors.displayName}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-8">
          <textarea
            placeholder="Bio"
            value={formik.values.bio}
            onChange={formik.handleChange('bio')}
            onBlur={formik.handleBlur('bio')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
              minHeight: '80px',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300 resize-none"
          />
          {formik.touched.bio && formik.errors.bio && (
            <p className="text-green-500 text-xs mt-1">{formik.errors.bio}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login">
          <span className="text-green-500 font-medium cursor-pointer">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
