require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static'); 

const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Specify the directory to store uploaded files
const uploadDirectory = path.join(__dirname, 'uploads');
const outputDirectory = path.join(__dirname, 'public');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set up file upload using multer
const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
    },
});
const upload = multer({ storage: storage });


app.use(express.static('public')); // Serve static files from the 'public' folder
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('mp4File'), (req, res) => {
    if (!req.file) {
        return res.status(500).send('No file uploaded.');
    }
    const inputFilePath = path.join(uploadDirectory, req.file.filename);
    const outputFileName = path.basename(inputFilePath, path.extname(inputFilePath)) + '.mp3';
    const outputFilePath = path.join(outputDirectory, outputFileName);
    const purge = () => { // Clean up the temporary files
        try {
            if (fs.existsSync(inputFilePath)) {
                fs.unlinkSync(inputFilePath);
            }
            if (fs.existsSync(outputFilePath)) {
                fs.unlinkSync(outputFilePath);
            }
        } catch (err) {
            console.error("Error deleting files:", err);
        }
    };
    console.log('Converting...', inputFilePath, outputFilePath);
    ffmpeg.setFfmpegPath(ffmpegPath); // Set the FFmpeg path
    ffmpeg()
        .input(inputFilePath)
        .audioCodec('libmp3lame')
        .toFormat('mp3')
        .on('end', () => {
            // Send the converted file as a download response
            res.download(outputFilePath, outputFileName, (err) => {
                purge();
                if (err) {
                    console.error('Download error:', err);
                    return res.status(500).send('Error during download.');
                }
            });
        })
        .on('error', (err) => {
            purge();
            console.error('Conversion error:', err);
            return res.status(500).send('Error during conversion.');
        })
        .save(outputFilePath);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

