import { createContext, useContext, useState } from "react";
import { buscarPorCredenciales, registrarUsuario } from "../services/usuarioService.js";

const AuthContext = createContext(null);

const CLAVE_STORAGE = "nutrivida-usuario";


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

    // Guarda la sesión (sin la contraseña) en el estado y en localStorage
    function abrirSesion(datos) {
        const { clave: _omitida, ...datosUsuario } = datos;
        setUsuario(datosUsuario);
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datosUsuario));
    }

    // Devuelve true si el correo y la clave coinciden con algún usuario
    function iniciarSesion(correo, clave) {
        const encontrado = buscarPorCredenciales(correo, clave);

        if (!encontrado) {
            return false;
        }
        abrirSesion(encontrado);
        return true;
    }


    function registrar(datos) {
        try {
            abrirSesion(registrarUsuario(datos));
            return "";
        } catch (error) {
            return error.message;
        }
    }

    function cerrarSesion() {
        setUsuario(null);
        localStorage.removeItem(CLAVE_STORAGE);
    }

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}