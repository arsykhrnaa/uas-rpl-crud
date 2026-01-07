const express = require('express');
const cors = require('cors');
const db = require('./db'); // Mengambil koneksi dari file db.js
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. AMBIL SEMUA DATA (GET) ---
app.get('/produk', (req, res) => {
    const sql = "SELECT * FROM produk_celana ORDER BY id DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// --- 2. SIMPAN DATA BARU (POST) ---
app.post('/produk', (req, res) => {
    const { nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok } = req.body;
    const sql = "INSERT INTO produk_celana (nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: "Data berhasil disimpan!" });
    });
});

// --- 3. UPDATE DATA (PUT) ---
app.put('/produk/:id', (req, res) => {
    const { id } = req.params;
    const { nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok } = req.body;
    
    const sql = "UPDATE produk_celana SET nama_model=?, merek=?, jenis_bahan=?, ukuran=?, warna=?, tipe_fit=?, harga=?, stok=? WHERE id=?";
    
    db.query(sql, [nama_model, merek, jenis_bahan, ukuran, warna, tipe_fit, harga, stok, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: "Data berhasil diperbarui!" });
    });
});

// --- 4. HAPUS DATA (DELETE) ---
app.delete('/produk/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM produk_celana WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data dihapus!" });
    });
});

// --- PERBAIKAN DI SINI (Baris 57-60) ---
const PORT = process.env.PORT || 5000;
// Gunakan 0.0.0.0 agar bisa diakses perangkat lain di jaringan yang sama
app.listen(PORT, '0.0.0.0', () => {
    // Pastikan teks console.log menggunakan tanda backtick (`) atau kutip
    console.log(`🚀 Server Backend Jalan di http://10.126.245.123:${PORT}`);
    console.log(`✅ Database MySQL Terhubung di Port 3306`);
});
