const cheerio = require('cheerio');
var h1 = 0;
var h2 = 0;
var h3 = 0;

module.exports = {
  hooks: {
    'page': function(page) {
      const $ = cheerio.load(page.content);
      $("h1, h2, h3").map((_, element) => {
        switch (element.name) {
          case 'h1':
            h1++;
            h2 = 0;
            h3 = 0;
            $(element).prepend('<span class="chapter">' + h1 + '</span>');
            break;
          case 'h2':
            h2++;
            h3 = 0;
            $(element).prepend('<span class="chapter">' + h1 + '.' + h2 + '</span>');
            break;
          case 'h3':
            h3++;
            $(element).prepend('<span class="chapter">' + h1 + '.' + h2 + '.' + h3 + '</span>');
        }
      });
      page.content = $.html();
      return page;
    }
  }
};
