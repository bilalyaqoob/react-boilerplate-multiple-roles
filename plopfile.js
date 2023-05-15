module.exports = function (plop) {
  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your page?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/App/pages/{{pascalCase name}}/{{pascalCase name}}Page.jsx",
        templateFile: "plop-templates/Page/Page.jsx.hbs",
      },
      {
        type: "add",
        path: "src/App/pages/{{pascalCase name}}/{{camelCase name}}Components/FirstComponent.jsx",
        templateFile: "plop-templates/Page/FirstComponent.jsx.hbs",
      },
    ],
  });
};
