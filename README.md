ファイル構成
src/  
  ├App.css  
  ├App.js  
  ├index.css  
  ├index.js  
  ├InputField.js  ────  選択ボタンのコンポーネント。jsonファイルを受けとって自動で追加。ペルソナの文もここで加えている。  
  ├MessageList.js  ────  チャット画面のコンポーネント  
  ├MyComponent.js  ────  GPTと接続するためのファイル。橋渡し的なの。  
  ├main.py  ────  GPTとAzure Ai Searchと接続しているファイル。サーバとして動かしてから使う。バックエンドでプロンプトの追加をしている。ここで追加したプロンプトは画面には表示されない。  
  ├preset_buttons.json  ────  ペルソナの有無、ボタンの名前、質問文を管理しているjsonファイル。ここを弄ることでボタンを減らしたり増やしたりできる。  

nodeが入っていること前提  
npx create-react-app {任意のフォルダ名}  

npm !ERROR no search file or directory User/サインしているアカウント名/AppData/Roming/npm
と出るときはRomingディレクトリ配下にnpmのディレクトリを作成するとうまくいく

git clone https://github.com/kotaro-desu/part-time-job.git  
または、上記の所からzipファイルをダウンロードして解凍

node_modules以外は上記のファイルに置き換える

pythonに使うライブラリのインストール  
#pip install openai  
#pip install fastapi  
#pip install uvicorn  
#pip install requests  
#pip install azure-core  
#pip install azure-search-documents  

サーバの起動（これをしないとGPTにアクセス出来ない）  
#main.pyのあるディレクトリに移動して実行  
#uvicorn main:app --reload  

reactに使うパッケージのインストール  
#npm install ~で実行  
	@chatscope  
	@emotion  
	@mui  
	testing-library  
	axios  
	

#npm start


#ボタンの追加について  
groupは人格（ペルソナ）の有無。0が人格なし、1が人格あり。  
labelはボタンに追加する文章。ギットと書くとギットのボタンが追加される。  
messageは実際にGPTに渡す文章で、ここにちゃんとしたものを書く。「ギットとは何ですか？」と書くと、チャットとGPTに書いたものが表示、送信される。
