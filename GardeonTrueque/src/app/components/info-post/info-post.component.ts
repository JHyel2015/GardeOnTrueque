import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.component.html',
  styleUrls: ['./info-post.component.css']
})
export class InfoPostComponent implements OnInit {
  @Input() id: number;

  constructor() { }

  ngOnInit() {
    console.log(this.id);
  }

}
