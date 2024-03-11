import React from "react";
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <>
      <div>This is the Issues Page!</div>
      <Button>New Issue</Button>
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

*/
