/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from "./NavBar.module.css"; // Import styles as a module
import DropDownMenu from "../../components/DropdownMenu/DropDownMenu";
import { HeartIcon, HomeIcon } from "@radix-ui/react-icons";
import { MapIcon, Bars3Icon, EnvelopeIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useDialog } from "../context/dialog-context";
import { useDropDownDialog } from "../context/dropdowndialog-context";
import Alert from "../Alert";
import SellerReqDialog from "../SellerReqDialog";
import { useSellerReqDialog } from "../../shared/context/dropdowndialog-context";

export const NavBar = () => {
  const auth = useContext(AuthContext);
  const { openDialog } = useDialog(); // Get the openDialog method from context
  const { openDropDownDialog } = useDropDownDialog(); // Get the openDialog method from context
  const { openSellerReqDialog } = useSellerReqDialog();

  const handleLogOut = async () => {
    await auth.logout();
  };

  const openLogInAlert = () => {
    openDialog({
      title: "Login Required",
      description: "You must be logged in to access this page.",
      confirmText: "Go to Login",
      cancelText: "Dismiss",
      onConfirm: () => {
        openDropDownDialog(); // open login dialog
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <NavigationMenu.Root className={styles.NavigationMenuRoot}>
        <NavigationMenu.List
          className={`${styles.NavigationMenuList} w-screen`}
        >
          <div className="w-full flex flex-row justify-around">
            <NavigationMenu.Item className="">
              <NavigationMenu.Link
                className={styles.NavigationMenuLink}
                styles={{
                  fontSize: "1.5rem",
                  lineHeight: "1.75rem",
                  color: "var(--primary)",
                }}
                asChild
              >
                <Link to="/">
                  <div className="flex flex-row items-stretch justify-between">
                    <HomeIcon
                      className="mr-3 h-6 w-6 lg:h-7 lg:w-7  rounded-full"
                      style={{
                        color: "var(--primary)",
                      }}
                    />
                    <h1 className="hidden lg:block">Maisons</h1>
                  </div>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <div className="flex items-baseline">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={styles.NavigationMenuTrigger}
                >
                  Buy <CaretDownIcon className={styles.CaretDown} aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={styles.NavigationMenuContent}
                >
                  <ul className={`${styles.List} ${styles.one} block`}>
                    <ListItem
                      to="houses/for-sale"
                      title="Houses for sale"
                    ></ListItem>
                    <ListItem
                      to="apartments/for-sale"
                      title="Apartments for sale"
                    ></ListItem>
                    <ListItem
                      to="lands/for-sale"
                      title="Lands for sale"
                    ></ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={styles.NavigationMenuTrigger}
                >
                  Rent
                  <CaretDownIcon className={styles.CaretDown} aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={styles.NavigationMenuContent}
                >
                  <ul className={`${styles.List} ${styles.two} block`}>
                    <ListItem
                      to="houses/for-rent"
                      title="Houses for rent"
                    ></ListItem>
                    <ListItem
                      to="apartments/for-rent"
                      title="Apartments for rent"
                    ></ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {auth.isLoggedIn && auth.user.roles === "seller" && (
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    asChild
                    className={styles.NavigationMenuLink}
                  >
                    <Link to="/add-post"> Sell </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              )}

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  asChild
                  className={styles.NavigationMenuLink}
                >
                  <Link to="agents"> Agents</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={styles.NavigationMenuTrigger}
                >
                  Maisons Premium
                  <CaretDownIcon className={styles.CaretDown} aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={styles.NavigationMenuContent}
                >
                  <ul className={`${styles.List} ${styles.three} block`}>
                    <ListItem to="#" title="Analysis">
                      No more guess games! <br /> Gain real-time insights with
                      data science technologies, helping you make confident
                      investments decisions!
                    </ListItem>
                    <ListItem to="#" title="Al-Muthammen">
                      Know the true value! <br /> Instantly get accurate,
                      AI-driven property price estimates based on real-time
                      market data.
                    </ListItem>
                    <ListItem to="#" title="Al-Mustashar">
                      Your 24/7 AI assistant! <br />
                      Get instant answers, personalized property suggestions,
                      and seamless support, anytime you need it!
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </div>
            <div className="hidden md:flex flex-row items-center">
              <NavigationMenu.Item>
                {/* explore link
                <Link
                  className={styles.IconButton}
                  aria-label="Customise options"
                  to="explore"
                >
                  <MapIcon className="h-6 w-6 lg:h-7 lg:w-7 rounded-full" />
                </Link> */}
                {/* wishlist link */}
                {auth.user ? (
                  <Link
                    className={styles.IconButton}
                    aria-label="Customise options"
                    to={`/wishlist/${auth.user.id}`}
                  >
                    <HeartIcon className="h-6 w-6 lg:h-7 lg:w-7 rounded-full" />
                  </Link>
                ) : (
                  <button
                    className={styles.IconButton}
                    aria-label="Customise options"
                    onClick={() => openLogInAlert()}
                  >
                    <HeartIcon className="h-6 w-6 lg:h-7 lg:w-7 rounded-full" />
                  </button>
                )}
                {/* Messages link */}
                {auth.user ? (
                  <Link
                    className={styles.IconButton}
                    aria-label="Customise options"
                    to={`/messages/`}
                  >
                    <EnvelopeIcon className="h-6 w-6 lg:h-7 lg:w-7 " />
                  </Link>
                ) : (
                  <button
                    className={styles.IconButton}
                    aria-label="Customise options"
                    onClick={() => openLogInAlert()}
                  >
                    <EnvelopeIcon className="h-6 w-6 lg:h-7 lg:w-7 " />
                  </button>
                )}
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                {/* profile link */}
                <DropDownMenu />
              </NavigationMenu.Item>
            </div>
            <div className="md:hidden">
              <DropDownMenu />
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className=" IconButton">
                  <Bars3Icon className="h-6 w-6" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="DropdownMenuContent bg-white shadow-lg rounded-md p-2 w-48"
                    sideOffset={5}
                  >
                    {/* Wishlist */}
                    {auth.user ? (
                      <DropdownMenu.Item asChild>
                        <Link
                          to={`/wishlist/${auth.user.id}`}
                          className="DropdownMenuItem flex items-center"
                        >
                          <HeartIcon className="h-5 w-5 mr-2" />
                          Wishlist
                        </Link>
                      </DropdownMenu.Item>
                    ) : (
                      <DropdownMenu.Item
                        className="DropdownMenuItem flex items-center"
                        onSelect={openLogInAlert}
                      >
                        <HeartIcon className="h-5 w-5 mr-2" />
                        Wishlist
                      </DropdownMenu.Item>
                    )}
                    {/* Messages link */}
                    {auth.user ? (
                      <DropdownMenu.Item asChild>
                        <Link
                          className={styles.IconButton}
                          aria-label="Customise options"
                          to={`/messages/`}
                        >
                          <EnvelopeIcon className="h-6 w-6 lg:h-7 lg:w-7 " />
                        </Link>
                      </DropdownMenu.Item>
                    ) : (
                      <DropdownMenu.Item
                        className="DropdownMenuItem flex items-center"
                        onSelect={openLogInAlert}
                      >
                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                        Messages
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>

          <NavigationMenu.Indicator className={styles.NavigationMenuIndicator}>
            <div className={styles.Arrow} />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className={styles.ViewportPosition}>
          <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
        </div>
      </NavigationMenu.Root>

      <Alert />
    </>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, to, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          to={to}
          className={classNames(styles.ListItemLink, className)}
          {...props}
          ref={forwardedRef}
        >
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
