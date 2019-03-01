# Merge Cells in the Tables for Markdown Syntax
This is a GitBook plug-in for extending markdown table syntax. You can enable it to merge cells in tables with this plug-in. 

## How to install
Add this plug-in to your `book.json` configuration:

```
{
  "plugins": ["table-cell-merge"]
}
```

Install this plug-in using the following code:

```
$ gitbook install
```

## How this plug-in works

* To merge columns:
  Enter `>` or `empty` in the cells.

  ```
  | a | b |
  |---|---|
  | > | 1 |
  | 2 |   |
  ```

* To merge rows:
  Enter `^` in the cells.

  ```
  | a | b |
  |---|---|
  | 1 | 2 |
  | ^ | 4 |
  ```
![sample](img/sample.png)

## How to add this plug-in into package.json

* Run the following command to insert this plug-in into package.json:

  `$ npm install --save gitbook-plugin-table-cell-merge`

## Reference

* This plug-in has been developed in referring to Markdown Enhanced Preview which is used for Atom and Visual Studio Code.
* This plug-in uses the `Cheerio` npm package to parse HTML as dependencies. run the following command to install `Cheerio` to your environment.
    ```
    $ npm install --save Cheerio
    ```
