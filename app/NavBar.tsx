import Link from "next/link";
import React from "react";
import { PiBugDuotone } from "react-icons/pi";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-7 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <PiBugDuotone />
      </Link>
      <ul className="flex space-x-7">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-700 hover:text-zinc-300 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

// 
// BUILDING THE NAV BAR
// https://youtu.be/J9sfR6HN6BY?t=660
// 

See "layout.tsx" file

Rather than using a standard <div> element, we're going to
// utilize the <nav> element so it's more sematic(?)

With just the <nav> element, the navigation bar items are
// displayed vertically on separate lines; rather, we want
// them to be laid out horizontally, so we need to use a
// "flex" container by using the <nav className="flex">

With a flex container, the logo and list items are laid out
// horizontally -- i.e., the direct children of the "flex"
// container (the Logo and UL) are laid out horizontally

With just the <nav> element being of the "flex" class, each
// LI within the UL (which are *not* direct children of the
// <nav>) is still laid out vertically on separate lines

Thus, to resolve this, we give the "UL" a "flex" class too;
// however, now everything is laid out horizontally but
// without any spacing in between

We can fix this spacing issue with another Tailwind class:
// "space-x-#" where here Mosh is using the "space-x-6" 
// class, though I've chosen "space-x-7" -- and I believe that
// the "x" here indicates horizontal (x-axis) spacing only

Next, we can apply the class "border-b" ("b" for "bottom")
// to only the <nav> element to give it a bottom border

Then, we can apply the class "mb-5" to <nav> to give it a
// bottom margin of 5px(? AI autocomplete)

Next, to add horizontal padding to our navigation bar, 
// we add the class "px-5" to the <nav> element

With these classes in place, our NavBar looks decent but
// is too narrow, so we also apply the "h-14" class to
// increase the height of the <nav> element to 14px(AI?)

However, this positions our navigation items at the top
// rather than aligned vertically centrally -- which can
// be fixed by applying the class "items-center"

Next, we can replace the "Logo" placeholder text with an
// actual logo, which we can find from the React icons
// library at: https://react-icons.github.io/react-icons/

I've chosen the "PiBugDuotone" icon from the "pi" library
// so I add the following import line and replace the
// "Logo" placeholder text with "<PiBugDuotone />":

import { PiBugDuotone } from "react-icons/pi";

Note that Mosh uses "<AiFillBug />" in his tutorial, which
// is imported with this line, as it's in the "ai" library:

import { AiFillBug } from "react-icons/ai";

At this phase, we are manually listing LI elements to be
// navigated to in an UL as follows:

      <ul className="flex space-x-7">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/issues">Issues</Link>
        </li>
      </ul>

However, if we want to apply styling to all LIs with this
// configuration, we would have to be repetitious -- e.g.,
// adding the following classes to all <Link> elements:
// "text-zinc-500 hover:text-zinc-800 transition-colors"
// in order to have a light gray color by default, a darker
// gray upon hover, and a smooth transition between these

Another way to do this is to create an array of objects
// with the name ("label") and link ("href") of each
// navigation item, then map them as before

Added to pre-"return" portion of our function:
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

Updated in "return" portion of our function -- note that
// Mosh uses zinc-500 for the default text color and
// zinc-800 for the hover text color, but I couldn't see
// the difference on my end and I prefer the hover values
// to be lighter than the default, so I'm using these
      <ul className="flex space-x-7">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-700 hover:text-zinc-300 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>

// 
// STYLING THE ACTIVE LINK
// https://youtu.be/J9sfR6HN6BY?t=1195
// 

*/
