# Example Todo Widget (jQuery)

Todo Widget Example (and future boilerplate) compatible with BLOC (Styleguide), Widget Engine and CXP.

**Currently is aligned only with [this](https://stash.backbase.com/projects/ESMZ/repos/example-dependencies-management-lp12/browse) LP 0.12 modified project. Which soon will be synced with original archetype.**

## Run In Styleguide (BLOC)

1. Get and set-up [this custom LP 0.12 project](https://stash.backbase.com/projects/ESMZ/repos/example-dependencies-management-lp12/browse) (later will be compatible with plain archetype).
2. In new LP 0.12 project root run `bower install ssh://git@stash.backbase.com:7999/esmz/example-widget-todo-jquery.git` (you'll need to have [Bower](http://bower.io/) installed globally).
3. Prepare Styleguide in [LP 0.12 project](https://stash.backbase.com/projects/ESMZ/repos/example-dependencies-management-lp12/browse) following it's README.
4. Run `bower install` in `<lp2-project>/statics/public/static/components/example-widget-todo-jquery` to get dev dependencies.
5. Run style guide `cd styleguide && sh run.sh` and open [127.0.0.1:8080/bundles/project/components/todo-widget](http://127.0.0.1:8080/bundles/project/components/todo-widget/).

## Run In Portal

Just add it to portal catalog to use in CXP (we recommend using [bb-cli](https://www.npmjs.com/package/bb-cli) with `bb sync` for that).

## TODO

* Add `bb install` workflow, with auto require-conf.js configuration
* Test this boilerplate with other widgets