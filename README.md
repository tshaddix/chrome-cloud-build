# chrome-cloud-build

![logo](./extension/icons/icon80.png)

Build your Chrome projects in the cloud, then run them locally.

```
npm install --save-dev chrome-cloud-build-server
```

Then, you can add a command to your package.json:

```
{
  "build-server": "./node_modules/.bin/chrome-cloud-build-server -p 8081 -h 0.0.0.0 -d $(pwd)/build"
}
```

After that, you just need to run that script:

```
npm run build-server
```

Now all changes in that folder will be pushed to any connected extensions.