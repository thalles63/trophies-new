import { computed, Injectable, signal } from "@angular/core";
import { defer, finalize, Observable } from "rxjs";
import { LoaderEnum } from "../../common/enums/loader.enum";

@Injectable({ providedIn: "root" })
export class LoaderService {
    private readonly activeLoaders = signal<Set<LoaderEnum>>(new Set());

    public watch<T>(loaderId: LoaderEnum) {
        return (source: Observable<T>) =>
            defer(() => {
                this.activateLoader(loaderId);
                return source.pipe(finalize(() => this.deactivateLoader(loaderId)));
            });
    }

    public isLoaderActive(loaderId: LoaderEnum) {
        return computed(() => this.activeLoaders().has(loaderId));
    }

    private activateLoader(id: LoaderEnum) {
        const current = new Set(this.activeLoaders());

        current.add(id);
        this.activeLoaders.set(current);
    }

    private deactivateLoader(id: LoaderEnum) {
        const current = new Set(this.activeLoaders());

        current.delete(id);
        this.activeLoaders.set(current);
    }
}
