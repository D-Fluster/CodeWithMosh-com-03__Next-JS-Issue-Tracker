import React from "react";

const Spinner = () => {
  return (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

// 
// ADDING A SPINNER
// (CONTINUED from "app/issues/new/page.tsx")
// https://youtu.be/J9sfR6HN6BY?t=5045
// 

PRO TIP: While we've essentially "hard-coded" the classes
// in this component to fit our "Submit New Issue" button,
// and while we *could* take to this to another level by
// giving it a "size" prop to render spinners of different
// sizes, it's better *not* to do so at this point

Because we currently only use the spinner on that button,
// doing so would actually be over-engineering this
// solution based on "what-if" scenarios that may never
// actually come up!

It's best to focus on *existing* problems than trying to
// predict problems that may never happen in the future

Hop back to "app/issues/new/page.tsx"

*/
