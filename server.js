const express = require('express');
const QRCode = require('qrcode');

const app = express();
const PORT = 3000;

// Endpoint to generate QR code
app.get('/server', async (req, res) => {
    try {
        const qrData = "Your QR Code Data Here"; // Replace with your data (e.g., a URL or text)
        const qrCode = await QRCode.toDataURL(qrData); // Generate QR code as a Data URL
        const base64Image = qrCode.split(';base64,').pop(); // Extract base64 image data
        const imgBuffer = Buffer.from(base64Image, 'base64'); // Convert to buffer
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imgBuffer.length,
        });
        res.end(imgBuffer); // Send the image as a response
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating QR code');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});