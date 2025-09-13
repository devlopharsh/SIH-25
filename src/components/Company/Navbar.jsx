import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Users, FileArchive, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "../ui/navigation-menu";

const Navbar = ({ user }) => {
  return (
    <nav className="border-b fixed w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-background px-6 py-3 z-90">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="text-xl font-semibold">
            <a href="/">
              <img src="/Logo.svg" alt="Logo" width={150} />
            </a>
          </div>

          <div className="text-xl text-gray-500 font-bold">Company Portal</div>
        </div>

        {/* Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">
                  {user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="mb-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Sidebar navigation */}
      <div className="border-r fixed top-0 left-0 h-full pt-20 z-20 w-[13vw]">
        <div className="font-medium text-md mb-5 pr-4 text-gray-600">
          Company Management :
        </div>
        <NavigationMenu className="w-fullx">
          <NavigationMenuList className="flex flex-col items-baseline gap-3 text-sm text-left w-full">
            <NavigationMenuItem>
              <NavLink
                to="/company"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-md text-white bg-secondary px-5 py-2 rounded flex items-center justify-between w-full gap-3"
                    : "text-md text-gray-600 hover:text-secondary flex items-center justify-between w-full gap-3"
                }
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/company/projectstatus"
                className={({ isActive }) =>
                  isActive
                    ? "text-md text-white bg-secondary px-4 py-2 rounded flex items-center justify-between w-full gap-3"
                    : "text-md text-gray-600 hover:text-secondary flex items-center justify-between w-full gap-3"
                }
              >
                <FileArchive className="h-5 w-5" />
                Request Status
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/company/audit"
                className={({ isActive }) =>
                  isActive
                    ? "text-md text-white bg-secondary px-5 py-2 rounded flex items-center justify-between w-full gap-3"
                    : "text-md text-gray-600 hover:text-secondary flex items-center justify-between w-full gap-3"
                }
              >
                <Users className="h-5 w-5" />
                Audit Users
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
