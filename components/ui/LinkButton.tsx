import Link from "next/link";
import { Button } from "./button";

type LinkProps = {
    label: string,
    to: string
}

export default function LinkButton({ label, to }: LinkProps) {
    return (
        <Link href={to}>
            <Button variant="secondary">{label}</Button>
        </Link>
    )

}
export function LinkButton2({ label, to }: LinkProps) {
    return (
        <Link href={to}>
            <Button variant="destructive">{label}</Button>
        </Link>
    )
}