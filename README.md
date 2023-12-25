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
npm install --workspace ./packages/signalwerk.documentation.md

# npm is currentli not working use yarn!!!
rm -rf ./node_modules/
rm -rf package-lock.json
yarn

npx sdm copy:package2current
```

### Build everything

```bash
npx sdm build
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

## Start Git-Server

```bash
# copy current config to package
npx sdm start:git
```
