"use client";

import React from "react";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <>
      <Text as="div" className="text-emerald-500" mb="5" size="5">
        This is the Issues Page!
      </Text>
      <Button>
        <Link href="/issues/new">Report a New Issue</Link>
      </Button>
    </>
  );
};

export default IssuesPage;

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

// 
// SETTING UP RADIX UI
// https://youtu.be/J9sfR6HN6BY?2613
// 

To build the "New Issue" page, we're going to use Radix UI
// which is a very popular component library that comes in
// two "flavors" -- Radix Themes (beautifully styled
// components like input fields, buttons, avatars, etc.)
// and Radix Primitives (a bunch of unstyled components
// which only have behaviors but must be styled manually)

Here, we'll be using Radix Themes, which can be installed
// by following the instructions in their Docs:

    https://www.radix-ui.com/themes/docs/overview/getting-started

Then, we import the following into our main "app/layout.tsx" 
// file and then wrap the contents of our <body> element in 
// the new RadixUI "<Theme>" component

    import "@radix-ui/themes/styles.css";
    import { Theme } from "@radix-ui/themes";

We can then test to ensure we've set it up properly by
// importing the RadixUI "Button" component into our
// "app/issues/page.tsx" file and utilizing it therein

    import { Button } from "@radix-ui/themes";

In the "return" portion of that function, we can add
// something like:

    <Button>New Issue</Button>

// 
// BUILD THE "NEW ISSUE" PAGE
// https://youtu.be/J9sfR6HN6BY?t=2765
// 

To add a link to our "New Issue" page, we place a <Link>
// component inside our <Button> component instead of the
// placeholder text -- specifically the <Link> component
// defined in the "next/link" package, rather than the one
// defined in "@radix-ui/themes"

Hop to new "app/issues/new/page.tsx"

*/
