import { createContext, useContext, useState } from "react";
import { peticion } from "../services/api.js";

const AuthContext = createContext(null);

function leerUsuario() {
    try {
        const token = localStorage.getItem("nutrivida-token");
        const datos = localStorage.getItem("nutrivida-usuario");
        return token && datos ? JSON.parse(datos) : null;
    } catch {
        return null;
    }
}

function normalizarUsuario(usuario) {
    const roles = {
        Administrador: "admin",
        Nutricionista: "nutricionista",
        Paciente: "paciente"
    };

    return {
        ...usuario,
        rol: roles[usuario.rol] || usuario.rol
    };
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerUsuario);

    function guardarSesion(datos) {
        if (!datos.token || !datos.usuario) {
            throw new Error("El servidor no entregó una sesión válida.");
        }

        const usuarioNormalizado = normalizarUsuario(datos.usuario);

        localStorage.setItem("nutrivida-token", datos.token);
        localStorage.setItem(
            "nutrivida-usuario",
            JSON.stringify(usuarioNormalizado)
        );

        setUsuario(usuarioNormalizado);
    }

    async function iniciarSesion(correo, clave) {
        try {
            const datos = await peticion("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    correo: correo.trim().toLowerCase(),
                    password: clave
                })
            });

            guardarSesion(datos);
            return true;
        } catch (error) {
            console.error("Error de inicio de sesión:", error.message);
            return false;
        }
    }

    async function registrar({ nombre, correo, clave }) {
        try {
            await peticion("/auth/registro", {
                method: "POST",
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    correo: correo.trim().toLowerCase(),
                    password: clave
                })
            });

            const correcto = await iniciarSesion(correo, clave);

            return correcto
                ? ""
                : "Cuenta creada, pero no se pudo iniciar sesión.";
        } catch (error) {
            return error.message;
        }
    }

    function cerrarSesion() {
        localStorage.removeItem("nutrivida-token");
        localStorage.removeItem("nutrivida-usuario");
        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{ usuario, iniciarSesion, registrar, cerrarSesion }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
