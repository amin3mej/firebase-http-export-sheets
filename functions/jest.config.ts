import type {JestConfigWithTsJest} from "ts-jest";
import {pathsToModuleNameMapper} from "ts-jest";

import {compilerOptions} from "./tsconfig.aliases.json";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
