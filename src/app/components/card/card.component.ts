import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private router: Router;

  @Input() characterName = '';
  @Input() characterType = '';
  @Input() characterDescription = '';
  @Input() characterAvatar = '';

  @Output() characterDeleted = new EventEmitter<string>()

  constructor(router: Router, private apiService: ApiFetchServiceService) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onClickEdit(event: Event) {
    event.stopPropagation();
  }

  onClickDelete(event: Event) {
    event.stopPropagation();
    this.apiService.deleteCharacter(API_TO_USE, this.characterName).subscribe(response => {
      if (response === this.characterName) {
        this.characterDeleted.emit(response);
      }
    });
  }

  onClickCharacter() {
    this.router.navigate(['character', this.characterName]);
  }
}
