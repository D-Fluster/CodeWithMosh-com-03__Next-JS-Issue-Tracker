import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400})

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, { status: 201 });
}

// // // // // // // // // // // // // // // // // // // //

/* NOTES:

//
// BUILDING AN API
// https://youtu.be/J9sfR6HN6BY?t=2196
// 

Now that we have a model, we have to create an API that
// clients can call in order to store issues

Mosh notes that he went over this in Part 1 of the course,
// so obviously in the paid portion, and that we should
// reference that if we're confused about this setup >_<

Here, we're exporting a function called "POST" that takes
// a request object of type "NextRequest"; this must be
// imported using:

    import { NextRequest } from "next/server";

In the function, we first call "request.json()" -- but
// since this returns a promise, we need to "await" it
// to get the body of the request; and, because we're 
// awaiting, this requires our function to be "async":

    export async function POST(request: NextRequest) {
        const body = await request.json();
    }

Now that we have the request body, before we create an
// issue, we first have to validate our request to ensure
// it doesn't have any bad data

Here, we'll use Zod for data validation; we can install
// this by running "npm i zod@3.22.2" in the Terminal
// and then importing it into this "route" file with:

    import { z } from "zod";

Then we call "z.object()" and give it an object that
// defines the shape of the object in the body of our
// request, which will only require a "title" and a
// "description" because we've given all the other fields
// a default value (see model in "/prisma/schema.prisma")

The result of that function call will return a schema,
// so we'll store it here in a const value such as "schema"
// or something more descriptive like "createIssueSchema"
// for scalability more complex applications with multiple
// schemas for different operations

    const createIssueSchema = z.object({
        title: z.string().min(1).max(255),
        describe: z.string().min(1)
    });

Now that we have this schema, we can use it to validate the
// body of the request, by calling 
// "createIssueSchema.safeParse()" and passing it the
// "body" object

This will return an object, which we'll call "validation":

    const validation = createIssueSchema.safeParse(body);

Next, we check if the validation is successful; if not,
// we return the "NextResponse.json()" and include the
// validation errors wtih the first argument 
// "validation.error.errors" as well as the status as
// the second argument (here, "{ status: 400 }" which
// means "bad request," indicating the client sent bad data

    if (!validation.success)
        return NextResponse.json(
            validation.error.errors, 
            { status: 400})

Otherwise, if the request *is* valid, we should store this
// new issue in our database -- and to do this, we'll need
// to import Prisma Client

In Part 1, he explains that we should only have a *single*
// instance of the Prisma Client and how to create that
// single instance properly 

We can find sample code for creating an instance of Prisma
// Client from the "Best practice for instantiating Prisma 
// Client with Next.js" article linked below; we'll paste
// it into a new "client.ts" file in our "prisma" folder

    https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

Note that the code appears different in Mosh's video
// compared to what looks like the most updated version of
// the same article; they've also changed around the
// breadcrumbs and naming schemes since Mosh's video's
// release in October 2023

This code is just creating a single instance of Prisma
// Client, and ensuring that we don't have multiple
// instances running; we then import this using:

    import prisma from "@prisma/client";

    // where the "@" represents the root of this project

With this Prisma Client, we can insert a new issue in our
// database by calling "prisma.issue.create()" and passing
// and object with the two properties we're collecting --
// i.e., title and description

Since we must "await" this call to "prisma.issue.create()"
// to get the "new issue", we can set this up with:

    const newIssue = await prisma.issue.create({data: 
        {title: body.title, description: body.description}
    });

However, according to TabNine, "prisma.issue" cannot be
// accessed like this (anymore?), but requires a
// different import strategy:

    import { PrismaClient } from "@prisma/client";
    const prisma = new PrismaClient()

Finally, we return this to the client by "return"ing a
// "NextResponse.json()" with "newIssue" as the first
// argument and, optionally, a second argument with the
// status "201," meaning "an object was created"

We can then verify that our data validation is working
// using Postman by sending a "POST" request to
// "http://localhost:3000/api/issues" and selecting the
// options "Body" (tab), "Raw" (radio button), and "JSON"
// (text type in drop-down), then entering data

    https://web.postman.co/workspace/My-Workspace~ba3328a5-bccc-4dc9-8aa9-8e0d36a59b3e/request/create

Sample "Bad Request" with error status 400 -- because the
// title must be at least 1 character long and the
// description is a required field:

    {
        "title": ""
    }

Sample successful request with status 201 ("Created"):

    {
        "title": "First issue",
        "description": "Description of the first issue"
    }

Finally, we can view/refresh our MySQL Workbench to view
// this new issue and its associated ID, title,
// description, status, and created & updated timestamps!

*/