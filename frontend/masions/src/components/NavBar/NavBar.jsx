import React from "react";
import PropTypes from "prop-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from "./NavBar.module.css"; // Import styles as a module
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import { HeartIcon } from "@radix-ui/react-icons";
import { MapIcon } from "@heroicons/react/24/outline";

export const NavBar = () => {
  return (
    <NavigationMenu.Root className={styles.NavigationMenuRoot}>
      <NavigationMenu.List className={`${styles.NavigationMenuList} w-screen`}>
        <div className="w-full flex flex-row justify-around">
          <NavigationMenu.Item className="">
            <NavigationMenu.Link
              className={styles.NavigationMenuLink}
              style={{
                fontSize: "1.5rem",
                lineHeight: "1.75rem",
                color: "var(--primary)",
              }}
              href="/"
            >
              <h1>Maisons</h1>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <div className="flex items-baseline">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Buy <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent}>
                <ul className={`${styles.List} ${styles.one} block`}>
                  <ListItem href="#" title="Houses for sale"></ListItem>
                  <ListItem href="#" title="Apartments for sale"></ListItem>
                  <ListItem href="#" title="Lands for sale"></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Rent <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent}>
                <ul className={`${styles.List} ${styles.two} block`}>
                  <ListItem href="#" title="Houses for rent"></ListItem>
                  <ListItem href="#" title="Apartments for rent"></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={styles.NavigationMenuLink}
                href="#"
              >
                Agents
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
                Maisons Premium
                <CaretDownIcon className={styles.CaretDown} aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.NavigationMenuContent }>
                <ul className={`${styles.List} ${styles.three} block`}>
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
              <button
                className={styles.IconButton}
                aria-label="Customise options"
              >
                <MapIcon className="h-7 w-7 rounded-full" />
              </button>
              <button
                className={styles.IconButton}
                aria-label="Customise options"
              >
                <HeartIcon className="h-7 w-7 rounded-full" />
              </button>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <DropDownMenu />
            </NavigationMenu.Item>
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
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(styles.ListItemLink, className)}
          {...props}
          ref={forwardedRef}
        >
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
