
# Populix API Testing

API Testing repo for Populix Backend. Built using [supertest](https://www.npmjs.com/package/supertest) for the HTTP testing, [mocha](https://www.npmjs.com/package/mocha) as its test framework, [chai](https://www.npmjs.com/package/chai) for the assertion and [mochawesome](https://www.npmjs.com/package/mochawesome) for the awesome reporting.


## Directory Structure

```txt
.
|-- data
|  |-- global.js
|  |-- <hardcoded-data-json-1>
|  |-- <hardcoded-data-json-2>
|-- helpers
|  |-- <helper-file-js>
|-- test
|  |-- [module-folder]
|  |  |-- <test-file-js>
|  |  |-- index.js
|  |-- index.js
|-- .env
```

## Getting Started

#### Install Dependencies

```bash
  npm install
```

#### Set up `.env` file

1. `cp .env.example .env`
2. Fill up the environment variables

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To generate html report

```bash
  npm run test:report
```

## Contributing

#### Test Order
Sometimes we have a test case that require certain operation to be done first. In order to do that, you need to make sure:
1. Your test is in correct folder`test/[module-folder]`
2. Inside `test/[module-folder]`, you'll find an `index.js` file that contains all the test for that module.
3. Make sure your `testfile.js` is in correct order inside `[module-folder]/index.js`
4. You also need to make sure that every `test/[module-folder]` is in correct order inside `test/index.js`

