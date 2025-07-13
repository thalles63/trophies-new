import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Configuration } from "./config.interface";

@Injectable()
export class ConfigService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/config`;

    public save(configs: Configuration[]) {
        return this.http.post<{ token: string }>(`${this.API_URL}`, { configs });
    }
}
