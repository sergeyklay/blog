# Serghei's blog

[![Build Status][:badge-gh:]][:build-gh:]
[![Netlify Status][:badge-netlify:]][:deploy-netlify:]

You're looking at the source code of my brand-spanking new blog.

## How to try it out

### Prerequisites

To play with this blog at your local environment you need the following requirements:

- Ruby >= 2.6.6

First you need to get the project:

```shell
$ git clone git@github.com:sergeyklay/blog.git
$ cd blog
```

After that, we need a few ruby dependencies:

```shell
$ gem install bundler
$ bundle install
```

Then, from the root of the blog just run:

```shell
$ ./serve
```

This will start a server on port 4000.

## Copyright & Licenses

The content of my blog (this project) is licensed under the [CC-BY-4.0][:cc-by-4.0:].
A modified version of [Ed][:gh-ed:] theme is distributed under the [MIT License][:ed-license:].

[:badge-gh:]: https://github.com/sergeyklay/blog/workflows/CI/badge.svg
[:build-gh:]: https://github.com/sergeyklay/blog/actions
[:cc-by-4.0:]: https://creativecommons.org/licenses/by/4.0
[:gh-ed:]: https://github.com/minicomp/ed
[:ed-license:]: https://github.com/minicomp/ed/blob/bedbc4c6870174451368fc51ecccd8bad5a36bdf/LICENSE.md
[:badge-netlify:]: https://api.netlify.com/api/v1/badges/79298078-1216-4189-b97a-31372814fbd5/deploy-status
[:deploy-netlify:]: https://app.netlify.com/sites/serghei/deploys
