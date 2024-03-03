"use server"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  

export default async function EventDetailPage({params: {id}}: {params: {id: string}}){

    const event = await db?.event.findFirst({
        where: {eventId: id}
    })



    return (
        <main className="">
    
        <Card className={("w-[380px]")}>
          <CardHeader>
            {/* @ts-ignore */}
            <CardTitle>{event.title} - {event?.date.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Location: {event?.location} <br /> HR Lead: {event?.hrLeadId} <br /> <br />{event?.description}</p>
          </CardContent>
        </Card>
        </main>
      );
}