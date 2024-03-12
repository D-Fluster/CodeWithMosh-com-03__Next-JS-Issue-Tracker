"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  // console.log(register("title"));
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError(
              "An unexpected error occurred. Please note, both an Issue Title and an Issue Description are required."
            );
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Issue Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
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

// 
// HANDLING A FORM SUBMISSION
// https://youtu.be/J9sfR6HN6BY?t=3535
// 

To handle form submissions now that our form is ready,
// we'll use a very popular library called React Hook Form,
// which makes it incredibly easy to handle form
// submissions, track changes in our form, and display 
// validation errors; see:

  https://react-hook-form.com/

To utilize it, we can run the following in the Terminal:

  "npm i react-hook-form@7.46.1"

Then, we import a hook called "useForm" using:

  import { useForm } from "react-hook-form";

Next, we define an interface that will define the "shape"
// of our form, specifying what fields we have and what
// their types are:

  interface IssueForm {
    title: string;
    description: string;
  }

Then, we want to call the "useForm" hook in our component
// (before the "return" portion); we'll specify the shape 
// of our form in <angle brackets>

When we call the "useForm" function, we'll get an object, 
// which we then want to destructure so we can grab the 
// "register" function:

    const { register } = useForm<IssueForm>();

Using the "register" function, we can register our input 
// fields with React Hook Form so it can keep track of them

We can use a console.log() to see what's going on here --
// and we can use type "clg" as a shortcut for typing out
// "console.log(first)"!

  console.log(register("title"));

Note only "title" or "description" are valid arguments, 
// according to TabNine(?) -- e.g., passing in "titles" 
// returns the error: <Argument of type '"titles"' is not 
// assignable to parameter of type '"title" | "description"'
// .ts(2345)>

This logs to the console an object with four properties:
// the "name" (which we've specified to be "title") as well
// as "onChange", "onBlur", and "ref" -- which are the
// props that we should apply to an input field so that
// ReactHookForm can keep track of changes in that field

Now that we understand what it's doing, we want to call the
// "register" function where we use our input component,
// <TextField.Input>

To do so, we add curly braces inside the <TextField.Input>
// component to register that field with React Hook Form;
// however, since the "register" function returns an object
// with four properties, we need to use the "spread"
// operator -- "..." -- so we can add those properties as
// props to this component:

  <TextField.Input 
    placeholder="Issue Title" 
    {...register("title")} />

However, we can't use the same technique with the SimpleMDE
// component because it doesn't support additional props
// using the "spread" operator; rather, doing so would
// result in a compile-time error on the <SimpleMDE />

I think it's worthwhile to note that the <TextArea>
// component appears to accept {...register("description")}
// just fine (:

So to solve this issue, we have to use the "Controller"
// component in React Hook Form, which we first import:

  import { useForm, Controller } from "react-hook-form";

Now, instead of directly rendering the SimpleMDE component,
// we have to render a <Controller> component, which we'll
// set with a few properties -- (1) the "name", which we'll
// set to "description"; (2) "control", which we set to the
// "control" object that we can get from the "useForm()" 
// hook (so we need to further destructure the object to 
// pick the "control" property as follows:

  const { register, control } = useForm<IssueForm>();

And, finally, we set the (3) "render" prop to a function
// for rendering an input field, which is where we render
// the SimpleMDE editor/component:

  <Controller
    name="description"
    control={control}
    render={() => <SimpleMDE placeholder="Description" />}
  />

The final step is to give the "render" function an
// argument and destructure it to grab the "field"
// property, which has the same properties we saw earlier
// (i.e., onBlur, onChange, etc.); then, we can add the
// curly braces and "spread" the "field" object within the
// SimpleMDE component:

  render={({ field }) => (
    <SimpleMDE placeholder="Description" {...field} />

At this point, we've registered our input fields with
// React Hook Form, so we can handle the form submission

First, we want to wrap our input fields with a <form>
// instead of a <div> element, which we can do using
// multi-cursor editing (Cmd/Ctrl + D)

We also have to grab another function, "handleSubmit," 
// from the object that's returned using "useForm":

  const { register, control, handleSubmit } = 
    useForm<IssueForm>();

Then we add an "onSubmit" property(?) to the <form> element,
// calling the "handleSubmit" function, into which we want
// to pass a function that will be called when our form is
// submitted; for testing, we can use a "console.log()" to
// display the data in our form, which will be an argument
// of our "handleSubmit" function:

  <form
    className="max-w-xl space-y-3"
    onSubmit={handleSubmit((data) => console.log(data))}
  >

Finally, instead of logging this data to the console, we
// want to send it to our API, which we can do using Axios
// or the FETCH function in browsers; Mosh prefers Axios
// for its easier-to-use syntax, so we install it with:

  "npm i axios@1.5.0"

Then, we import it at the top using:

  import axios from "axios";

Then, instead of logging the "data" object to the console,
// we call "axios.post()" and pass the URL "/api/issues"
// as the first object and our data object as the second;
// that will return a promise, so we have to "await" it 
// and specify that our function is "async":

  onSubmit={handleSubmit(
    async (data) => {await axios.post("/api/issues", data);})}

Finally, after successful form submission, we want to
// redirect the user to the "Issues" page, which requires
// utilizing the router/"useRouter" hook in Next.js; note
// that we want to use the one defined in "next/navigation"
// and *not* the one defined in "next/router" because only
// the former works with the new AppRouter:

  import { useRouter } from "next/navigation";

When we call the "useRouter()" hook we get a router object:

  const router = useRouter();

Then, finally, after the issue has been saved to the API,
// we call "router.push()" and send the user to the
// "/issues" page:

  onSubmit={handleSubmit(async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  })}

// 
// HANDLING ERRORS
// https://youtu.be/J9sfR6HN6BY?t=4060
// 

Our code currently doesn't have error handling messaging,
// so the next thing we want to do is handle potential
// errors, providing some feedback to the user if something
// goes wrong

To do this, we have to wrap the "axios.post()" and
// "router.push()" functions inside a try/catch block;
// when typing "trycatch" the autocompletion will offer
// a "Try-Catch Statement" with an unfilled square symbol,
// which indicates a code snippet:

  try {
          
  } catch (error) {
          
  }

We can move code up & down using Alt/Option + arrows, e.g.
// to put those functions inside the "try" block; for
// more, see the "Selection" menu (adjacent to "File")

For testing, we can log the error to the console so that it
// returns an "AxiosError" object with details (although
// this happened for me before adding the try-catch block)

Since we anticipated the status code 400/"ERR_BAD_REQUEST"
// in our API, this inclues a "response" object with a
// "data" property holding the error messages generated by
// Zod using "validation.error.errors"

Hop to "app/api/issues.route.ts"

In this case, rather than logging the error messaging to
// the console, we want to show a generic error message for
// any unexpected errors; to do so, we first have to 
// declare a "state" variable for holding the error:

  const [error, setError] = useState("");

Note that this may also require importing "useState":

  import { useState } from "react";

Now we can complete our try-catch block as follows:

  onSubmit={handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError(
        "An unexpected error occurred. Please note, 
        both an title and description are required."
      );
    }
  })}

However, this doesn't actually *display* the error to the
// user, which we want to do right above the form using
// the Radix UI component called <Callout>

Similar to the <TextField> component, this can optionally
// include an icon, but we won't use that here:

  <Callout.Root>
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      Callout Message Here
    </Callout.Text>
  </Callout.Root>

To add this error message <Callout>, we'll wrap the entire
// "return" portion inside of a new <div> element, rather
// than an empty fragment <>, so that we can apply styles
// therein; otherwise the <Callout> will take up the whole
// width of the screen, while the form will be restricted

We also only want to render this field conditionally iff
// an error has been encountered, so we use the logical &&

In playing with the spacing, we can use the "space-y-#"
// class name on the <div> to apply spacing under the
// <Callout>, but we need to apply the same style again
// to the <form> element, otherwise it defaults back to 0;
// alternatively, we could add a bottom margin like "mb-5"
// to the <Callout.Root> component

*/
