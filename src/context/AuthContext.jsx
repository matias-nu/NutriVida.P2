import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/usuarios.js";

// El "contexto" es como una variable global de React:
// cualquier componente puede saber si hay alguien con sesión iniciada,
// sin tener que pasar props por todos lados.
const AuthContext = createContext(null);

const CLAVE_STORAGE = "nutrivida-usuario";

// Lee el usuario guardado (para no perder la sesión al recargar la página)
function leerUsuarioGuardado() {
    try {
        const guardado = localStorage.getItem(CLAVE_STORAGE);
        return guardado ? JSON.parse(guardado) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerUsuarioGuardado);

    // Devuelve true si el correo y la clave coinciden con algún usuario
    function iniciarSesion(correo, clave) {
        const encontrado = usuarios.find(
            (u) => u.correo === correo.trim().toLowerCase() && u.clave === clave
        );

        if (!encontrado) {
            return false;
        }

        // Guardamos todo menos la contraseña
        const { clave: _omitida, ...datosUsuario } = encontrado;
        setUsuario(datosUsuario);
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datosUsuario));
        return true;
    }

    function cerrarSesion() {
        setUsuario(null);
        localStorage.removeItem(CLAVE_STORAGE);
    }

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

// Atajo para usar el contexto: const { usuario } = useAuth();
export function useAuth() {
    return useContext(AuthContext);
}