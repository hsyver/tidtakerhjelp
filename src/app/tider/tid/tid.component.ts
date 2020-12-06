import { Component, OnInit, Input } from '@angular/core';
import { Paamelding } from '../../models/paamelding.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tid',
  templateUrl: './tid.component.html',
  styleUrls: ['./tid.component.scss']
})
export class TidComponent implements OnInit {
  @Input() paamelding: Paamelding;
  @Input() archived: boolean;

  time = {hour: 0, minute: 0, second: 0};
  runder = 2;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'bib',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/bib.svg')
    );
  }

  ngOnInit(): void {

  }

}
