import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateJwtService } from './authenticate-jwt.service';

describe('AuthenticateJwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateJwtService]
    });
  });

  it('should be created', inject([AuthenticateJwtService], (service: AuthenticateJwtService) => {
    expect(service).toBeTruthy();
  }));
});
