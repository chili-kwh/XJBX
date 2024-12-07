const swcJsOptions = {
  jsc: {
    parser: {
      syntax: 'ecmascript', // 解析语法
      jsx: true, // 支持 JSX
      dynamicImport: true,
      decorators: true,
    },
    target: 'es6',
    transform: {
      react: {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        useBuiltins: true,
        // runtime: 'automatic', // React 17+ 的自动 JSX 运行时
      },
    },
  },
  // minify: false,
};

module.exports = swcJsOptions;
