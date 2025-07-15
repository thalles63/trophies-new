import { Routes } from "@angular/router";
import { PlatformEnum } from "../../common/enums/platform.enum";
import { SyncComponent } from "./sync/sync.component";

const routes: Routes = [
    {
        path: "playstation",
        component: SyncComponent,
        data: {
            platform: PlatformEnum.Playstation5
        }
    },
    {
        path: "xbox",
        component: SyncComponent,
        data: {
            platform: PlatformEnum.Xbox
        }
    },
    {
        path: "steam",
        component: SyncComponent,
        data: {
            platform: PlatformEnum.Steam
        }
    },
    {
        path: "retro-achievements",
        component: SyncComponent,
        data: {
            platform: PlatformEnum.RetroAchievements
        }
    }
];

export default routes;
