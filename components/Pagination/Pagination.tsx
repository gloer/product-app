import "./Pagination.css";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function Pagination({ children }: Props) {
    return (
        <nav className="pagination">
            {children}
        </nav>
    );
}