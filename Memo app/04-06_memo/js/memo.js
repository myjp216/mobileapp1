"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {

        //1.localStorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage(); //2.localStorageへの保存
            delLocalStorage();
            allClearLocalStorage(); //A
            selectTable();
        }
    }
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            //- 値の入力チェック
            if (key === "" || value === "") {
                window.alert("Key, Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存しますか？");
                //確認（かくにん）ダイアログで「OK」を押されたとき、保存する
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに " + key + " " + value + " を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};

// 3.localStorageから1件削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectRadioBtn();

            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから\n「" + key + " " + value + "」\nを削除しますか？");
                //確認ダイアログで「OK」を押されたとき、保存する
                if (w_confirm === true) {
                    localStorage.removeItem(key);
                    viewStorage(); //localStorageからのデータの取得とテーブルへ表示
                    let w_msg = "LocalStorageから " + key + " " + value + " を削除(delete)しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
}

// 4. localStoragからすべて削除
function allClearLocalStorage() { // B
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm(
                "LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか?");                                                                   // ★E
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();
                let w_msg = "このページの内容\nLocalStorageのデータをすべて削除(all clear)しました。";
                window.alert(w_msg);
                // 入力欄クリア（仕様に沿って後処理）
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false);
}
function selectTable() {
    const select = document.getElementById("select");
    if (!select) return;
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectRadioBtn();
        }, false
    );
}
//テーブルからデータ選択
function selectRadioBtn() {
    let w_sel = "0";
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");
    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }
    window.alert("1つ選択(select)してください。");
}

//localStorageからのデータの取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows && list.rows[0]) list.deleteRow(0);// HTMLのテーブル初期化
    for (let i = 0; i < localStorage.length; i++) {// localStorage すべての情報の取得
        let w_key = localStorage.key(i);//i番目のキー取得

        //tr 生成
        let tr = document.createElement("tr");

        //td 生成
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        //list に tr を追加
        list.appendChild(tr);

        //tr に td を追加
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //td1 にラジオボタン、td2 にキー
        td1.innerHTML = '<input name="radio1" type="radio">';
        td2.innerHTML = w_key;

        //localStorage の値を取得して td3 に表示
        td3.innerHTML = localStorage.getItem(w_key);
    }

    // jQueryのplugin tablesorterを使ってテーブルのソート
    //  sortList: 引数1…最初からソートしておく列を指定、引数2…0=昇順, 1=降順
    $("#table1").tablesorter({            //tablesort add
        sortList: [[1, 0]]                  //tablesort add
    });                                   //tablesort add

    $("#table1").trigger("update");       //tablesort add

}