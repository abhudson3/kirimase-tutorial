import { getUserAuth } from "@/lib/auth/utils";


export default async function CandidatePage() {
    const {session} = await getUserAuth()

    return <div>hello</div>
}