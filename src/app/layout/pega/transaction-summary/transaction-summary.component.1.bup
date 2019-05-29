import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatInput } from '@angular/material';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit {
  people = [
    {
      name: 'John',
      id: 1,
      colour: 'Green',
      pet: 'Dog'
    },
    {
      name: 'Sarah',
      id: 2,
      colour: 'Purple',
      pet: 'Cat'
    },
    {
      name: 'Lindsay',
      id: 3,
      colour: 'Blue',
      pet: 'Lizard'
    },
    {
      name: 'Megan',
      id: 4,
      colour: 'Orange',
      pet: 'Dog'
    }
  ];
  filterGroup = new FormGroup({
    nameFilter : new FormControl(''),
    idFilter : new FormControl(''),
    colourFilter : new FormControl(''),
    petFilter : new FormControl('')
  });

  nameFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    name: '',
    id: '',
    colour: '',
    pet: ''
  };

  constructor() {
    this.dataSource.data = this.people;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.filterGroup.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    // this.idFilter.valueChanges
    //   .subscribe(
    //     id => {
    //       this.filterValues.id = id;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   );
    // this.colourFilter.valueChanges
    //   .subscribe(
    //     colour => {
    //       this.filterValues.colour = colour;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   );
    // this.petFilter.valueChanges
    //   .subscribe(
    //     pet => {
    //       this.filterValues.pet = pet;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   );
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {

      console.log(' createFilter() filter-->' + JSON.parse(filter));
      const searchTerms = JSON.parse(filter);
      console.log (' createFilter()  searchTerms--> ' + searchTerms);

      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
        // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }

  applyFilter(filterValue: string) {

    console.log('  filtering on -->' + filterValue);
    console.log('    filter -->' +  this.filterGroup.value);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = this.createFilter();
    }



}
