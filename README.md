# signalwerk.documentation.md

A small publishing tool to get quickly and easy from an .md to .html file.

## Installation

```bash
mkdir ./packages/
mkdir ./admin/
mkdir ./public/assets/media/
git submodule add git@github.com:signalwerk/signalwerk.documentation.md.git ./packages/signalwerk.documentation.md
git submodule add git@github.com:signalwerk/signalwerk.md.git ./packages/signalwerk.md
npm init -y
npm install ./packages/signalwerk.documentation.md --save
npx sdm copy:package2current


ln -s ../../public ./packages/signalwerk.documentation.md/public

```


## Admin

```bash
# copy current config to package
npx sdm copy:current2package
```

### Start Admin

```bash
npx sdm admin
```
