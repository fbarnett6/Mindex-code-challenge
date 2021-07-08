import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    emp;
    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string, emp) {
        // open modal specified by id
        const modal = this.modals.find(x => x.id === id);
        // this.emp = {id: emp.id, firstName: emp.firstName, lastName: emp.lastName, position: emp.positon};
        modal.open(id, emp);
    }

    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close(id);
    }
}