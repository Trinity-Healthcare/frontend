/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { TestBed } from "@angular/core/testing";

import { RoleGuardService } from "./role-guard-service.service";

describe("RoleGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    expect(service).toBeTruthy();
  });
});
