import { Component, ContentChildren } from "@angular/core";
import { TabComponent } from "./tab/tab.component";

@Component({
    selector: "tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent {
    @ContentChildren(TabComponent) public tabComponents!: TabComponent[];

    public setTabsInactive() {
        for (const tab of this.tabComponents) {
            tab.active = false;
        }
    }

    public setActiveTab(tabComponent: TabComponent) {
        for (const tab of this.tabComponents) {
            tab.active = tab.tabTitle === tabComponent.tabTitle;
        }
    }
}
