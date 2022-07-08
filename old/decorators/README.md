# Quick TypeScript
Quick Typescript is a simple scaffolding to start coding immediately in TypeScript. You can run it once, in watch mode or compile the whole `src` folder to plain ES5 JavaScript with CommonJS modules.

## Getting started

You need to have Node installed. If not, install it from the [official website](https://nodejs.org/it/download/)

1. Clone the repo
   ```bash
   git clone https://github.com/alaindet/quick-typescript.git
   ```

2. Move into the folder
   ```bash
   cd ./quick-typescript
   ```

3. Install the dependencies
   ```bash
   npm install
   ```

4. Run the script in watch mode (the default)
   ```bash
   npm start
   ```

5. Change `./src/index.ts` from this
   ```ts
   console.log('Quick TypeScript is running...');
   ```
   to this
   ```ts
   console.log('Hello World');
   ```
   save and you'll see "Hello World" in the terminal


### Watch mode

Re-runs every time you save a `.ts` or a `.json` file into `./src/`

```bash
npm run start
npm start # Alias
```


### Run once

```bash
npm run start:once
npm run once # Alias
```


### Build the project

Compiles TypeScript files from `./src/` into `./build/`

```bash
npm run build
```
