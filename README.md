# Cricket website template

This is an example of a website that uses the [Cricket HCMS](https://github.com/gskorupa/cricket-hcms.git). The website was built using the Svelte framework and is hosted on a Node.js server. The website code is intentionally simple to focus on the integration with the Cricket HCMS service.
The site is set up as part of a demo for the Cricket HCMS project.

## Creating a project

Clone the template from GitHub:

```bash
git clone "https://github.com/gskorupa/cricket-website-template.git" my-website
```

Install the dependencies:
```bash
cd my-website
npm install
npm install --save-dev @sveltejs/adapter-node
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

Building Docker Image
```bash
docker build --rm -f "Dockerfile" -t gskorupa/signomix-docs-website:latest "."
docker push gskorupa/signomix-docs-website:latest "."
```
```

Running Docker Image
```bash
docker run -p 8080:3000 mywebsite:latest

```
