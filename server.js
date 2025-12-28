const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE ---
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_kasir", // Sesuai database di phpMyAdmin kamu
});

// Koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database Error:", err.message);
  } else {
    console.log("✅ STATUS: Terhubung ke Database Lokal (db_kasir)");
  }
});

// --- 1. AMBIL SEMUA DATA (GET) ---
app.get("/produk", (req, res) => {
  const sql = "SELECT * FROM produk";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// --- 2. SIMPAN DATA BARU (POST) ---
app.post("/produk", (req, res) => {
  const {
    nama_model,
    merek,
    jenis_bahan,
    ukuran,
    warna,
    tipe_fit,
    harga,
    stok,
  } = req.body;
  const sql =
    "INSERT INTO produk (nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok],
    (err, result) => {
      if (err) {
        console.error("ERROR SQL:", err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "Data berhasil disimpan!", id: result.insertId });
    }
  );
});

// --- 3. UPDATE DATA (PUT) ---
app.put("/produk/:id", (req, res) => {
  const { id } = req.params;
  const {
    nama_model,
    merek,
    jenis_bahan,
    ukuran,
    warna,
    tipe_fit,
    harga,
    stok,
  } = req.body;
  const sql =
    "UPDATE produk SET nama_model=?, merek=?, jenis_bahan=?, ukuran=?, warna=?, tipe_fit=?, harga=?, stok=? WHERE id=?";

  db.query(
    sql,
    [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Data berhasil diperbarui!" });
    }
  );
});

// --- 4. HAPUS DATA (DELETE) ---
app.delete("/produk/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM produk WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Data berhasil dihapus!" });
  });
});

// --- JALANKAN SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend jalan di http://localhost:${PORT}`);
});
