import LinkButton from "@/components/ui/LinkButton";
import { getUserAuth } from "@/lib/auth/utils";


export default async function CandidatePage() {
    const { session } = await getUserAuth()
    const candidates = await db?.candidate.findMany(
        {
            include: {
                user: true
            }
        }
    )

    return <div>
        <LinkButton label="Create Candidate" to="/candidate/create"/>
        {candidates?.map(({ user, candidateId }, index) => <div key={index}>
        <p>{user?.firstName} {user?.lastName} <LinkButton label="Go See This Dude" to={`/candidate/${candidateId}`}/></p>
    </div>)}
    
    
    </div>
}