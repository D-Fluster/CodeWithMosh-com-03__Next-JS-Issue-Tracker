"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Issue Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

// 
// BUILD THE "NEW ISSUE" PAGE
// (CONTINUED from "app/issues/page.tsx")
// https://youtu.be/J9sfR6HN6BY?t=2765
// 

At this point, we're only focusing on the look & field of
// this page, so we won't worry about submitting the form
// or handling validation errors, but rather just building
// a page that has two input fields (title & description)

Similar to what we did with Bootstrap, we can check the
// Radix documentation to find the base code for a
// Text Field, for example:

    https://www.radix-ui.com/themes/docs/components/text-field

    <TextField.Root>
        <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search the docs…" />
    </TextField.Root>

    // where the "<TextField.Slot>" piece here is used to
    // include a magnifying glass icon, which we don't need

Note that we'll need to add the "use client" directive to
// both this NewIssuePage and its parent Issues Page because
// only client-side components can utilize input fields and
// respond to navigation commands, respectively

By default, the text input field <TextField.Input> takes up
// the entire width of the page, so we can add the class
// "max-w-xl" to the container <div> to limit its max width

Additionally, this helps us notice that these fields are
// super close to the left-hand side of the screen, so we
// can add some padding to the <main> element in our 
// "layout.tsx" file using the class "p-5"

After the "Title" input field, we want to add a "Text Area"
// where the user can input the descirption:

    https://www.radix-ui.com/themes/docs/components/text-area

    <TextArea placeholder="Reply to comment…" />

Adding this to our <div> places the single- and multi-line
// text boxes right on top of each other, so we can add the
// vertical spacing class "space-y-3" to our <div> container

Hop to "app/layout.tsx"

// 
// ADDING A MARKDOWN EDITOR
// https://youtu.be/J9sfR6HN6BY?=3416
// 

Now we're going to replace the <TextArea> component with a
// full Markdown editor using a component called "React
// Simple MD Editor" from NPM:

  https://www.npmjs.com/package/react-simplemde-editor

For a live demo, see also:
  https://react-simplemde-edtior.netlify.app/

This is a React component wrapper around EasyMDE, a
// popular JS library for rendering a MarkDown (MD) editor

First, we install EasyMDE as well as the React SimpleMDE
// by running the following in the Terminal:

  "npm install --save react-simplemde-editor easymde"

Once installed, we import the SimpleMDE component and its
// corresponding CSS file using:

  import SimpleMDE from "react-simplemde-editor";
  import "easymde/dist/easymde.min.css";

Finally, we just replace the <TextArea> component with the
// a <SimpleMDE> component!

At this point, we can remove the import of both "React"
// and "TextArea," but I'm leaving them in for my clarity

It's important to note that the MDE is fully customizable;
// you can change which buttons are on the toolbar, 
// whether spellcheck is enabled by default, etc. -- but
// since Mosh won't go into that, we can use their docs

*/
