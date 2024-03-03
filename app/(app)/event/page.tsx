import LinkButton from "@/components/ui/LinkButton"
import LinkButton2 from "@/components/ui/LinkButton"
import { Button } from "@/components/ui/button"
import { getUserAuth } from "@/lib/auth/utils"


export default async function EventPage() {
    const { session } = await getUserAuth()

    const events = await db?.event.findMany({
        include: {
            hrLead: {
                include: {
                    user: true
                }
            }
        }

    })

    return <main className="">
        <LinkButton2 to="/event/create" label="Create a New Event"/> <br /> <br />
        <h1 className="text-2xl font-bold my-2">Events</h1>

        {events?.map(({ date, description, eventId, hrLead, location, title }, index) => <div key={index}>
            <p>{title} - {date?.toDateString()} <br />HR Lead:  {hrLead?.user?.firstName} Description: {description} | Location: {location}</p> 
            <LinkButton label="Details" to={`/event/${eventId}`}/> <Button >Delete</Button> <br /><br />
        </div>)}


    </main>
}