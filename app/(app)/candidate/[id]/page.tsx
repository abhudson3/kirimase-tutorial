"use server"

import { UpdateCandidateForm } from "./UpdateCandidateForm"

export default async function CandidateDetailPage({ params: { candidateId } }: { params: { candidateId: string } }) {

    // @ts-ignore
    const candidate = await db?.candidate.findFirst({
        where: {
            candidateId: candidateId
        },
        include: {
            user: true
        }
    })

    return <div>
{/*@ts-ignore  */}
<UpdateCandidateForm candidate={candidate}/>
    </div>
}
