import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsersList', () => {
    it('should return a list of users', () => {
      service.getUsersList().subscribe(res => {
        expect(res.results.length === res.totalCount);
      })
    })
  });
  
  describe('getUserById', () => {
    it('should return the user roberthelmick', () => {
      service.getUserById('60cb81711a93b031d6b4d16b').subscribe(res => {
        expect(res.username === 'roberthelmick');
      })
    })
  });
});
