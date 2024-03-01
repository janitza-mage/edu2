echo -n 'export const gitCommit = "' > src/gitCommit.ts
echo -n `git rev-parse HEAD` >> src/gitCommit.ts
echo '";' >> src/gitCommit.ts

cd src
rm -rf common
cp -R ../../common/src/self common
