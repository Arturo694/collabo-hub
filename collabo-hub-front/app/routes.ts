import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";
import { ROUTES } from "./lib/routes";

export default [
    layout("./layouts/PublicLayout.tsx", [
        index("./routes/home.tsx"),
        route(ROUTES.SERVICES, "./routes/services.tsx"),
        route(ROUTES.RESOURCES, "./routes/resources.tsx"),
        route(ROUTES.PRICING, "./routes/pricing.tsx"),
        route(ROUTES.SIGNUP, "./routes/signup.tsx"),
        route(ROUTES.SIGNIN, "./routes/signin.tsx"),
        route(ROUTES.ENTERPRISE, "./routes/enterprise.tsx"),
        route(ROUTES.ERROR, "./routes/error.tsx"),
        route("*", "./routes/404.tsx"),
    ]),
] satisfies RouteConfig;
