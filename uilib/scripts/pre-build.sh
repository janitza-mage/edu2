cd src

chmod -R u+w common
rm -rf common
cp -R ../../common/src/self common
chmod -R a-w common
