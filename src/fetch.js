const asyncFetchTrans = async (obj) =>
  fetch("http://3.39.249.42:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => res.json())
    .then((res) => res.data);

export default asyncFetchTrans;
