HTMLInspector.rules.add(
  "bb-inline-css",
  function(listener, reporter, config) {

    // register a handler for the `attribute` event
    listener.on('attribute', function(name, value, element) {

      // return if there's no data prefix
      if (name!=="style") return

      reporter.warn(
            "bb-inline-css",
            "Inline CSS found. Don't use inline css. Put all styling at the widget's CSS file.",
            element
          )
    }
  )
});
HTMLInspector.rules.add(
  "bb-script-tag",
  function(listener, reporter, config) {

    // register a handler for the `attribute` event
    listener.on('element', function(name, value) {

      // return if there's no data prefix
      if ( name === "script" ) {
        reporter.warn(
            "bb-script-tag",
            "Internal JavaScript found. Don't use internal JavaScript. Use external scripts for all the widget's logic.",
            value
            )
        }

        return
      
    }
  )
});
HTMLInspector.rules.add(
  "bb-styles-tag",
  function(listener, reporter, config) {

    // register a handler for the `attribute` event
    listener.on('element', function(name, value) {

      // return if there's no data prefix
      if ( name === "style" ) {
        reporter.warn(
            "bb-styles-tag",
            "internal CSS found. Don't use internal CSS. Put all styling at the widget's CSS file.",
            value
            )
        }

        return
      
    }
  )
});
HTMLInspector.inspect({
  domRoot: "html",
  excludeRules: ["unused-classes", "validate-attributes", "validate-elements"]
})
