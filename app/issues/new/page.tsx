"use client";

import axios from "axios";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { createIssueSchema } from "@/app/validationSchemas";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  // console.log(register("title"));
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError(
        "An unexpected error occurred. Please note, both an Issue Title and an Issue Description are required."
      );
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Issue Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
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

Next section begins in "app/api/issues.route.ts"

// 
// IMPLEMENT CLIENT-SIDE VALIDATION
// (CONTINUED from "app/api/issues.route.ts")
// https://youtu.be/J9sfR6HN6BY?t=4470
// 

To use the "createIssueSchema" schema in our form here as
// well, we'll need to install the following package,
// which allows React Hook Form to integrate with various
// data validation libraries, such as Zod:

  "npm i @hookform/resolvers@3.3.1"

Next, we import it herein at the top using:

  import { zodResolver } from "@hookform/resolvers/zod";

Then, when we call the "useForm()" hook, we'll need to
// pass a configuration object and set the "resolver"
// to "zodResolver()" and pass it our Zod schema, i.e.
// "createIssueSchema", which will then also be imported:

  import { createIssueSchema } from "@/app/validationSchemas";

  ...

  const { register, control, handleSubmit } = 
    useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema),
    });

And this is how we can integrate React Hook Forms with Zod!

Next, taking a look at our "interface IssueForm", it seems
// a bit redundant, as these are the same fields we're
// validating using the schema above; if we ever add more
// more properties/fields to our form, we'd have to update
// both this interface and the schema separately (not DRY!)

However, we can generate this interface automatically
// based on our schema! To do so, we first import:

  import { z } from "zod";

Then, we remove the original "interface" and instead call
// "z.infer" and pass it our schema in angle brackets:

  z.infer<typeof createIssueSchema>;

This will return a "type", so we store it in a "type"
// object and call it "IssueForm" like the old interface:

  type IssueForm = z.infer<typeof createIssueSchema>;

This enables Zod to infer the interface(?) type for us,
// based on our schema

Now that we've integrated React Hook Forms with Zod, we can
// display validation errors by grabbing the "formState"
// object from the "useForm" hook; the "formState" object
// represents everything we need to know about our form,
// and we can destructure it and press Ctrl + Space to see
// the many properties it contains

It contains an "errors" property, which we'll use here, as
// well as "isDirty" (which is useful to know if the form 
// has changed), "isValid" (which is useful if you want
// to disable the "Submit" button if the form fields are
// not valid), "isSubmitted", etc.

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

We can use this to render an error message just after each
// field by rendering an error message component if, e.g.
// "errors.title" is truthy (i.e., the "title" form field
// has at least one error)

While we can use a <p>aragraph element to do so, we want
// to be consistent in our UI so we use the Radix UI
// <Text> component, which will be auto-imported with use:

For the title, just after </TextField.Root> we add:

  {errors.title && <Text color="red">
    {errors.title.message}</Text>}

For the description, just after <Controller /> we add:

  {errors.description && (
    <Text color="red">{errors.description.message}</Text>
  )}

However, there is a styling issue because the <Text>
// component is not a block-level element; rather, we can
// see it's being rendered as a <span>

Thus, we use the "as" prop of the <Text> component to set
// this to the type of element that should be rendered
// for each error message; here we'll use "p"aragrah:

  <Text color="red" as="p">

// 
// EXTRACTING THE ERROR MESSAGE COMPONENT
// https://youtu.be/J9sfR6HN6BY?t=4840
// 

As it stands, every time we render an error we need to
// include a conditional statement about when to render it
// as well as the "color" and "as" properties

To minimize duplication efforts, we can instead extract
// this into its own custom, reusable component

Hop to the new "app/components/ErrorMessage.tsx"

Once we've finalized our new <ErrorMessage> component and
// moved the responsibility for checking whether an error
// exists therein as well, we can simplify our error
// messaging code herein to simply: 

  <ErrorMessage>{errors.title?.message}</ErrorMessage>

Note that we add the "optional chaining" singifier "?" 
// after "title" and "description" because otherwise we get 
// a compilation error, as these values may be undefined

// 
// ADDING A SPINNER
// https://youtu.be/J9sfR6HN6BY?t=5045
// 

We can improve UX by showing a spinner on our "Submit"
// button while the form is submitting, which we'll do 
// with a Tailwind spinner element:

    https://tw-elements.com/docs/react/components/spinners/

PRO TIP: To rename many instances of the same word at once
// without having to use Ctrl + D to individually select
// each one, we can use the Shift + Ctrl + L shortcut --
// however, it looks like that's also the shortcut to open
// up Loom, so that's what it's doing here (':

Hop to the new "app/components/Spinner.tsx"

Once we've finalized our new <Spinner> component, we can
// add it to our <Button> component; however, since we only
// want the spinner to appear when the form is submitting,
// we need to initialize another state variable,
// "isSubmitting", with a default value of "false":

  const [isSubmitting, setSubmitting] = useState(false);

Then, in our "try" block, before we call the back end, we
// want to set the "isSubmitting" state to "true" using the
// "setSubmitting" function; and in our "catch" block, if
// something goes wrong, we reset the "isSubmitting" state 
// to "false" so the spinner doesn't stick around forever:

  try {
    setSubmitting(true);
    await axios.post("/api/issues", data);
    router.push("/issues");
  } catch (error) {
    setSubmitting(false);
    setError(
      "An unexpected error occurred. Please note, both an Issue Title and an Issue Description are required."
    );
  }

Next, within our button, we want to check if "isSubmitting"
// is truthy and only render the spinner if it is using
// the logical && operator:

  <Button>Submit New Issue 
    {isSubmitting && <Spinner />}</Button>

Finally, it's also good practice to disable the button
// while the form is being submitted, in order to prevent 
// the user from submitting the form multiple times --
// which is especially important with money applications!

Thus, we can add the "disabled" prop to the <Button> and
// set it to "{isSubmitting}":

  <Button disabled={isSubmitting}>
    Submit New Issue {isSubmitting && <Spinner />}
  </Button>

// 
// DISCUSSION: CODE ORGANIZATION
// https://youtu.be/J9sfR6HN6BY?t=5305
// 

While some SWEs argue that in-line functions should never
// be used and should always be abstracted elsewhere, and
// others argue that they should always be used for clarity
// and to lessen back-and-forth efforts, Mosh uses the rule
// of thumb that in-line functions should only be used if
// they're 2 lines or less; here, our "handleSubmit"
// function is 7+ lines long

With that in mind, we'll pull out the <form onSubmit>
// function rules and put them into their own const; this
// way, the logic for what happens when we submit the form
// is completely separated from our markup

Additionally, some SWEs argue that using Axios or otherwise
// making HTTP calls inside of / in the middle of a 
// component violates the separation of concerns principle, 
// an old CompSci principle which says that we should 
// separate a program into distinct modules, each with 
// their own "concern" -- because, if concerns are well 
// separated, there are more opportunities for code reuse

Rather, they would suggest moving the logic for
// "await axios.post("/api/issues", data);" into a
// separate function outside of this module, and then
// call that function here -- e.g., we could have a
// "createIssue()" function that takes the "data" as an
// argument (i.e., "createIssue(data)") -- and in that
// function we'd include the code for making the HTTP call

However, in this case, Mosh finds it to be unnecessary
// abstraction to move that logic into a separate function
// in this particular application, as this is the only
// place where we need to create an issue for this
// application, meaning it won't be reused elsewhere

With that said, in other applications, making HTTP calls
// might be more complicated -- e.g., certain HTTP headers
// must be included in each request when calling some
// third-party APIs -- and in those cases, we wouldn't
// want to throw all that complexity inside our components,
// so it would make sense to create separate modules

TL;DR: SWE isn't black-and-white, so there's no such thing
// as a one-size-fits-all solution!

*/
