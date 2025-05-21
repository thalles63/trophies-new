import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngxs/store";
import { UpdateBackgroundScreenshot } from "../../common/store/core.action";
import { Game } from "../game/models/game.interface";
import { GameCardComponent } from "./game-card/game-card.component";
import { HomeService } from "./services/home.service";

@Component({
    selector: "app-home",
    imports: [GameCardComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    private readonly service = inject(HomeService);
    private readonly destroyref = inject(DestroyRef);
    private readonly store = inject(Store);

    protected games = <Game[]>[];

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshot(undefined));
        this.listGames();
    }

    private listGames() {
        this.service
            .listGames(2, 24)
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result: any) => {
                this.games = result.games;
            });
    }
}
