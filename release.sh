go get github.com/aktau/github-release

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

yarn run rebuild
yarn run package-all

github-release release --tag $PACKAGE_VERSION
github-release upload --tag $PACKAGE_VERSION --file release/abacash-v$PACKAGE_VERSION-darwin-x64 --name abacash-v$PACKAGE_VERSION-darwin-x64
github-release upload --tag $PACKAGE_VERSION --file release/abacash-v$PACKAGE_VERSION-linux-x64 --name abacash-v$PACKAGE_VERSION-linux-x64

zip -r release/abacash-v$PACKAGE_VERSION-darwin-x64 .zip release/darwin-x64
zip -r release/abacash-v$PACKAGE_VERSION-linux-x64 .zip release/linux-x64

github-release upload --tag $PACKAGE_VERSION --file release/abacash-v$PACKAGE_VERSION-linux-x64 --name abacash-v$PACKAGE_VERSION-linux-x64
