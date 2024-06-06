import { resolve } from "node:path";
export default {
    server: {
        port: 5173,
    },
    css: {
        devSourceMap: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                alta: resolve('views/alta.html'),
                carrito: resolve('views/carrito.html'),
                contacto: resolve('views/contacto.html'),
                nosotros: resolve('views/nosotros.html'),
                inicio: resolve('index.html'), /* D:\_course\7170.bootcamp.fulltack\clase-23\bc-71350-integrador-etapa-1 */
            }
        }
    }
}
console.log(resolve())