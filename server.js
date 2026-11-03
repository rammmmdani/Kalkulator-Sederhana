const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = url.parse(req.url, true).query;

  if (req.url.startsWith("/kalkulator")) {
    const angka1 = Number(query.angka1);
    const angka2 = Number(query.angka2);
    const operator = query.operator;

    let hasil;

    switch (operator) {
      case "tambah":
        hasil = angka1 + angka2;
        break;

      case "kurang":
        hasil = angka1 - angka2;
        break;

      case "kali":
        hasil = angka1 * angka2;
        break;

      case "bagi":
        if (angka2 === 0) {
          res.writeHead(400);
          return res.end(
            JSON.stringify({
              pesan: "Tidak bisa membagi dengan nol",
            }),
          );
        }

        hasil = angka1 / angka2;
        break;

      default:
        res.writeHead(400);
        return res.end(
          JSON.stringify({
            pesan: "Operator tidak dikenal",
          }),
        );
    }

    res.writeHead(200);

    res.end(
      JSON.stringify({
        status: "Berhasil",
        angka1: angka1,
        angka2: angka2,
        operator: operator,
        hasil: hasil,
      }),
    );
  } else {
    res.writeHead(404);

    res.end(
      JSON.stringify({
        pesan: "Halaman tidak ditemukan",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("Kalkulator berjalan di http://localhost:3000");
});
