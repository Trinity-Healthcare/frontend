import { TestBed } from '@angular/core/testing';

import { SubmittedTaskService } from './submitted.task.service';

describe('UsertaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmittedTaskService = TestBed.get(SubmittedTaskService);
    expect(service).toBeTruthy();
  });
});
