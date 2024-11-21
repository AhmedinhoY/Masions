import { useState, useContext } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";
import "./DropDownMenu.css";
import DropDownDialog from "./DropDownDialog";
import { AuthContext } from "../../shared/context/auth-context";

export default function DropDownMenu() {
  const { isLoggedIn, logout } = useContext(AuthContext); // Get login status and logout logic from AuthContext
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleLogOut = async () => {
    await logout(); // Call logout from auth context
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
      />
    </DropdownMenu.Root>
  );
}
