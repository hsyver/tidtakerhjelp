import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() updateStarttidEvent = new EventEmitter<{id: number, starttid: string}>();

  starttid = {hour: 0, minute: 0, second: 0};
  runder = 2;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'bib',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/bib.svg')
    );
  }

  ngOnInit(): void {
    this.starttid = {hour: parseInt(this.paamelding.starttid.split(":")[0]),
                     minute: parseInt(this.paamelding.starttid.split(":")[1]), 
                     second: parseInt(this.paamelding.starttid.split(":")[2])};
  }

  onStarttidChange(starttid: {hour: number, minute: number, second: number}) {
    let paddedStarttid = this.pad(starttid)
    let starttidString = `${paddedStarttid.hour}:${paddedStarttid.minute}:${paddedStarttid.second}`;
    this.updateStarttidEvent.emit({id: this.paamelding.id, starttid: starttidString});
  }

  pad(starttid: {hour: number, minute: number, second: number}) {
    return {hour: starttid.hour.toString(), minute: this._pad(starttid.minute.toString()), second: this._pad(starttid.second.toString())}
  }

  _pad(time: string): string {
    if (time.toString().length == 1) {
      return `0${time.toString()}`
    } else {
      return time.toString()
    }
  }
}
