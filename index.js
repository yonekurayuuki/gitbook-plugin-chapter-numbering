var RESET_TEMPLATE = [
  '<style>',
  'body {',
  '  counter-reset: RESET;',
  '}',
  '</style>'
].join('\n') + '\n';
var bl = false;

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
      var pageLevel = ''
      if(page.hasOwnProperty("level")) {
        if (page.level === '1') bl = true;
        if (bl) pageLevel = page.level;
        else pageLevel = page.level.replace(/^1\./, '');
        var levels = pageLevel.split(".");
        resetString = "";
        for(var i = 1; i < 4; i++) {
          if(i == levels.length)
            resetString += " h" + i + " " + ((levels[i -1]) -1 || 0);
          else
            resetString += " h" + i + " " + ((levels[i -1]) || 0);
        }
      }
      var counterReset = RESET_TEMPLATE.replace(/RESET/, resetString);
      page.content = counterReset + page.content;
      return page;
    }
  }
};
