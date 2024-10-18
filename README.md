# Astro RD3 Sketchbook

## Overview

Astro RD3 Sketchbook is an interactive sketchbook built with [Astro](https://astro.build/), leveraging the power of [p5.js](https://p5js.org/), [D3.js](https://d3js.org/), and [Three.js](https://threejs.org/) to create dynamic and engaging visualizations. This project serves as a playground for experimenting with various JavaScript libraries and TypeScript in a web environment.

## Project Structure

``` powershell
astro-rd3-sketchbook/
├── README.md
├── content/
│   ├── 240818-p5js-d3-three-ts-test/
│   │   ├── p5jtest.ts
│   │   └── p5jtest.js
│   └── 240813-p5.js-test/
│       └── sketch_p5.js
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

## Features

1. **p5.js Integration**: Utilizes p5.js for creative coding and interactive graphics.
2. **D3.js Support**: Incorporates D3.js for data visualization capabilities.
3. **Three.js Integration**: Includes Three.js for 3D graphics and animations.
4. **TypeScript Support**: Offers TypeScript files for type-safe development.

## Key Components

### p5.js Test

Located in `content/240818-p5js-d3-three-ts-test/p5jtest.ts` and `p5jtest.js`, these files demonstrate the integration of p5.js within the Astro framework. They create a new p5 instance and link it to a specific HTML element with the ID `p5jtest`.

```typescript
let p5test = new p5(p5jtest, document.getElementById('p5jtest'));
```

### p5.js Sketch

Found in `content/240813-p5.js-test/sketch_p5.js`, this file contains a p5.js sketch that creates an interactive circle following the mouse cursor. Key features include:

- **Canvas Creation**: Initializes a 400x400 pixel canvas.
- **Background Color**: Sets the background color of the canvas.
- **Interactive Ellipse**: Draws an ellipse that follows the mouse position.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/astro-rd3-sketchbook.git
```

### Navigate to the Project Directory

```bash
cd astro-rd3-sketchbook
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open your browser and visit [http://localhost:4321](http://localhost:4321) to view the project.

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the built project locally.
- **`npm run astro`**: Runs Astro CLI commands.

## Customization

To add new sketches or visualizations:

1. **Create a New Directory**: Add a new directory under the `content/` folder.
2. **Add Your Scripts**: Include your p5.js, D3.js, or Three.js scripts in this new directory.
3. **Update the Main Page**: Modify the `src/pages/index.astro` file to include your new components.

## Dependencies

- [Astro](https://astro.build/)
- [p5.js](https://p5js.org/)
- [D3.js](https://d3js.org/)
- [Three.js](https://threejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/your-username/astro-rd3-sketchbook/pulls).

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please open an [issue](https://github.com/your-username/astro-rd3-sketchbook/issues) in the GitHub repository.

---

Happy coding and sketching with Astro RD3 Sketchbook!

## Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
