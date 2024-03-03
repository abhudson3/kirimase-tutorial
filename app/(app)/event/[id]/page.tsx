"use server"


export default async function EventDetailPage({params: {id}}: {params: {id: string}}){

    const event = await db?.event.findFirst({
        where: {eventId: id}
    })

    return <div>{JSON.stringify(event)}</div>
}