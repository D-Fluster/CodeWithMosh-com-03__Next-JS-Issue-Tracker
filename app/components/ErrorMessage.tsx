import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

// 
// EXTRACTING THE ERROR MESSAGE COMPONENT
// (CONTINUED from "app/issues/new/page.tsx")
// https://youtu.be/J9sfR6HN6BY?t=4840
// 

While we would normally define "interface Props" with
// the property "children" of type "ReactNode", then
// pass the deconstructed properties into our component
// with "({ children }: Props)", this is actually not
// necessary because React includes a type that defines
// this same shape

Thus, instead of explicitly defining this interface every
// time, we can import and utilize "PropsWithChildren"
// instead of the basic "Props", which is defined in and
// thus must be imported from the "react" module:

    import React, { PropsWithChildren } from "react";

    const ErrorMessage = 
        ( {children} : PropsWithChildren ) => { .....

We can Ctrl + Click on "PropsWithChildren" to find info:

    type PropsWithChildren<P = unknown> = 
        P & { children?: ReactNode | undefined };

    from "\node_modules\@types\react\index.d.ts"

This allows us to define the look and feel of our errors
// in a single place, rather than having to remember to
// style them each time

Additionally, instead of checking if there is an error for
// each property in our form every time, we can extract
// that "check" to be here in our <ErrorMessage> component
// by returning "null" if "children" is falsey -- i.e.:

  if (!children) return null;

Hop back to "app/issues/new/page.tsx"

*/
