"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {

        //- 1.localStorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage(); //2.localStorageへの保存
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
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに「" + key + " : " + value + "」を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

//localStorageからのデータの取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows && list.rows[0]) list.deleteRow(0);// HTMLのテーブル初期化
    for (let i = 0; i < localStorage.length; i++) {// localStorage すべての情報の取得
        let w_key = localStorage.key(i);// D: i番目のキー取得

        // E: tr 生成
        let tr = document.createElement("tr");

        // F: td 生成
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        // G: list に tr を追加
        list.appendChild(tr);

        // H: tr に td を追加
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // i: td1 にラジオボタン、td2 にキー
        td1.innerHTML = '<input name="radio1" type="radio">';
        td2.innerHTML = w_key;

        // J: localStorage の値を取得して td3 に表示
        td3.innerHTML = localStorage.getItem(w_key);
    }
}
