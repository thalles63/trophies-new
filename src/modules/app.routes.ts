import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./home/home.component").then((m) => m.HomeComponent) },
    { path: "game/:id", loadComponent: () => import("./game/detail/game-detail.component").then((m) => m.GameDetailComponent) }
];
