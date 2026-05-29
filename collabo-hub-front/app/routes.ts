import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("./layouts/PublicLayout.tsx", [
        index("./routes/home.tsx"),
        route("/join", "./routes/join.tsx")
    ]),
] satisfies RouteConfig;
