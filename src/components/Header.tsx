"use client";

import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  return (
    <header className="text-[15px] bg-[#282828] text-white fixed w-full">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 font-semibold text-[22px]">
            CodeLogsZ
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6 text-white" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/CodeLogsZ/codeforces"
            className={({ isActive }) =>
              `font-medium flex items-center gap-x-[6px] ${
                isActive || pathname === "/" ? "text-white" : "text-[#A9A9A9]"
              }`
            }
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp&w=256"
              alt=""
              className="w-[25px]"
            />
            Codeforces
          </NavLink>

          <NavLink
            to="/CodeLogsZ/leetcode"
            className={({ isActive }) =>
              `font-medium flex items-center gap-x-1 ${
                isActive ? "text-white" : "text-[#A9A9A9]"
              }`
            }
          >
            <svg
              width="95"
              height="111"
              viewBox="0 0 95 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-[20px] max-w-none"
            >
              <path
                d="M68.0063 83.0664C70.5 80.5764 74.5366 80.5829 77.0223 83.0809C79.508 85.579 79.5015 89.6226 77.0078 92.1127L65.9346 103.17C55.7187 113.371 39.06 113.519 28.6718 103.513C28.6117 103.456 23.9861 98.9201 8.72653 83.957C-1.42528 74.0029 -2.43665 58.0749 7.11648 47.8464L24.9282 28.7745C34.4095 18.6219 51.887 17.5122 62.7275 26.2789L78.9048 39.362C81.6444 41.5776 82.0723 45.5985 79.8606 48.3429C77.6488 51.0873 73.635 51.5159 70.8954 49.3003L54.7182 36.2173C49.0488 31.6325 39.1314 32.2622 34.2394 37.5006L16.4274 56.5727C11.7767 61.5522 12.2861 69.574 17.6456 74.8292C28.851 85.8169 37.4869 94.2846 37.4969 94.2942C42.8977 99.496 51.6304 99.4184 56.9331 94.1234L68.0063 83.0664Z"
                fill="#FFA116"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.1067 72.0014C37.5858 72.0014 34.7314 69.1421 34.7314 65.615C34.7314 62.0879 37.5858 59.2286 41.1067 59.2286H88.1245C91.6454 59.2286 94.4997 62.0879 94.4997 65.615C94.4997 69.1421 91.6454 72.0014 88.1245 72.0014H41.1067Z"
                fill="#B3B3B3"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.9118 2.02335C52.3173 -0.55232 56.3517 -0.686894 58.9228 1.72277C61.494 4.13244 61.6284 8.17385 59.2229 10.7495L16.4276 56.5729C11.7768 61.552 12.2861 69.5738 17.6453 74.8292L37.4088 94.2091C39.9249 96.6764 39.968 100.72 37.505 103.24C35.042 105.761 31.0056 105.804 28.4895 103.337L8.72593 83.9567C-1.42529 74.0021 -2.43665 58.0741 7.1169 47.8463L49.9118 2.02335Z"
                fill="white"
              ></path>
            </svg>
            LeetCode
          </NavLink>
          <NavLink
            to="/CodeLogsZ/hackerrank"
            className={({ isActive }) =>
              `font-medium flex items-center gap-x-1 ${
                isActive ? "text-white" : "text-[#A9A9A9]"
              }`
            }
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/160_Hackerrank_logo_logos-512.png"
              alt=""
              className="w-[25px]"
            />
            HackerRank
          </NavLink>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 font-semibold text-[20px]">
              CodeLogsZ
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp&w=256"
                    alt=""
                    className="w-[20px]"
                  />
                  Codeforces
                </a>
                <a
                  href="#"
                  className="-mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                >
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp"
                    alt=""
                    className="w-[20px]"
                  />
                  LeetCode
                </a>
                <a
                  href="#"
                  className="-mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                >
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/160_Hackerrank_logo_logos-512.png"
                    alt=""
                    className="w-[20px]"
                  />
                  HackerRank
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
