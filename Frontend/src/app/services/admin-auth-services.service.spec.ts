import { TestBed } from '@angular/core/testing';

import { AdminAuthServicesService } from './admin-auth-services.service';

describe('AdminAuthServicesService', () => {
  let service: AdminAuthServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
