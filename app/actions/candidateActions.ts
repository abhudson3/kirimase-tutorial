export async function SetResume(userId: string, resumeUrl: string){
    db?.candidate.update({
        where: {userId: userId},
        data: {
            resumeUrl: resumeUrl
        }
    })
}  