import { Component, OnInit } from "@angular/core";
import { MistakeService } from "../shared/mistake.service";
import * as _ from "lodash";

@Component({
  selector: "mistakes-list",
  templateUrl: "./mistakes-list.component.html",
  styleUrls: ["./mistakes-list.component.scss"]
})
export class MistakesListComponent implements OnInit {
  constructor(private mistakeSvc: MistakeService) {}

  // Unwrapped arrays from firebase
  mistakes: any;
  filteredMistakes: any;
  mistakesCount: number;

  // Filter-able properties
  liked: boolean;
  unliked: boolean;
  errorCount: number;
  content: string;
  correction: string;

  // Active filter rules
  filters = {};

  // Misc. properties
  showSpinner: boolean = true;

  ngOnInit() {
    this.mistakeSvc
      .getMistakesList({ limitToLast: 100 })
      .subscribe(mistakes => {
        this.mistakes = mistakes;
        this.applyFilters();
        this.showSpinner = false;
      });
  }

  private applyFilters() {
    this.filteredMistakes = _.filter(this.mistakes, _.conforms(this.filters));
    this.mistakesCount = this.filteredMistakes.length;
  }

  // Filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
  }

  // Filter property by partial equality to rule
  filterPartial(property: string, rule: any) {
    const delay = 500;
    _.debounce((this.filters[property] = val => val.indexOf(rule) >= 0), delay);
    this.applyFilters();
  }

  // Filter properties that resolve to true
  filterBooleanTrue(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property);
    else {
      this.filters[property] = val => val;
      this.applyFilters();
    }
  }

  // Filter properties that resolve to true
  filterBooleanFalse(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property);
    else {
      this.filters[property] = val => !val;
      this.applyFilters();
    }
  }

  // Filter numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val >= rule;
    this.applyFilters();
  }

  // Remove filters
  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {};
    this.applyFilters();
  }
}
