const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko_celana'
});

db.connect(err => {
    if (err) console.error("Database Error:", err.message);
    else console.log("STATUS: Terhubung ke Database Lokal");
});

// API Get Data
app.get('/produk', (req, res) => {
    db.query("SELECT * FROM produk_celana", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// API Tambah Data (Disesuaikan dengan 9 kolom di database Anda)
app.post('/produk', (req, res) => {
    const { nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok } = req.body;
    const sql = "INSERT INTO produk_celana (nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok], (err, result) => {
        if (err) {
            console.error("ERROR SQL:", err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: "Berhasil disimpan!" });
    });
});

// API Update
app.put('/produk/:id', (req, res) => {
    const { id } = req.params;
    const { nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok } = req.body;
    const sql = "UPDATE produk_celana SET nama_model=?, merek=?, jenis_bahan=?, ukuran=?, warna=?, tipe_fit=?, harga=?, stok=? WHERE id=?";
    db.query(sql, [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok, id], (err) => res.json({ message: "Updated" }));
});

// API Hapus
app.delete('/produk/:id', (req, res) => {
    db.query("DELETE FROM produk_celana WHERE id = ?", [req.params.id], () => res.json({ message: "Deleted" }));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend jalan di http://localhost:${PORT}`);
});