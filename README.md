# signalwerk.documentation.md

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
mkdir ./src/
mkdir ./content/
mkdir ./public/assets/media/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md
git submodule add git@github.com:signalwerk/signalwerk.md.git ./packages/signalwerk.md
npm init -y
npm install ./packages/signalwerk.documentation.md --save
npx sdm copy:package2current
```

### Build everything

```bash
npm run build
```

### Build pages

```bash
npx sdm build:ssr
```

### Start Admin

```bash
npx sdm admin
```

## Admin

```bash
# copy current config to package
npx sdm copy:current2package
```
