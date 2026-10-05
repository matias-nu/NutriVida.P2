import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitest.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        // Navegador simulado: jsdom entrega document, window, localStorage, etc.
        environment: "jsdom",
        // Permite usar describe/it/expect sin importarlos en cada archivo
        globals: true,
        // Se ejecuta antes de las pruebas (agrega matchers como toBeInTheDocument)
        setupFiles: ["./vitest.setup.js"],
        include: ["src/**/*.{test,spec}.{js,jsx}"],
        // Informe de cobertura: npm run test:coverage
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            reportsDirectory: "./coverage",
            include: ["src/**/*.{js,jsx}"],
            exclude: ["src/main.jsx", "src/**/*.test.{js,jsx}"],
        },
    },
});
