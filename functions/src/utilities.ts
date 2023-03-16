import {extensionParameters} from "@/parameters";

export const normalize = (input: string | number | boolean | object): string => {
  if (["number", "string", "bigint"].includes(typeof input)) {
    return "" + input;
  } else if (typeof input == "boolean") {
    return input ? "Yes" : "No";
  } else if (typeof input == "object") {
    return JSON.stringify(input);
  } else {
    throw new Error("Error in reading value of user input. " +
      `type: ${typeof input}, value: ${input}`);
  }
};


export const getAllowedFields = (): string[] => {
  let allowedFields: string[] = [];
  if (extensionParameters.ALLOWED_FIELDS && extensionParameters.ALLOWED_FIELDS !== "*") {
    allowedFields = extensionParameters.ALLOWED_FIELDS.split(",").map((str) => str.trim());
  }
  return allowedFields;
};

