cd src

chmod -R u+w common
rm -rf common
cp -R ../../common/src/self common
chmod -R a-w common

chmod -R u+w canvas-lib
rm -rf canvas-lib
cp -R ../../canvas-lib/src/self canvas-lib
chmod -R a-w canvas-lib
