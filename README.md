# React Cognite Chat App
### Demo Site: https://react-chat-app-79254.web.app/

## Development
```bash
$ yarn
$ yarn start
# Listening at http://localhost:3000 with the default
```

## Production
```bash
$ yarn build
# All files were built in the `build` folder
```

## Run Tests
```bash
$ yarn build
# Run all tests in the `__tests__` folder
```

## Styleguidist
>Styleguidist will help you explore the usage of shared components
```bash
$ yarn run styleguide
# Listening at http://localhost:6060 with the default
```

## Flow Chart
![Flowchart](./images/flowchart.png)

## Data Flow Diagram
![data-flow-diagram](./images/data-flow-diagram.png)

## Set up list

- [x] styling
  - [x] normalize.css
  - [x] styled-components (can easily inject props to modify CSS properties)
- [x] prettier (formatting codes)
- [x] redux (global state managemenet)
  - [x] redux-toolkit (easily writing redux codes without cumbersome boilerplate codes)
- [x] testing
  - [x] react-testing-library (can easily get component node to test)
  - [x] testing-library/jest-dom/extend-expect 
  - [x] jest-styled-components (to have more assertions of styled-components)
- [x] CI
  - [x] Firebase build-deploy yml setting (automatically deploy the app when pushing a new commit)


## Improvements

- Lazy loading messagese in chatrooms
- Add an API middleware layer between database and client-side to make the codebase cleaner
- Add theme changing feature