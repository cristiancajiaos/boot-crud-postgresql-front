import {Component, OnInit, TemplateRef} from '@angular/core';
import { faUser, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/angular-fontawesome';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {

  public faUser: IconDefinition = faUser;
  public faTimes: IconDefinition = faTimes;
  public faCheck: IconDefinition = faCheck;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
  }

  public openToastr(): void {
    this.toastr.success("Toastr abierto");
  }

  public openModal(content: TemplateRef<any>): void {
    this.modal.open(content,
      {
        size: 'lg',
        fullscreen: 'lg',
        keyboard: false,
        backdrop: 'static'
      }
    ).result
    .then((resolve) => {
      this.toastr.success(resolve);
    })
    .catch((reject) => {
      this.toastr.error(reject);
    });

  }

}
