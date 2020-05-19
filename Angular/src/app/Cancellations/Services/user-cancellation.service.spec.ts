import { TestBed } from '@angular/core/testing';

import { UserCancellationService } from './user-cancellation.service';

describe('UserCancellationService', () => {
  let service: UserCancellationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCancellationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
