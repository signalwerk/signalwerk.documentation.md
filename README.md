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

# package setup
npm init -y
npm install --workspace ./packages/signalwerk.documentation.md

# npm is currentli not working use yarn!!!
rm -rf ./node_modules/
rm -rf package-lock.json
yarn

# copy package config to current
npx sdm copy:package2current
```

### Add to package.json

```json
  "scripts": {
    "dev": "npm run dev --workspace signalwerk.documentation.md",
    "admin": "npm run admin --workspace signalwerk.documentation.md",
    "build": "npm run build --workspace signalwerk.documentation.md"
  },
```

### Build everything

```bash
npm run build
```

### Start Admin

```bash
npm run admin
```

### Start Preview

```bash
npm run dev
```

## copy current config to package

```bash
npx sdm copy:current2package
```

