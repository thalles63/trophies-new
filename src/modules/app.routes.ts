import { Routes } from "@angular/router";
import { AuthGuard } from "../common/guards/auth.guard";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./home/home.component").then((m) => m.HomeComponent) },
    {
        path: "game",
        loadChildren: () => import("./game/game.routing")
    },
    {
        path: "sync",
        canActivateChild: [AuthGuard],
        loadChildren: () => import("./sync/sync.routing")
    }
];
