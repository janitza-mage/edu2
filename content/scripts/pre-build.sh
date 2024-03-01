cd src

chmod -R u+w common
rm -rf common
cp -R ../../common/src/self common
chmod -R a-w common

chmod -R u+w uilib
rm -rf uilib
cp -R ../../uilib/src/self uilib
chmod -R a-w uilib
