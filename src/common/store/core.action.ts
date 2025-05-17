export class UpdateBackgroundScreenshot {
    public static readonly type = "[App Core] Update the screenshot in the background";
    public constructor(public payload: string | undefined) {}
}
