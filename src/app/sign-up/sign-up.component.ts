import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  modalRef: BsModalRef;
  message: any;

  constructor(private authService: AuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  config = {
    class: 'modal-dialog-centered'
  }

  onSignUp(form: NgForm, success: TemplateRef<any>, failure: TemplateRef<any>) {
    let email: any = form.value.email;
    let password: any = form.value.password;
    this.authService.signUpUser(email, password).then(
      (response) => {
        form.resetForm();
        this.modalRef = this.modalService.show(success, this.config);
        console.log(response);
      } 
    ).catch(
      error => {
        this.message = error.message;
        this.modalRef = this.modalService.show(failure, this.config);
        console.log(error) }
    );
  }
}
