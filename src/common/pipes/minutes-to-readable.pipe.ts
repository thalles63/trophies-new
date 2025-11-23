import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "minutesToReadable",
    standalone: true
})
export class MinutesToReadablePipe implements PipeTransform {
    transform(minutes: number | null | undefined): string {
        if (minutes == null || isNaN(minutes)) return "--";

        if (minutes < 60) {
            return `${minutes} min${minutes === 1 ? "" : "s"}`;
        }

        const hours = minutes / 60;
        const normalized = Math.round(hours * 2) / 2;

        return `${normalized} hour${normalized === 1 ? "" : "s"}`;
    }
}
