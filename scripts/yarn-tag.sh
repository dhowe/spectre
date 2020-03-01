#/bin/sh

set -e # die on errors 

# increment minor version
yarn version --patch

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

jq --arg a $VERSION '.version = $a' client/package.json > /tmp/tmp && mv /tmp/tmp client/package.json

head -n3 package.json
head -n3 client/package.json
git status 
exit

# add changed files, but not new files
git add -u .

# commit your changes
git commit -m "Release v$VERSION"

# tag the commit
git tag -a v$VERSION -m "Release v$VERSION"

# push to git
git push && git push origin v$VERSION


