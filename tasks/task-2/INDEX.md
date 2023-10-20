# Task 2

- Improve types.
- Make `UserListComponent` compatible with TypeScript strict mode and Angular strict templates.
- Can we improve performance in this example? If so, refactor `UserListComponent` to make it more performant.


import { Component, Input, Output, EventEmitter } from '@angular/core';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'user-list',
  template: `
    <h1>Users</h1>

    <section>
      <article
        *ngFor="let user of users; let i = index; trackBy: trackByUserId"
        [class.selected]="user.id === selectedUserId"
        (click)="selectUser.emit(user.id)"
      >
        <h3>{{ getFullName(user) }}</h3>
        <p>{{ user.email }}</p>
      </article>

      <p *ngIf="selectedUser">
        Selected User Name:
        {{ getFullName(selectedUser) }}
      </p>
    </section>
  `,
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() selectedUserId: number | null = null;
  @Output() selectUser = new EventEmitter<number>();

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName || ''}`;
  }

  get selectedUser(): User | null {
    return this.users.find((user) => user.id === this.selectedUserId) || null;
  }
}
