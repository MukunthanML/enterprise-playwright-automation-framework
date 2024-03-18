# Playwright Framework

This repository contains a Playwright framework setup for automated testing. The framework is structured as follows:

## Project Folder Structure

Project Folder
├── node_modules <br>
├── playwright-report<br>
└── src<br>
    ├── api<br>
    ├── config<br>
    │   ├── .env<br>
    │   ├── .env.qa<br>
    │   ├── .env.uat<br>
    │   └── auth.json<br>
    ├── fixtures<br>
    │   └── loginFixture.ts<br>
    ├── logging<br>
    │   ├── test_error.log<br>
    │   └── test_run.log<br>
    ├── pages<br>
    │   ├── CasePage.ts<br>
    │   ├── ContactPage.ts<br>
    │   ├── HomePage.ts<br>
    │   └── LoginPage.ts<br>
    ├── testdata<br>
    │   ├── contactCaseFlow.json<br>
    │   ├── contacts.json<br>
    │   ├── data.csv<br>
    │   ├── datademo.json<br>
    │   ├── testData_en.csv<br>
    │   └── testData_en.json<br>
    └── tests<br>
        ├── apiMockTest.spec.ts<br>
        ├── apiTest.spec.ts<br>
        ├── contactTest.spec.ts<br>
        ├── fixtureTest.spec.ts<br>
        ├── loginTest.spec.ts<br>
        ├── oldTest.spec.ts<br>
        ├── SerialTest.spec.ts<br>
        ├── visTest.spec.ts<br>
        └── visTest.spec.ts-snapshots<br>
            └──Screenshot-compare-test-1-Google-Chrme-win32.png<br>
|  .eslintrc.json<br>
│   .gitignore<br>
│   package-lock.json<br>
│   package.json<br>
│   playwright.config.ts<br>
│   requirements.md<br>
│   tsconfig.json<br>
├── .github<br>
│   └── workflows<br>
│       └── main.yml<br>



## Description

- `.eslintrc.json`: ESLint configuration file for linting TypeScript code.
- `.gitignore`: Specifies intentionally untracked files to ignore in Git.
- `package-lock.json` and `package.json`: Node.js package files specifying project dependencies.
- `playwright.config.ts`: Configuration file for Playwright settings.
- `requirements.md`: Document outlining project requirements.
- `tsconfig.json`: TypeScript compiler options file.

### `.github`

- `.github/workflows/main.yml`: GitHub Actions workflow file for continuous integration.

### `node_modules`

- Directory containing Node.js modules installed by npm.

### `playwright-report`

- Directory for storing Playwright test reports.

### `src`

- Source code directory containing project files.

#### `api`

- Directory for API-related scripts.

#### `config`

- Directory containing environment configuration files and authentication data.

#### `fixtures`

- Directory for test fixtures, such as reusable functions for login.

#### `logging`

- Directory for log files generated during test execution.

#### `pages`

- Page object files representing different pages of the application under test.

#### `testdata`

- Directory containing test data files in various formats, such as JSON and CSV.

#### `tests`

- Directory for test scripts written in TypeScript.

#### `utils`

- Directory for utility scripts used in testing, such as encryption and logging utilities.

### `test-results`

- Directory for storing test execution results, including screenshots, trace files, and videos.

## Usage

- Clone the repository and install dependencies using `npm install`.
- Run tests using `npm test`.
- View test reports in the `playwright-report` directory.
- Explore source code files for detailed implementation.

## Contributing

Contributions are welcome! Please follow the established coding style and guidelines. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).