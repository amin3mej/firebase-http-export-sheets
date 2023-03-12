import * as parameters from "@/parameters";
import {getAllowedFields, normalize} from "@/utilities";
describe("Normalize function", () => {
  test("it should normalize different type of data", () => {
    const objectToTest = {testKey: "testValue"};
    expect(normalize("1234")).toBe("1234");
    expect(normalize("something long and not short")).toBe("something long and not short");
    expect(normalize(1234)).toBe("1234");
    expect(normalize(true)).toBe("Yes");
    expect(normalize([1, 2, 3])).toBe("[1,2,3]");
    expect(normalize(objectToTest)).toBe(JSON.stringify(objectToTest));
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(() => normalize(function() {})).toThrowError();
  });
});

jest.mock("@/parameters", () => ({
  __esModule: true,
  extensionParameters: {ALLOWED_FIELDS: null},
}));

describe("GetAllowedFunctions", () => {
  it("it should return empty array when configured with *", () => {
    parameters.extensionParameters.ALLOWED_FIELDS = "*";
    expect(getAllowedFields().length).toBe(0);
  });
  it("it should return fields names array when configured", () => {
    parameters.extensionParameters.ALLOWED_FIELDS = "a, b,   c, d";
    expect(getAllowedFields()).toEqual(["a", "b", "c", "d"]);
  });
});
