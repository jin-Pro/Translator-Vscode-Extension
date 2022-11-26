import debounce from "./debounce.js";
import asyncFetchTrans from "./fetch.js";

const $selectTo = document.querySelector("#to");
const $selectFrom = document.querySelector("#from");
const $transArea = document.querySelector("#transArea");
const $textArea = document.querySelector("textarea");
const $delete = document.querySelector("#delete");
const $change = document.querySelector("#change");

const resize = () => {
  $textArea.style.height = "auto";
  const height = $textArea.scrollHeight; // 높이
  $textArea.style.height = `${height + 8}px`;
  $transArea.style.height = `${height + 8}px`;
};

const deleteData = () => {
  $textArea.value = "";
  $transArea.innerHTML = "";
  resize();
};

const getValue = () => {
  const source = $selectTo.value;
  const target = $selectFrom.value;
  const text = $textArea.value;
  return { source, target, text };
};

const apply = debounce((data) => {
  asyncFetchTrans(data).then((res) => ($transArea.innerHTML = res));
}, 500);

const trans = () => {
  const data = getValue();
  apply(data);
};

const exchange = () => {
  const value = $transArea.innerHTML;
  const to = $selectTo.value;
  const from = $selectFrom.value;
  $selectTo.value = from;
  $selectFrom.value = to;
  $textArea.value = value;
  trans();
};

$delete.onclick = deleteData;
$textArea.onkeydown = resize;
$textArea.onkeyup = trans;
$selectTo.onchange = trans;
$selectFrom.onchange = trans;
$change.onclick = exchange;
