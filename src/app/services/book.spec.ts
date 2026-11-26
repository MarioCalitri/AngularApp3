import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BookService } from './book.service';

// Unit test suite verifying BookService can be instantiated
describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService, provideHttpClient()]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
