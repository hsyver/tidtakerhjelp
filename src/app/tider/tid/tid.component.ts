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
  @Input() passeringstider: {id: number, startnr: number, tid: string}[]
  @Input() runderKvinner: number;
  @Input() runderMenn: number;
  @Input() archived: boolean;
  @Output() updateStarttidEvent = new EventEmitter<{id: number, starttid: string}>();
  @Output() updatePasseringstidEvent = new EventEmitter<{id: number, passeringstid: string}>();
  @Output() addPasseringstidEvent = new EventEmitter<{startnr: number, passeringstid: string}>();


  starttid = {hour: 0, minute: 0, second: 0};
  passeringstid = [];
  runder = null;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'bib',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/bibwhite.svg')
    );
  }

  ngOnInit(): void {
    this.runder = this.paamelding.medlem.kjonn == 'K' ? this.runderKvinner : this.runderMenn;

    this.starttid = {hour: parseInt(this.paamelding.starttid.split(":")[0]),
                     minute: parseInt(this.paamelding.starttid.split(":")[1]), 
                     second: parseInt(this.paamelding.starttid.split(":")[2])};

    this.passeringstider = this.passeringstider.filter(p => p.startnr == this.paamelding.startnr).sort((a, b) => a.tid.localeCompare(b.tid));

    for ( var i = 0; i < this.runder; i++ ){
      if ( this.passeringstider.length > i ) {
        this.passeringstid.push({hour: parseInt(this.passeringstider[i].tid.split(":")[0]),
                                  minute: parseInt(this.passeringstider[i].tid.split(":")[1]), 
                                  second: parseInt(this.passeringstider[i].tid.split(":")[2])})
      } else {
        this.passeringstid.push(null);
      }
    }
  }

  onStarttidChange(starttid: {hour: number, minute: number, second: number}) {
    let paddedStarttid = this.pad(starttid);
    let starttidString = `${paddedStarttid.hour}:${paddedStarttid.minute}:${paddedStarttid.second}`;
    this.updateStarttidEvent.emit({id: this.paamelding.id, starttid: starttidString});
  }

  onPasseringstidChange(passeringstid: {hour: number, minute: number, second: number}, p: any) {
    let paddedPasseringstid = this.pad(passeringstid);
    let passeringstidString = `${paddedPasseringstid.hour}:${paddedPasseringstid.minute}:${paddedPasseringstid.second}`;

    if ( !p.id ) {
      console.log(passeringstidString);
      this.addPasseringstidEvent.emit({startnr: this.paamelding.startnr, passeringstid: passeringstidString});
    } else {
      console.log(p.id, passeringstidString);
      this.updatePasseringstidEvent.emit({id: p.id, passeringstid: passeringstidString});
    }
  }
  
  pad(starttid: {hour: number, minute: number, second: number}) {
    return {hour: starttid.hour.toString(), minute: this._pad(starttid.minute.toString()), second: this._pad(starttid.second.toString())}
  }

  _pad(time: string): string {
    if (time.toString().length == 1) {
      return `0${time.toString()}`;
    } else {
      return time.toString();
    }
  }
}
