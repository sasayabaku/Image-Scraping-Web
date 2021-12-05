import React from 'react';

import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/router';

type Props = {
  href: string;
};

const Link: React.FC<Props> = ({ children, href }) => {
  const router = useRouter();
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="sm:w-3/12 md:w-2/12 w-6/12 h-full shadow-2xl">
      <div className="border-b py-3 mt-1 flex justify-around">
        <p className="text-xl font-semibold">Image Scraping</p>
      </div>

      <div className="p-6 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-600">Menu</h1>

          <div className="">
            <Link href="/">
              <div className="flex p-3 text-gray-700 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer">
                <AdbIcon className="text-gray-500" />
                <p className=" ">Web Scraper</p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
