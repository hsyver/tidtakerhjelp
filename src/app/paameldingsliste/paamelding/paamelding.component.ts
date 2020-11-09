import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paamelding } from '../../models/paamelding.model';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-paamelding',
  templateUrl: './paamelding.component.html',
  styleUrls: ['./paamelding.component.scss']
})
export class PaameldingComponent implements OnInit {
  @Input() paamelding: Paamelding;
  @Output() deletePaameldingEvent = new EventEmitter<number>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'bib',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/bib.svg')
    );
  }

  ngOnInit(): void {
  }

  deletePaamelding() {
    this.deletePaameldingEvent.emit(this.paamelding.id);
  }
}
