import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*.test.ts',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://reqres.in/api'
    },
    JSONResponse: {},
  },
  include: {},
  name: 'reqres-in',
  plugins: {
    allure: {
      "enabled": true
    }
  }
}