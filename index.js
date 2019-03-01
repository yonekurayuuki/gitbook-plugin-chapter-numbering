const cheerio = require('cheerio');

module.exports = {
  hooks: {
    'page': function(page) {
      const $ = cheerio.load(page.content);
      const rowspans = [];
      const colspans = [];
      const colspans2 = [];

      $('table').each(function (i, table) {
        var $table = $(table);
        var $prevRow = null;
        $table.children().each(function (a, headBody) {
          var $headBody = $(headBody);
          $headBody.children().each(function (i2, row) {
            var $row = $(row);
            $row.children().each(function (j, col) {
              var $col = $(col);
              var text = $col.text();
              if(!text.length) {
                var $prev = $col.prev();
                if ($prev.length) {
                  colspans2.push([$prev, $col]);
                }
              }
              else if (text.trim() === "^" && $prevRow) {
                var $prev = $($prevRow.children()[j]);
                if ($prev.length) {
                  rowspans.push([$prev, $col]);
                }
              }
              else if (text.trim() === ">") {
                var $next = $col.next();
                if($next.length) {
                  colspans.push([$col, $next]);
                }
              }
            });
            $prevRow = $row;
          });
        });
      });
      for (i = rowspans.length -1; i >= 0; i--){
        _a = rowspans[i], $prev = _a[0], $col = _a[1];
        rowspan = (parseInt($prev.attr("rowspan"), 10) || 1) +
          (parseInt($col.attr("rowspan"), 10) || 1);
        $prev.attr("rowspan", rowspan);
        $col.remove();
      }
      for (i = 0; i < colspans.length; i++) {
        _b = colspans[i], $prev = _b[0], $col = _b[1];
        colspan = (parseInt($prev.attr("colspan"), 10) || 1) +
          (parseInt($col.attr("colspan"), 10) || 1);
        $col.attr("colspan", colspan);
        $prev.remove();
      }
      for (i = colspans2.length - 1; i >= 0; i--) {
        _c = colspans2[i], $prev = _c[0], $col = _c[1];
        colspan = (parseInt($prev.attr("colspan"), 10) || 1) +
          (parseInt($col.attr("colspan"), 10) || 1);
        $prev.attr("colspan", colspan);
        $col.remove();
      }
      page.content = $.html();
      return page;
    }
  }
};
