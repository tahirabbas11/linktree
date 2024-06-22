'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import data from '../data.json';
import LinkCard from './components/LinkCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from './components/Loader';

const HomePage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user.name) {
      router.push(`/${user.name}`);
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center flex-col mx-auto w-full pt-12 px-8">
      {user.name ? (
        <Loader />
      ) : (
        <>
          <Image
            alt={data.name}
            src={data.avatar}
            width={96}
            height={96}
            className="rounded-full mb-4"
          />
          <h1 className="my-4 text-2xl font-semibold font-oswald">
            @{data.name}
          </h1>
          <p className="mb-8 text-gray-500 font-medium text-center font-popins text-sm sm:text-base">
            {data.bio}
          </p>
          {/* {data.links.map((link) => (
            <LinkCard key={link.url} {...link} />
          ))} */}
        </>
      )}
    </div>
  );
};

export default HomePage;
