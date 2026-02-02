import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatMarkdown",
    standalone: true
})
export class FormaMarkdownPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return "";

        let text = value.replace(/\r\n/g, "\n");
        text = text.replace(/([^\n])\n(?!\n)/g, "$1  \n");

        return text;
    }
}
