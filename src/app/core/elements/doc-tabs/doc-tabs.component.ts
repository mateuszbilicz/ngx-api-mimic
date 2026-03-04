import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-doc-tabs',
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, NgTemplateOutlet],
  templateUrl: './doc-tabs.component.html',
  styleUrl: './doc-tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTabsComponent {
  previewTemplate = input.required<TemplateRef<unknown>>();
  codeTemplate = input.required<TemplateRef<unknown>>();
}
