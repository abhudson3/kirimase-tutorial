"use server"

import { log } from "console";
import EventCreateForm from "./eventCreatePage";

import { db } from "@/lib/db";


export default async function EventCreatePage() {
    const hrEmployees = await db?.employee.findMany({
    })
    console.log("look here");

    console.log(hrEmployees);

    const ids = hrEmployees?.map(e => ({ id: e.userId }))

    console.log(ids);

    const userIds = hrEmployees?.map(e => e.userId)


    const users = await db?.user.findMany({
        // @ts-ignore
        where: { id: {in: userIds} },
        include: {
            employee: true
        }
    })


    // @ts-ignore
    return <EventCreateForm hrEmployees={users?.map(({ firstName, lastName, employee }) => ({ id: employee.employeeId, name: `${firstName} ${lastName}` }))} />

}

// const Form = () => {
// <form action={formAction}>

// <Label htmlFor="email" className="text-muted-foreground">
//   Title
// </Label>
// <Input name="title" id="title" type="string" required />
// <br />

// <Label htmlFor="location" className="text-muted-foreground">
//   Location
// </Label>
// <Input type="text" name="location" id="location" required />
// <br />


// <Label htmlFor="date" className="text-muted-foreground">
//  Date 
// </Label>
// <Input type="date" name="date" id="date" required />
// <br />


// <Label htmlFor="description" className="text-muted-foreground">
//  Description 
// </Label>
// <Input type="text" name="description" id="description" required />
// <br />

// <SubmitButton />
// </form>
// }
