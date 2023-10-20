# Task 1

- How many times will the API call to fetch jobs be triggered here?
- What are the possible ways to prevent multiple API calls?
- Refactor this example to prevent multiple API calls.


1. The API call will be made two times.

One call will be made here '<ng-container *ngIf="data$ | async as data">' and another one here '<li *ngFor="let Data of data$ | async">'.

2. There are several ways we can prevent multiple API calls. Among them are the following

a. Cache the data with the shareReplay operator. I can use the shareReplay operator to share the observable and prevent multiple API calls. The shareReplay creates a single subscription to the source observable and caches the emitted values. Subscribers after the initial one will receive the cached data without triggering additional API calls. I can also store the last emitted Observables using BehaviorSubject or ReplaySubject.

b. Caching the result in local storage

c. Using async Pipe Once with an outer ng-Container

d. Using State management library can create a central store for the application's state and can manage API calls excently and prevent excess calls. They can also cache APIs.. This could however be an overkill for such a small project.

3. The refactored code is in the index.ts file.