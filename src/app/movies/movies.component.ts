import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from "rxjs/operators";

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    public movies: any;
    displayedColumns: string[] = ['name', 'genre', 'digital', 'bluray', 'dvd'];

    public constructor(private http: Http, private router: Router, private location: Location) {
        this.comps = [];
    }

    public ngOnInit() {
        this.location.subscribe(() => {
            this.refresh();
        });
        this.refresh();
    }

    private refresh() {
        this.http.get("http://niflheim.local:3010/api/component")
            .pipe(map(result => result.json()))
            .subscribe(result => {
                this.comps = result;
            });            
    }

    public search(event: any) {
        let url = "http://niflheim.local:3010/api/component";
        if(event.target.value) {
            url = "http://niflheim.local:3010/api/component?_where=(description,like," + event.target.value + ")";
        }
        this.http.get(url)
            .pipe(map(result => result.json()))
            .subscribe(result => {
                this.comps = result;
            });
    }

    public create() {
        this.router.navigate(["create"]);
    }

}
