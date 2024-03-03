import Link from "next/link";
import { Button } from "./button";

type LinkProps = {
    label: string,
    to: string
}

export default function LinkButton({ label, to }: LinkProps) {
    return (
        <Link href={to}>
            <Button>{label}</Button>
        </Link>
    )
}