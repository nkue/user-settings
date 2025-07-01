# User Setting Page

## Getting started

### Start the dev server

```
npm run dev
```

### Start Storybook

```
npm run storybook
```

## FAQ

### How do I start the msw mock server?

The msw should already be running, no need to start it manually.

### How do I use the components?

The first place to check would be the Storybook instance. In the playground you can see each component with their props.

### I get an error when first starting the dev server and/or storybook

Try removing your node_modules and package-lock.json. Some machines seem to have issues initially.

## General Comments

### Tech Stack

This project uses:

- React
- Typescript
- Vite

Styling is done with CSS utilizing:

- CSS modules