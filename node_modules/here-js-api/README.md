## Here JavaScript API

This package contains the following files of HERE maps in order to bundle them within your own project.

- https://js.api.here.com/v3/3.1/mapsjs-core.js
- https://js.api.here.com/v3/3.1/mapsjs-service.js
- https://js.api.here.com/v3/3.1/mapsjs-ui.js
- https://js.api.here.com/v3/3.1/mapsjs-mapevents.js
- https://js.api.here.com/v3/3.1/mapsjs-clustering.js
- https://js.api.here.com/v3/3.1/mapsjs-ui.css

## Usage

After installing the package via npm or yarn you can import the different files via

```
import 'here-js-api/scripts/mapsjs-core';
import 'here-js-api/scripts/mapsjs-service';
import 'here-js-api/scripts/mapsjs-ui';
import 'here-js-api/scripts/mapsjs-mapevents';
import 'here-js-api/scripts/mapsjs-clustering';
```

## Repo Maintenance

The API scripts and styles are downloaded automatically via an included Rakefile.

The API version is maintained in the file API_VERSION.

### Setting up the automation

Prerequisites:

- [Ruby](https://www.ruby-lang.org)
- [Bundler](https://bundler.io/)

In the repo root directory:

```
bundle
```

### Enforcing a re-download

```sh
touch API_VERSION
rake download
# add, commit and push as needed
```

### Updating to a bumped up API version

The API version at time of this writing is 3.1.

Let's say the HERE API had jumped to 3.2, and the repo maintainer wants to update the package.

```sh
echo 3.2 > API_VERSION
rake download
# add, commit and push as needed
```

NOTE: The automation assumes that the API CDN URL versioning pattern will remain consistent. Otherwise the Rakefile will have to be revised.
