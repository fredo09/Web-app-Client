//Layout
import { LayoutAdmin } from './../layouts/LayoutAdmin';

//Admins Pages
import { Admin } from './../pages/Admin';
import { SignIn } from './../pages/Admin/SignIn';

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
    }
];

export default routes;