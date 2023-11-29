module.exports = (componentName) => ({
  content: `
export { default } from "./${componentName}";
`,
  extension: `.ts`,
  isDefault: true
});
