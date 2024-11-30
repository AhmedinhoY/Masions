import { useContext } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";
import "./DropDownMenu.css";
import DropDownDialog from "../../shared/DropDownDialog";
import SellerReqDialog from "../../shared/SellerReqDialog";
import { AuthContext } from "../../shared/context/auth-context";
import {
  useDropDownDialog,
  useSellerReqDialog,
} from "../../shared/context/dropdowndialog-context";

export default function DropDownMenu() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { openDropDownDialog } = useDropDownDialog();
  const { openSellerReqDialog } = useSellerReqDialog();

  const handleLogOut = async () => {
    await logout();
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
            onSelect={() => openDropDownDialog()} // Open dialog
          >
            {isLoggedIn ? `Hi, ${user.email} ` : "Log in"}
          </DropdownMenu.Item>

          {user?.roles === "buyer" && (
            <>
              <DropdownMenu.Separator className="DropdownMenuSeparator" />
              <DropdownMenu.Item
                className="DropdownMenuItem"
                onSelect={() => openSellerReqDialog()}
              >
                Request to be a seller
              </DropdownMenu.Item>
            </>
          )}

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
      <DropDownDialog />
      {/* Request to be a seller Dialog */}
      <SellerReqDialog />
    </DropdownMenu.Root>
  );
}
