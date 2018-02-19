import { TestBed, inject } from '@angular/core/testing';

import { LoginHelperService } from './login-helper.service';

describe('LoginHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHelperService]
    });
  });

  it('should be created', inject([LoginHelperService], (service: LoginHelperService) => {
    expect(service).toBeTruthy();
  }));
});
