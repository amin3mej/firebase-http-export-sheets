describe("Appcheck function", () => {
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
