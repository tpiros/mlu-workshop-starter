import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private display: string;
  constructor(private http: Http) {
    this.http.get('http://localhost:3000/api/test')
    .map(response => response.json())
    .subscribe(response => this.display = response);
  }
}

