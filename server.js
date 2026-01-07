const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();

// Middleware
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

// --- JALANKAN SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // Menggunakan tanda kutip biasa agar tidak ada error karakter di terminal
    console.log("Server Backend Jalan di http://localhost:" + PORT);
});
