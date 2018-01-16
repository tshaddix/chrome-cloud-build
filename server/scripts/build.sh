#!/usr/bin/env bash

# Generate js files
./node_modules/.bin/tsc -p tsconfig.json

# Add hash bang to top of main file
echo -e "#!/usr/bin/env node\n$(cat lib/server.js)" > lib/server.js

chmod u=rwx lib/server.js