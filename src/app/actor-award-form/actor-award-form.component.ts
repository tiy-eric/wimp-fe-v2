import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-actor-award-form',
  templateUrl: './actor-award-form.component.html',
  styleUrls: ['./actor-award-form.component.css'],
  animations: [fadeInAnimation]
})
export class ActorAwardFormComponent implements OnInit {

  actorAwardForm: NgForm;
  @ViewChild('actorAwardForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  actorId: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.actorId = +params['id'] : null;
      });
  }

  saveAwardToActor(actorAwardForm: NgForm){
    
      this.dataService.addRecord("actors/"+this.actorId+"/awards", actorAwardForm.value)
          .subscribe(
            result => this.successMessage = "Record added successfully",
            error => this.errorMessage = <any>error
          );
          
          this.actorAwardForm.form.markAsPristine();

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.actorAwardForm = this.currentForm;
    this.actorAwardForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.actorAwardForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    title: "",
    organization: "",
    year: ""
  };
  
  validationMessages = {
    'title': {
      'required': 'Award title is required.',
      'minlength': 'Award title must be at least 2 characters long.',
      'maxlength': 'Award title cannot be more than 30 characters long.'
    },
    'organization': {
      'required': 'Organization is required.',
      'minlength': 'Organization must be at least 2 characters long.',
      'maxlength': 'Organization cannot be more than 30 characters long.'
    },
    'year': {
      'pattern': 'Year must be a a 4 digit year e.g. 1999'
    },
  };

}
