import {Component, OnInit, TemplateRef} from '@angular/core';
import { faUser, faTimes, faCheck, faAdd, faCircle, faPencil, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/angular-fontawesome';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service';
import {User} from '../../classes/user';

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
  public faSpinner: IconDefinition = faSpinner;

  public loadingUsers: boolean = false;
  public currentUserId: number = 0;

  public users: User[] = [];

  public userControl!: FormControl;
  public userForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userControl = new FormControl('', [Validators.required]);

    this.userForm = this.fb.group({
      user: this.userControl
    });

    this.getUsers();
  }

  public getUsers(): void {
    this.loadingUsers = true;
    this.userService.getUsers().then((users) => {
      this.users = users;
      this.sortUsers();
      this.loadingUsers = false;
    }).catch((reject) => {
      this.toastr.error("Hubo un error al obtener los usuarios");
    });
  }

  public submitUserForm(): void {
    const userName: string = this.userForm.value['user'];

    let user = new User();
    user.name = userName;

    if (this.currentUserId == 0) {
      // Nuevo usuario
      this.userService.createUser(user).then((user) => {
        this.toastr.success(`Usuario creado exitosamente`);
        this.getUsers();
        this.resetForm();
      }).catch((reject) => {
        this.toastr.error(`Hubo un error al crear el usuario`);
      });
    } else {
      // Editar usuario
      this.userService.editUser(this.currentUserId, user).then
      ((user) => {
        this.toastr.success(`Usuario editado exitosamente`);
        this.getUsers();
        this.resetForm();
      }).catch((reject) => {
        this.toastr.error(`Hubo un error al editar el usuario`);
      });
    }
  }

  public editUser(user: User): void {
    this.currentUserId = user.id;
    this.userForm.reset();
    this.userForm.controls['user'].setValue(user.name);
  }

  public deleteUser(userId: number, content: TemplateRef<any>): void {
    this.modal.open(content,
      {
        size: 'lg',
        keyboard: false,
        backdrop: 'static'
      }
    ).result
    .then((resolve) => {
      this.userService.deleteUser(userId).then((user) => {
        this.toastr.success(`Usuario eliminado exitosamente`);
        this.getUsers();
      }).catch((reject) => {
        this.toastr.error(`Hubo un error al eliminar el usuario`);
      });
    })
    .catch((reject) => {
    });

  }

  public resetForm(): void {
    this.currentUserId = 0;
    this.userForm.reset();
  }

  public sortUsers(): void {
    this.users.sort((a, b) => {
      return a.id - b.id
    });
  }

}
