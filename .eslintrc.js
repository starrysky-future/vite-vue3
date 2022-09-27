module.exports = {
  // parser 代码解析依赖
  parser: "vue-eslint-parser",
  parserOptions: {
    // 替换原有的代码解析器
    parser: "@typescript-eslint/parser",
    // 声明es版本
    ecmaVersion: 2020,
    // 声明源码的类型
    sourceType: "module",
    // 其他语言扩展，包含jsx，全局严格模式等
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 继承插件的规则配置
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  // 自定义规则配置
  rules: {},
};
