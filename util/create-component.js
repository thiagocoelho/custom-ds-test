require("colors");
const fs = require("fs");
const templates = require("./templates");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please supply a valid component name".red);
  process.exit(1);
}

console.log("Creating Component Templates with name: " + componentName);

const componentDirectory = `./src/components/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`.red);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map((template) => template(componentName));

generatedTemplates.forEach((template) => {
  const file = template.isDefault ? `${componentDirectory}/index${template.extension}` : `${componentDirectory}/${componentName}${template.extension}`;

  fs.writeFileSync(
    file,
    template.content
  );
});

console.log(
  "Successfully created component under: " + componentDirectory.green
);
