"use server"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CreateEventInteractionForm from "./CreateEventInteractionForm";
  
  

export default async function EventDetailPage({params: {id}}: {params: {id: string}}){

    const event = await db?.event.findFirst({
        where: {eventId: id},
        include: {
          interactions: {
            include: {
              candidate: {
                include: {
                  user: true
                }
              }
            }
          }
        }
    })

    const candidates = await db?.candidate.findMany({
      include: {
        user: true
      }
    })

    
    const formattedCandidates = candidates?.map(({candidateId, user}) => ({id: candidateId, name: `${user?.firstName} ${user?.lastName}`}))

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
          <ul>
            {event?.interactions.map(({candidate, sentimentScore, notes}, index) => (<li key={index}>{candidate?.user?.firstName} {candidate?.user?.lastName} {sentimentScore} {notes}</li>))}
          </ul>
        </Card>
{/*@ts-ignore  */}
        <CreateEventInteractionForm candidates={formattedCandidates} eventId={event?.eventId}/>
        </main>
      );
}