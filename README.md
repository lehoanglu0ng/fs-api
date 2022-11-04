## Tech stack

- Node.js > v14
- Java JRE v8
- TypeScript
- Supported OS:
  - macOS 10.9 and above
  - Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8
  - Windows 7 and above
- Automation framework: CodeceptJS -> https://codecept.io/basics/
- Allure report

## Installing

```bash
npm ci
npm install -g allure-commandline --save-dev
```

## Execute tests with detailed steps

```bash
npx codeceptjs run --steps
```

## Execute tests parallelly

```bash
npx codeceptjs run-workers [number of expected threads]
```

## View allure report

```bash
allure serve output
```

## Project structure

```
root
│   README.md
│   codecept.conf.ts <------ configuaration of project -> https://codecept.io/configuration/#configuration   
│
└───tests
│   │   *.test.ts <------ test files with suffix `.test.ts`
│   
└───output <------ report files and screenshots
```
