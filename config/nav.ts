import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon, CircleUser, QrCode, Table } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: CircleUser },
  { href: "/settings", title: "Settings", icon: Cog },
  { href: "/qrcode", title: "Event Qr Code", icon: QrCode },
  { href: "/candidate-view", title: "Candidate Table", icon: Table },
];

export const additionalLinks: AdditionalLinks[] = [];
