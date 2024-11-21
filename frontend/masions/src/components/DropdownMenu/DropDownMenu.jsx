import { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";
import "./DropDownMenu.css";
import DropDownDialog from "./DropDownDialog";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DropDownMenu() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [user, setUser] = useState(null); // State to store user details

  // Fetch login status when the component loads
  const checkLoginStatus = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/isLoggedIn",
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      setIsLoggedIn(data.isLoggedIn); // Update login status
      if (data.isLoggedIn) {
        alert("The user is logged in");
        setUser(data.user); // Save user details
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      alert("Logged out successfully!");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.log(error);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customize options">
          <AvatarIcon className="h-7 w-7 rounded-full" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {/* Log In Button */}
          <DropdownMenu.Item
            className="DropdownMenuItem"
            disabled={isLoggedIn} // Disable if logged in
            onSelect={() => setDialogOpen(true)} // Open dialog
          >
            Log in
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          {/* Contact Us and About Us */}
          <DropdownMenu.Item className="DropdownMenuItem">
            Contact Us
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            About Us
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          {/* Log Out Button */}
          <DropdownMenu.Item
            className="DropdownMenuItem"
            disabled={!isLoggedIn} // Disable if not logged in
            onSelect={handleLogOut}
          >
            Log Out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>

      {/* Log In Dialog */}
      <DropDownDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        closeDialog={() => setDialogOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </DropdownMenu.Root>
  );
}
