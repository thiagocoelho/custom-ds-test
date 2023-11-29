# Norma DS

- [Rollup](https://github.com/rollup/rollup)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/) to help you create and show off your components
- [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library) enabling testing of the components

## Development

### Testing

```
npm run test
```

### Building

```
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```
npm run storybook
```

To export your Storybook as static files:

```
npm run storybook:export
```

### Generating New Components

```
npm run generate YourComponentName
```

This will generate:

```
/src
  components/YourComponentName
    YourComponentName.tsx
    YourComponentName.stories.tsx
    YourComponentName.test.tsx
    YourComponentName.types.ts
    YourComponentName.styles.ts
    index.ts
```

Don't forget to add the component to your `index.ts` exports if you want the library to export the component!

### Installing Component Library Locally

```
npm i --save ../norma-ds
```

which will install the local component library as a dependency in `test-app`. It'll then appear as a dependency in `package.json` like:

```
  ...
  "dependencies": {
    ...
    "norma-ds": "file:../norma-ds",
    ...
  },
  ...
```

Your components can then be imported and used in that project.

**NOTE**: After installing the component library locally, you may run into:

```
Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:

You might have mismatching versions of React and the renderer (such as React DOM)
You might be breaking the Rules of Hooks
You might have more than one copy of React in the same app See for tips about how to debug and fix this problem.
```

This is the most commonly encountered problem people face when installing the library locally. This is most likely due to the third reason: `You might have more than one copy of React in the app`.

Normally when a library is published, dev dependencies are excluded. However, when the library is symlinked, all local dev depdendencies are persisted in the libraries `node_modules` (includes React). Your bundler may see two versions of React, one in the consuming app and one in the symlinked library. The solution is to have the component library use the React version in the consuming app. So from your component library folder, run:

```
npm link ../test-app/node_modules/react
```

**OR**, if you are using Webpack in app you can follow [this GitHub comment](https://github.com/facebook/react/issues/13991#issuecomment-435587809).

Read more about this issue [here](https://reactjs.org/warnings/invalid-hook-call-warning.html).

## Publishing

### Hosting via NPM

First, make sure you have an NPM account and are [logged into NPM using the `npm login` command.](https://docs.npmjs.com/creating-a-new-npm-user-account)

Then update the `name` field in `package.json` to reflect your NPM package name in your private or public NPM registry. Then run:

```
npm publish
```

The `"prepublishOnly": "npm run build"` script in `package.json` will execute before publish occurs, ensuring the `build/` directory and the compiled component library exist.

### Hosting via GitHub

I recommend you host the component library using NPM. However, if you don't want to use NPM, you can use GitHub to host it instead.

You'll need to remove `build/` from `.gitignore`, build the component library (`npm run build`), add, commit and push the contents of `build`. [See this branch for an example.](https://github.com/Olos/norma-ds/tree/host-via-github)

You can then install your library into other projects by running:

```
npm i --save git+https://github.com/Olos/norma-ds.git#branch-name
```

OR

```
npm i --save github:Olos/norma-ds#branch-name
```

## Usage

Let's say you created a public NPM package called `norma-ds` with the `TestComponent` component created in this repository.

### Components

Usage of components (after the library installed as a dependency into another project) will look like:

```TSX
import React from "react";
import { TestComponent } from "norma-ds";

const App = () => (
  <div className="app-container">
    <h1>Hello I'm consuming the component library</h1>
    <TestComponent heading={'Some heading'} content={<div>Some content</div>} />
  </div>
);

export default App;
```

Checkout the [official Rollup plugin list](https://github.com/rollup/plugins) for additional helpful plugins.