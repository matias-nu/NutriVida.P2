import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Precio from "./Precio.jsx";

describe("Precio", () => {
    it("muestra el valor en pesos chilenos con separador de miles", () => {
        render(<Precio valor={35000} />);
        expect(screen.getByText(/35\.000/)).toBeInTheDocument();
    });

    it("muestra el cero como $0", () => {
        render(<Precio valor={0} />);
        expect(screen.getByText(/\$\s?0/)).toBeInTheDocument();
    });
});