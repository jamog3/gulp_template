# 自分用gulpのひな形

以下、メモ。

## gulpをインストール

```
$ npm install -g gulp
```

## npmパッケージをインストール

```
#プロジェクトのディレクトリに移動して
$ npm install
```

## gulp の監視

```
$ npm start
```

## スプライト画像

作成・更新は手動対応のため都度、下記のコマンドを実行

```
$ npm run sprite
```

## アイコンフォント

作成・更新は手動対応のため都度、下記のコマンドを実行

```
$ npm run iconfont
```

## 納品ファイル生成

cssのminifyや、.mapなどを省いたファイルを生成

```
$ npm run build
```

## ディレクトリ構成

srcを編集。

+ jade -> html
+ babel -> webpack -> js
+ sass -> css

```
├── .temp/（ビルド後のソース）
│   ├── javascripts/
│   │    └── libs/ （browserifyしないjsはここに生成）
│   ├── stylesheets / images 等
│   └── index.html
│
├── node_modules/
│   └── パッケージ各種
│
├── build/（納品ファイルがここに生成される）
│
├── src/（ビルド前のソース）
│   ├── _partial/（共通パーツのhtml）
│   ├── fonts/
│   │    ├── _icons/ （アイコンフォント用svg）
│   │    └── _templates/ （アイコンフォント用cssの雛形）
│   ├── images/
│   │    └── sprites/ （スプライト用png）
│   ├── javascripts/
│   │    ├── browserify_libs/ （browserifyするjsをここに格納）
│   │    ├── libs/ （browserifyしないjsをここに格納）
│   │    └── main.js
│   ├── stylesheets/
│   │    ├── _partial/ （共通パーツのcss）
│   │    └── style.scss
│   └── index.ejs など（htmlは拡張子をejsにする）
│
├── .git/
├── .gitignore
├── gulpfile.js
├── package.json
└── README.md
```