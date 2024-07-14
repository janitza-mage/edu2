cd src

chmod -R u+w common
rm -rf common
cp -R ../../common/src/self common
chmod -R a-w common

chmod -R u+w canvas-lib
rm -rf canvas-lib
cp -R ../../canvas-lib/src/self canvas-lib
chmod -R a-w canvas-lib

chmod -R u+w uilib
rm -rf uilib
cp -R ../../uilib/src/self uilib
chmod -R a-w uilib

chmod -R u+w uilib-frontend
rm -rf uilib-frontend
cp -R ../../uilib-frontend/src/self uilib-frontend
chmod -R a-w uilib-frontend
