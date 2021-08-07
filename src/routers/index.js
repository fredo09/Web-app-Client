//Layout
import { LayoutAdmin } from './../layouts/LayoutAdmin';
import { LayoutBasico } from './../layouts/LayoutBasico';

//Admins Pages
import { Admin } from './../pages/Admin';
import { SignIn } from './../pages/Admin/SignIn';

//Pages Basic
import { Home } from './../pages/Home';
import { Contacto } from './../pages/Contacto';
import { Error404 } from './../pages/Error404';

//Routes para el panel de administraciòn
const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: Admin,
                exact: true
            },
            {
                path: "/admin/login",
                component: SignIn,
                exact: true
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasico,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contacto,
                exact: true
            }
        ]
    }
];

export default routes;