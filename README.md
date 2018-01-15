# chrome-cloud-build
Build your Chrome projects in the cloud, then run them locally.

```
cd server

# Run the server on 0.0.0.0:8081, serving changes from /home/ec2-user/my-app/build
node run.js -p 8081 -d /home/ec2-user/my-app/build -h 0.0.0.0
```