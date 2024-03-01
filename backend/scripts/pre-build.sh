echo -n 'export const gitCommit = "' > src/gitCommit.ts
echo -n `git rev-parse HEAD` >> src/gitCommit.ts
echo '";' >> src/gitCommit.ts

cd src

chmod -R u+w common
rm -rf common
cp -R ../../common/src/self common
chmod -R a-w common
