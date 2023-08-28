/**@type {import("vite").UserConfig} */

const config = {
  esbuild: {
    jsxFactory: '_jsx',
    jsxInject: `import {h as _jsx, css as _css} from 'atomico'`
  },
  build: {
    target: 'esnext'
  },
  test: {
    environment: 'happy-dom'
  }
};

export default config;
