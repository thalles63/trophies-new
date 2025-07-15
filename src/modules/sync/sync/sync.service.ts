import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class SyncService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/sync`;

    public syncWithPlaystation() {
        return this.http.post(`${this.API_URL}/playstation`, {});
    }

    public syncWithXbox() {
        return this.http.post(`${this.API_URL}/xbox`, {});
    }

    public syncWithSteam() {
        return this.http.post(`${this.API_URL}/steam`, {});
    }

    public syncWithRetroAchievements() {
        return this.http.post(`${this.API_URL}/retro-achievements`, {});
    }
}
