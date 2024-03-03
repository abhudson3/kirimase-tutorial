import { Button } from "./button";

type LinkProps = {
    label: string,
    to: string
}

export default function Link({ label, to }: LinkProps) {
    return (
        <a href={to}>
            <Button>{label}</Button>
        </a>
    )
}