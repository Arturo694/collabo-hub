import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("./layouts/PublicLayout.tsx", [
        index("./routes/home.tsx"),
        route("/services", "./routes/services.tsx"),
        route("/resources", "./routes/resources.tsx"),
        route("/pricing", "./routes/pricing.tsx"),
        route("/signup", "./routes/signup.tsx"),
        route("/signin", "./routes/signin.tsx"),
        route("/enterprise", "./routes/enterprise.tsx"),
        route("/error", "./routes/error.tsx"),
        route("*", "./routes/404.tsx"),
    ]),
] satisfies RouteConfig;
