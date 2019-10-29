var RESET_TEMPLATE = [
  '<style>',
  'body {',
  '  counter-reset: RESET;',
  '}',
  '</style>'
].join('\n') + '\n';

module.exports = {
  website: {
    assets: './assets',
    css: [
      'numbered-headings-website.css'
    ]
  },
  ebook: {
    assets: './assets',
    css: [
      'numbered-headings.css'
    ]
  },
  hooks: {
    'page:before': function(page) {
      var resetString = "none";
      if(page.hasOwnProperty("level")) {
        var levels = page.level.split(".");
        resetString = "";
        for(var i = 1; i < 4; i++) {
          if(i == levels.length - 1)
            resetString += " h" + i + " " + ((levels[i]) -1 || 0);
          else
            resetString += " h" + i + " " + ((levels[i]) || 0);
        }
      }
      var counterReset = RESET_TEMPLATE.replace(/RESET/, resetString);
      page.content = counterReset + page.content;
      return page;
    }
  }
};
