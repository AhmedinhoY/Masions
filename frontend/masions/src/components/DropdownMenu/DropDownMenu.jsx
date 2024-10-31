// dropdown menu
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";

import "./DropDownMenu.css";

export default function DropDownMenu() {
  // const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  // const [urlsChecked, setUrlsChecked] = React.useState(false);
  // const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <AvatarIcon className="h-7 w-7 rounded-full" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem" disabled="true">
            Log in {/*  <div className="RightSlot">⌘+T</div> */}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" disabled="true">
            Register {/*  <div className="RightSlot">⌘+T</div> */}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            Contact Us
            {/* <div className="RightSlot">⌘+N</div> */}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Abbout Us
            {/* <div className="RightSlot">⌘+N</div> */}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            Log Out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
