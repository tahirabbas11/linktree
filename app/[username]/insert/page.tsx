'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconDropdown from '@/app/components/searchIcon';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

type FormValues = {
  url: string;
  slug: string;
};

type SearchslugProps = {
  params: { username: string };
};

const Searchslug = ({ params }: SearchslugProps) => {
  const router = useRouter();
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const formik = useFormik({
    initialValues: {
      url: '',
      slug: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url().required('URL is required'),
      slug: Yup.string().required('Slug is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form Values on Submit:', values);
      console.log('Username:', params.username);
      try {
        const response = await axios.post(
          `http://localhost:3002/v1/link/${params.username}`,
          {
            link: values.url,
            slug: values.slug,
          }
        );
        console.log('API Response:', response.data);
        Swal.fire({
          title: 'Success',
          text: 'Added to your linktree',
          icon: 'success',
          showCancelButton: false,
          background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
          confirmButtonColor: '#22c55e',
          color: currentTheme === 'dark' ? 'white' : 'black',
          confirmButtonText: 'Ok',
        }).then(() => {
          router.push(`/${params.username}`);
        });
      } catch (error) {
        console.error('API Error:', error);
        Swal.fire({
          title: 'Success',
          text: 'Added to your linktree',
          icon: 'success',
          showCancelButton: false,
          background: currentTheme === 'dark' ? '#383838' : '#F9FAFB',
          confirmButtonColor: '#22c55e',
          color: currentTheme === 'dark' ? 'white' : 'black',
          confirmButtonText: 'Ok',
        }).then(() => {
          router.push(`/${params.username}`);
        });
      }
    },
  });

  const handleIconSelect = (icon: string) => {
    formik.setFieldValue('slug', icon);
    console.log('Selected Icon:', icon);
  };

  return (
    <div
      className={`flex justify-center items-center flex-col mx-auto w-full pt-12 px-8`}
    >
      <h1 className="my-4 text-2xl font-semibold font-oswald">Add Link</h1>
      <form onSubmit={formik.handleSubmit} className="mb-8 flex flex-col">
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="URL"
            value={formik.values.url}
            onChange={formik.handleChange('url')}
            onBlur={formik.handleBlur('url')}
            style={{
              backgroundColor: currentTheme === 'dark' ? '#383838' : '#fff',
            }}
            className="mb-2 p-4 w-full rounded-md border border-gray-300"
          />
          {formik.touched.url && formik.errors.url && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.url}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <IconDropdown onSelect={handleIconSelect} />
          {formik.touched.slug && formik.errors.slug && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.slug}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Link
        </button>
      </form>
    </div>
  );
};

export default Searchslug;
