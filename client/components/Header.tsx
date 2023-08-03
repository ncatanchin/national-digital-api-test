import { useContext, useEffect, useState } from "react";
import SidebarContext from "context/SidebarContext";
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
} from "icons";
import {
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import router, { useRouter } from "next/router";
import { StringParam, useQueryParam } from "use-query-params";
import Spinner from "./Spinner";
import { useAppSelector } from "~/hooks/appStore";
import debounce from "lodash/debounce";

interface IUser {
  [key: string]: any;
}
interface IHeader {
  user?: IUser;
  logout?: Function;
}

function Header({ user, logout }: IHeader) {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { push, query, replace, pathname } = useRouter();
  const [search, setSearch] = useQueryParam("q", StringParam);
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              type="search"
              className="pl-8 text-gray-700"
              placeholder="Search repositories"
              aria-label="Search"
              defaultValue={search}
              onChange={debounce((e) => {
                setSearch(e.target.value);
              }, 1000)}
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
