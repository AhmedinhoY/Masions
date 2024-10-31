import React from "react";
import PropTypes from "prop-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./NavBar.css";
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import { HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const NavBar = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList w-screen">
        <div className="w-full flex flex-row justify-around">
          <NavigationMenu.Item className="">
            <NavigationMenu.Link
              className="NavigationMenuLink"
              style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}
              href="#"
            >
              <h1>Maisons</h1>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <div className="flex items-baseline">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Buy <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List one block">
                  <ListItem href="#" title="Houses for sale"></ListItem>
                  <ListItem href="#" title="Apartments for sale"></ListItem>
                  <ListItem href="#" title="Lands for sale"></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Rent <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two block">
                  <ListItem href="#" title="Houses for rent"></ListItem>
                  <ListItem href="#" title="Apartments for rent"></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link className="NavigationMenuLink" href="#">
                Agents
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Maisons Premium
                <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List three block">
                  <ListItem href="#" title="Analysis">
                    No more guess games! <br /> Gain real-time insights with
                    data science technologies, helping you make confident
                    investments decisions!
                  </ListItem>
                  <ListItem href="#" title="Al-Muthammen">
                    Know the true value! <br /> Instantly get accurate,
                    AI-driven property price estimates based on real-time market
                    data.
                  </ListItem>
                  <ListItem href="#" title="Al-Mustashar">
                    Your 24/7 AI assistant! <br />
                    Get instant answers, personalized property suggestions, and
                    seamless support, anytime you need it!
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </div>
          <div className="flex flex-row items-center">
            <NavigationMenu.Item>
              <button className="IconButton" aria-label="Customise options">
                <MagnifyingGlassIcon className="h-7 w-7 rounded-full" />
              </button>
              <button className="IconButton" aria-label="Customise options">
                <HeartIcon className="h-7 w-7 rounded-full" />
              </button>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <DropDownMenu />
            </NavigationMenu.Item>
          </div>
        </div>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
ListItem.propTypes = {
  className: PropTypes.string, // className should be a string
  children: PropTypes.node, // children can be any renderable React node
  title: PropTypes.string.isRequired, // title is required and should be a string
};
