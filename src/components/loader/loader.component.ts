import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { LoaderState } from "../../common/store/loader.state";

@Component({
    selector: "loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"],
    imports: [AsyncPipe]
})
export class HttpLoaderComponent {
    protected numberOfLoadersActive$ = inject(Store).select(LoaderState.isLoading);
}
