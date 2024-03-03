import Link from "next/link";
import Image from "next/image";
import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import { Sign } from "crypto";
import SignOutBtn from "./auth/SignOutBtn";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4"><Logo></Logo></h3>
          <SidebarItems />
          <SignOutBtn />
        </div>
        <UserDetails session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.firstName || user.firstName.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full  pt-4  mb-2">
      <SignOutBtn/>
      
      </div>
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted-foreground">
          <p className="text-xs">{user.firstName ?? "John Doe"}</p>
          <p className="text-xs font-light pr-4">
            {user.email ?? "john@doe.com"}
          </p>
          
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.firstName
              ? user.firstName
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
      
    </Link>
  );
};

function Logo(props: any) {
  return (
    <Image
      src="https://download.logo.wine/logo/CGI_Inc./CGI_Inc.-Logo.wine.png"
      width={100}
      height={100}
      alt="Picture of the author"
    />
  );
}

