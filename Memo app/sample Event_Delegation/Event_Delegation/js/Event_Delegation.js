"use strict";
let i = 0; //table1 counter
let j = 0; //table2 counter

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function() {
    // テストのため、最初に５行追加する。
    const list1 = document.getElementById("list1");
    while(list1.rows[0]) list1.deleteRow(0); //list1 initialize
    for(i = 0; i < 5; i++){
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      list1.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      td1.innerHTML = i + 1;
      td2.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }
    add1_row(); // 行追加
    del1_row(); // 行削除


    const list2 = document.getElementById("list2");
    while(list2.rows[0]) list2.deleteRow(0); //list1 initialize
    for(j = 100; j < 105; j++){
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      list2.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      td1.innerHTML = j + 1;
      td2.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }
    add2_row(); // 行追加
    del2_row(); // 行削除


  }, false
);

// table1 ///////////////////////////////////////////////////////////////////////////////////
// 【ＮＧ】動的に増減する要素に対応できていない（getElementsByClassName と forEach等を使用)
// 行追加
function add1_row() {
  const add1 = document.getElementById("add1");
  add1.addEventListener("click",(e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
    e.preventDefault();
    const list1 = document.getElementById("list1");
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    list1.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.innerHTML = i + 1;
    td2.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    i++
  });
}

function del1_row() {
  const table1 = document.getElementById("table1");
  const trashes = table1.getElementsByClassName("trash");
  const trashesArray = Array.from(trashes);
  trashesArray.forEach(function (trash_icon) {
    trash_icon.addEventListener('click', (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
      let tr = e.target.parentNode.parentNode;
      tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
    });
  });
}

// table2 ///////////////////////////////////////////////////////////////////////////////////
// 【ＯＫパターン】 親要素に設定したイベントリスナーで、子要素で発生したイベントを処理する
function add2_row() {
  const add2 = document.getElementById("add2");
  add2.addEventListener("click",(e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
      e.preventDefault();
      const list2 = document.getElementById("list2");
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      list2.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      td1.innerHTML = j + 1;
      td2.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
      j++
    }
  );
}

function del2_row() {
  const table2 = document.getElementById("table2");
  table2.addEventListener("click", (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
      if(e.target.classList.contains("trash") === true){
          let tr = e.target.parentNode.parentNode;
          tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
      }
  });
}