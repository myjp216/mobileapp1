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
            allClearLocalStorage();
            selectTable();
        }
    }
);

// 2.localStorageへの保存(ほぞん)
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            // 値の入力チェック
            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: "Key、Memoはいずれも必須です。" //メッセージ内容をここに設定
                    , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , allowOutsideClick: false //枠外クリックは許可しない
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存(save)しますか?";
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認(かくにん)ダイアログで「OK」を押されたとき、保存(ほぞん)する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) 
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg //メッセージ内容をここに設定
                            , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};
// 3.localStorageから選択されている行を削除（さくじょ）  // === version-up3 ===
function delLocalStorage() {
    const del = document.getElementById("del");                            // ボタン取得
    del.addEventListener("click",
        function (e) {
            e.preventDefault();

            const chkbox1 = document.getElementsByName("chkbox1");             // version-up3 add
            const table1 = document.getElementById("table1");                  // version-up3 add
            let w_cnt = 0;                                                      // 選択（せんたく）されているチェックボックスの数
            w_cnt = selectCheckBox("del");  // テーブルからデータ選択（せんたく）  戻り値：件数  引数："del"

            if (w_cnt >= 1) {                                                  // 1つ以上選択時のみ処理
                let w_msg = "LocalStorageから選択されている " + w_cnt + " 件を削除（delete）しますか？";
                Swal.fire({
                    title: "Memo app",                                           // タイトル
                    html: w_msg,                                                // メッセージ
                    type: "question",                                           // question ダイアログ
                    showCancelButton: true,                                      // キャンセルボタンの表示
                    allowOutsideClick: false                                     // 枠外クリック不可
                }).then(function (result) {                                       // 確認（かくにん）でOKが押されたとき
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {                   // 選択されている行を順次削除
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(                                  // 削除key：表のキー列
                                    table1.rows[i + 1].cells[1].firstChild.data
                                );
                            }
                        }
                        viewStorage(); // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
                        let w_msg = "LocalStorageから " + w_cnt + " 件を削除（delete）しました。";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });

                        document.getElementById("textKey").value = "";              // 入力欄クリア
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
    //D: Event Delegation（イベントの委任）
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", function (e) {
        if (e.target && e.target.classList && e.target.classList.contains("trash")) {
            // 行の特定
            const tr = e.target.parentNode.parentNode;
            const idx = tr.rowIndex;
            const key = table1.rows[idx].cells[1].firstChild.data; // キー
            const value = table1.rows[idx].cells[2].firstChild.data; // メモ

            // 確認 → 削除 → 再表示
            const w_delete = "LocalStorageから\n「" + key + " : " + value + "」\nを削除しますか？";
            Swal.fire({
                title: "Memo app",
                html: w_delete,
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();

                    const w_msg = "LocalStorageから「" + key + " : " + value + "」を削除（delete）しました！";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false);
}
// 4.localStorageからすべて削除(さくじょ)
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除(all clear)します。\n よろしいですか?";
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: w_msg //メッセージ内容をここに設定
                , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , showCancelButton: true // キャンセルボタンの表示
            }).then(function (result) {
                if (result.value) {
                    localStorage.clear();
                    viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) 
                    let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
                    // window.alert(w_msg);
                    Swal.fire({
                        title: "Memo app" //タイトルをここに設定
                        , html: w_msg //メッセージ内容をここに設定
                        , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                        , allowOutsideClick: false //枠外クリックは許可しない
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
};
//5. データ選択
function selectTable() {
    const select = document.getElementById("select");
    if (!select) return;
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
}
// テーブルからデータ選択
function selectCheckBox(mode) {
    let w_sel = "0";
    let w_cnt = 0; //選択されているチェックボックスの数 
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""; // work
    let w_textMemo = ""; // work
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) { //最初にチェックされている行をワークに退避
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++; //選択されているチェックボックスの数をカウント
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        }
        else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        }
        else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ以上選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
};
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
        let td4 = document.createElement("td"); //A

        //list に tr を追加
        list.appendChild(tr);

        //tr に td を追加
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4); //B

        //td1 にラジオボタン、td2 にキー
        td1.innerHTML = '<input name="chkbox1" type="checkbox">';
        td2.innerHTML = w_key;

        //localStorage の値を取得して td3 に表示 
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = '<img src="img/trash_icon.png" class="trash">';
    }

    // jQueryのplugin tablesorterを使ってテーブルのソート
    //  sortList: 引数1…最初からソートしておく列を指定、引数2…0=昇順, 1=降順
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");

}