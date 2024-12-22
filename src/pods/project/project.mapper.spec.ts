import * as apiModel from '../../../../master-frontend-lemoncode/05-testing/00-boilerplate/src/pods/project/api/project.api-model';
import * as viewModel from '../../../../master-frontend-lemoncode/05-testing/00-boilerplate/src/pods/project/project.vm';
import * as mapper from '../../../../master-frontend-lemoncode/05-testing/00-boilerplate/src/pods/project/project.mapper';
import * as projectVm from '../../../../master-frontend-lemoncode/05-testing/00-boilerplate/src/pods/project/project.vm';

describe('mapEmployeeSummaryFromApiToVm', () => {
  let input: apiModel.EmployeeSummary;
  let result: viewModel.EmployeeSummary;
  beforeEach(() => {
    input = {
      id: '1',
      employeeName: 'John Doe',
      isAssigned: true,
    };

    result = {
      id: '1',
      employeeName: 'John Doe',
      isAssigned: true,
    };
  });

  it('should map EmployeeSummary API object to EmployeeSummary view model', () => {
    const testResult = mapper.mapEmployeeSummaryFromApiToVm(input);
    expect(result).toEqual(testResult);
  });

  it('should map EmployeeSummary API object to EmployeeSummary view model, undefined value', () => {
    input = undefined;
    result = undefined;
    const testResult = mapper.mapEmployeeSummaryFromApiToVm(input);
    expect(testResult).toEqual({ undefined });
  });
});

describe('mapEmployeeSummaryListFromApiToVm', () => {
  let input: apiModel.EmployeeSummary[];
  let result: viewModel.EmployeeSummary[];
  beforeEach(() => {
    input = [
      {
        id: '1',
        employeeName: 'John Doe',
        isAssigned: true,
      },
    ];

    result = [
      {
        id: '1',
        employeeName: 'John Doe',
        isAssigned: true,
      },
    ];
  });

  it('should map each EmployeeSummary object to EmployeeSummary view model', () => {
    const testResult = mapper.mapEmployeeSummaryListFromApiToVm(input);
    expect(result).toEqual(testResult);
  });

  it('should map each EmployeeSummary object to EmployeeSummary view model, empty array', () => {
    input = [];
    result = [];
    const testResult = mapper.mapEmployeeSummaryListFromApiToVm(input);
    expect(result).toEqual(testResult);
  });
});

describe('mapProjectFromApiToVm', () => {
  let input: apiModel.Project
  let result: viewModel.Project;
  beforeEach(() => {
    input = {
      id: '1',
      name: 'John Doe',
      isActive: true,
      employees: [
        {
          id: '1',
          employeeName: 'John Doe',
          isAssigned: true,
        },
      ],
    };
  });

  result = {
    id: '1',
    name: 'John Doe',
    isActive: true,
    employees: [
      {
        id: '1',
        employeeName: 'John Doe',
        isAssigned: true,
      },
    ],
  };

  it('should map Project API object to Project view model', () => {
    const testResult = mapper.mapProjectFromApiToVm(input);
    expect(result).toEqual(testResult);
  });

  it('should map Project API object to Project view model, undefined value', () => {
    input = null;
    result = null;
    const spy =vi.spyOn(mapper, 'mapProjectFromApiToVm');
    const testResult = mapper.mapProjectFromApiToVm(input);
    expect(testResult).toEqual(projectVm.createEmptyProject());
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
