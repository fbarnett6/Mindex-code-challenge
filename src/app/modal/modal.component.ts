import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export  class NgbdModalContent {
  @Input() emp;
  constructor(public activeModal: NgbActiveModal){}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class NgbdModalComponent {
  @Input() emp;
  constructor(private modalService: NgbModal) { }

  open(content, employee) {
    console.log(content);
    console.log(employee);
    this.emp = employee;
    this.modalService.open(content);
  }
}