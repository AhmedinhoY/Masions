import { useContext } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";
import "./DropDownMenu.css";
import DropDownDialog from "../../shared/DropDownDialog";
import SellerReqDialog from "../../shared/SellerReqDialog";
import EditProfileDialog from "../../shared/EditProfileDialog";
import { AuthContext } from "../../shared/context/auth-context";
import {
  useDropDownDialog,
  useSellerReqDialog,
  useEditProfileDialog,
} from "../../shared/context/dropdowndialog-context";
import { useNavigate } from "react-router-dom";

export default function DropDownMenu() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { openDropDownDialog } = useDropDownDialog();
  const { openSellerReqDialog } = useSellerReqDialog();
  const { openEditProfileDialog } = useEditProfileDialog();

  const handleLogOut = async () => {
    await auth.logout();
    navigate("/");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customize options">
          <AvatarIcon className="h-6 w-6 lg:h-7 lg:w-7 rounded-full" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {/* Log In Button */}
          <DropdownMenu.Item
            className="DropdownMenuItem"
            disabled={auth.isLoggedIn} // Disable if logged in
            onSelect={() => openDropDownDialog()} // Open dialog
          >
            {auth.isLoggedIn ? `Hi, ${auth.user.email} ` : "Log in"}
          </DropdownMenu.Item>

          {auth.user?.roles === "buyer" && (
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
          <DropdownMenu.Item
            className="DropdownMenuItem"
            disabled={!auth.isLoggedIn}
            onSelect={() => {
              console.log("Opening dialog");
              openEditProfileDialog();
            }}
          >
            Edit Profile
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
            disabled={!auth.isLoggedIn} // Disable if not logged in
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
      <EditProfileDialog />
    </DropdownMenu.Root>
  );
}
