module.exports = {
    plugins: ["unused-imports"],
    extends: [ "plugin:vue/vue3-recommended"],
    rules: {
        semi: 2,
        "unused-imports/no-unused-imports": 2,
        "unused-imports/no-unused-vars": 2,
        "prefer-const": 1
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    }
};
