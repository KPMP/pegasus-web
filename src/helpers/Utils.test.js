import { availableDataVisibilityFilter } from "./Utils";
import * as apolloDependency from './ApolloClient';
import * as appDependency from '../App';


// test for availableDataVisibilityFilter
describe("availableDataVisibilityFilter", () => {
	
	
	beforeEach(() => {
		apolloDependency.fetchDataTypesForConcept= jest.fn();
    appDependency.store = {}
	});


  test("should return data data if data hrtCount has a count of at least 1", () => {
    const data = {
      hrtCount: 1,
      ckdCount: 0,
      akiCount: 0,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data ckdCount has a count of at least 1", () => {
    const data = {
      hrtCount: 0,
      ckdCount: 1,
      akiCount: 0,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data akiCount has a count of at least 1", () => {
    const data = {
      hrtCount: 0,
      ckdCount: 0,
      akiCount: 1,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data dmrCount has a count of at least 1", () => {
    const data = {
      hrtCount: 0,
      ckdCount: 0,
      akiCount: 0,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data akiCount and hrtCount has a count of at least 1", () => {
    const data = {
      hrtCount: 1,
      ckdCount: 0,
      akiCount: 1,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data ckdCount and hrtCount has a count of at least 1", () => {
    const data = {
      hrtCount: 1,
      ckdCount: 1,
      akiCount: 0,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return data data if data ckdCount and akiCount has a count of at least 1", () => {
    const data = {
      hrtCount: 0,
      ckdCount: 1,
      akiCount: 1,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(data);
  });
  test("should return undefined data if data has counts of all 0", () => {
    const data = {
      hrtCount: 0,
      ckdCount: 0,
      akiCount: 0,
      dmrCount: 0,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if data is in an incorrect format", () => {
    const data = {
      hrt: 1,
      ckd: 1,
      aki: 1,
      dmr: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if ANY of the data is in an incorrect format", () => {
    const data = {
      hrtCount: 1,
      ckd: 1,
      aki: 1,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if ANY of the data is in an incorrect format", () => {
    const data = {
      hrt: 1,
      ckdCount: 1,
      aki: 1,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if ANY of the data is in an incorrect format", () => {
    const data = {
      hrt: 1,
      ckd: 1,
      akiCount: 1,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if ANY of the data is in an incorrect format", () => {
    const data = {
      hrt: 1,
      ckdCount: 1,
      akiCount: 1,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
  test("should return undefined data if ANY of the data is in an incorrect format", () => {
    const data = {
      hrtCount: 1,
      ckdCount: 1,
      aki: 1,
      dmrCount: 1,
    };
    expect(availableDataVisibilityFilter(data)).toBe(undefined);
  });
});
