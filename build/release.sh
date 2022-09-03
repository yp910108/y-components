#!/usr/bin/env sh
set -e

VERSION=`npx select-version-cli`

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION npm run lib

  # commit
  git add .
  git commit -m "build: v$VERSION"
  npm version $VERSION --message "release: v$VERSION"

  # push
  git push -u origin master

  # publish
  npm publish --access=public
fi
