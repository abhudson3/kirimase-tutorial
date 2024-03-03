import LinkButton from "@/components/ui/LinkButton"
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
        <h1 className="text-2xl font-bold my-2">Profile</h1>

        {events?.map(({ date, description, eventId, hrLead, location, title }) => <div>
            <p>{description} {date?.toDateString()} {eventId} {hrLead?.user?.firstName} {location} {title}</p> <LinkButton label="Details" to={`/event/${eventId}`}/> 
        </div>)}

        <LinkButton to="/event/create" label="Create Event" />
    </main>
}