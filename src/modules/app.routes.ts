import { Routes } from "@angular/router";
import { SyncComponent } from "./game/sync/game-sync.component";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./home/home.component").then((m) => m.HomeComponent) },
    {
        path: "game",
        loadChildren: () => import("./game/game.routing")
    },
    {
        path: "syncItad",
        component: SyncComponent
    },
    {
        path: "backlog-schedule",
        loadChildren: () => import("./backlog-schedule/backlog-schedule.routing")
    }
];
