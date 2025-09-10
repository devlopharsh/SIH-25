import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
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
  const [activeH, setActiveH] = useState("Home");

  return (
    <>
      <nav className="flex items-center justify-between bg-background px-6 py-3 border-b">
        <div className="flex items-center justify-between gap-10 ">
          {/* Logo */}
          <div className="text-xl font-semibold">
            <img src="./Logo.svg" alt="Logo" width={150} />
          </div>

          {/* Route Links */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/"
                  onClick={() => setActiveH("Home")}
                  className="px-3 py-2"
                >
                  {activeH === "Home" ? (
                    <p className="text-md text-secondary font-bold">
                      Dashboard
                    </p>
                  ) : (
                    <p className="text-md">Dashboard</p>
                  )}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/Project"
                  onClick={() => setActiveH("Project")}
                  className="px-3 py-2"
                >
                  {activeH === "Project" ? (
                    <p className="text-md text-secondary font-bold">Project</p>
                  ) : (
                    <p className="text-md">Project</p>
                  )}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="px-3 py-2">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </>
  );
};

export default Navbar;
