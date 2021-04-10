# Serghei's blog

You're looking at the source code of my old blog.

**Note:** I no longer maintain this project and keep it public for
educational purposes and for historical reasons. The new blog lives at
https://github.com/sergeyklay/branch

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

[:cc-by-4.0:]: https://creativecommons.org/licenses/by/4.0
[:gh-ed:]: https://github.com/minicomp/ed
[:ed-license:]: https://github.com/minicomp/ed/blob/bedbc4c6870174451368fc51ecccd8bad5a36bdf/LICENSE.md