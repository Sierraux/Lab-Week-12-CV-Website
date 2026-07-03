const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const cvFilePath = path.join(__dirname, 'data', 'cv.json')

function readCvData() {
  const file = fs.readFileSync(cvFilePath, 'utf-8')
  return JSON.parse(file)
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend CV Express.js berjalan dengan baik',
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server aktif',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/cv', (req, res) => {
  try {
    const cvData = readCvData()
    res.json({
      success: true,
      message: 'Data CV berhasil diambil',
      data: cvData,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal membaca data CV',
      error: error.message,
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  })
})

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`)
  console.log(`Endpoint CV: http://localhost:${PORT}/api/cv`)
})
