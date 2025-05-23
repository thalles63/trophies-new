import { Routes } from "@angular/router";
import { GameDetailComponent } from "./detail/game-detail.component";

const routes: Routes = [
    {
        path: "",
        component: GameDetailComponent
    },
    {
        path: ":id",
        component: GameDetailComponent
    }
];

export default routes;
