import {Component, OnInit, TemplateRef} from '@angular/core';
import { faUser, faTimes, faCheck, faAdd, faCircle, faPencil } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/angular-fontawesome';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
  public faAdd: IconDefinition = faAdd;
  public faCircle: IconDefinition = faCircle;
  public faPencil: IconDefinition = faPencil;

  public userControl!: FormControl;
  public userForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userControl = new FormControl('', [Validators.required]);

    this.userForm = this.fb.group({
      user: this.userControl
    });
  }

  public submitUserForm(): void {
    const userName: string = this.userForm.value['user'];
    this.toastr.success(`User: ${userName}`);
    this.userForm.reset()
  }

  public openToastr(): void {
    this.toastr.success("Toastr abierto");
  }

  public editUser(): void {
    this.toastr.success('editUser()');
  }

  public deleteUser(content: TemplateRef<any>): void {
    this.modal.open(content,
      {
        size: 'lg',
        keyboard: false,
        backdrop: 'static'
      }
    ).result
    .then((resolve) => {
      // Si
      this.toastr.success(resolve);
    })
    .catch((reject) => {
      // No
    });

  }

}
