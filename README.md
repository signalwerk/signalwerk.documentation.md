# signalwerk.documentation.md

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md
git submodule add git@github.com:signalwerk/signalwerk.md.git ./packages/signalwerk.md

# create directory structure
mkdir -p ./src/
mkdir -p ./content/pages/
mkdir -p ./public/assets/media/

# copy package config to current
cp ./packages/signalwerk.documentation.md/template/package.json .

yarn

# copy package config to current
npx sdm copy:package2current
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

