"use client";
import Image from "next/image";
import LinkCard from "@/app/components/LinkCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import InfinityLoader from "../components/InfinityLoader";
import { useRouter } from "next/navigation";
import data from "../../data.json";
import IconDropdown from "@/app/components/searchIcon";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

interface Link {
  _id: string;
  slug: string;
  link: string;
}

interface User {
  name: string;
  links: Link[];
  id: string;
}

const HomePage = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("Globe");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleIconSelect = (icon: any) => {
    setSelectedIcon(icon);
    console.log("====>", icon);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:3002/v1/link/${params.username}`
        );
        setUser(response.data);
        setErrorMessage(null);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setErrorMessage("LinkTree not found");
        } else {
          setErrorMessage("An error occurred while loading the LinkTree");
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center flex-col mx-auto w-full pt-40 px-8">
        <InfinityLoader
          // @ts-ignore
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center mt-4 p-4">
          <h1 className="text-2xl font-semibold">{errorMessage}</h1>
          <p className="text-sm mt-1 sm:text-base max-w-md text-center">
            Want this to be your username?{" "}
            <Link href="/register" className="underline cursor-pointer">
              Create your Linktree now
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col mx-auto w-full pt-12 px-8">
        <Image
          alt={data.name}
          src={
            "https://gravatar.com/avatar/68e8f3678e68efb9b4827e0204a0e8ce?s=400&d=mp&r=pg"
          }
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
        <h1 className="my-4 text-2xl font-semibold font-oswald">
          @{user.name}
        </h1>
        {user.links.map((link) => (
          <LinkCard url={link.link} title={link.slug} />
        ))}
      </div>
    </>
  );
};
export default HomePage;
