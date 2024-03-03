// import { GetFacilities } from "@/app/actions/uniqueTableActions/FacilityActions";
// import AddFacilityDialog from "./AddFacility";
// import GridExample from "../../../../components/GridPage";
// import { facilities } from "@/lib/colDefs";
import { checkAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import GridExample from "./GridExample";
import { revalidatePath } from "next/cache";


export default async function Page() {
  let authStatus = await checkAuth();
  console.log(authStatus);
  let candidates = await db.candidate.findMany({
    include: {
      user: true,
    },
  });

  let flattenedCandidates = candidates.map((item) => {
    return {
      firstName: item.user.firstName,
      lastName: item.user.lastName,
      phone: item.phone,
      linkedIn: item.linkedIn,
      university: item.university,
      email: item.user.email,
      resumeUrl: item.resumeUrl,
    };
  });
  //   console.log(flattenedCandidates);
  revalidatePath("/")
  return (
    <div>
      View Candidates
      <GridExample
        gridData={flattenedCandidates}
        // admin={true}
      ></GridExample>
    </div>
  );
}
