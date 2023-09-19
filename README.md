# StatsPerformTest -- Node.js application, simple MP4-to-MP3 converter

> Please, create a simple MP4-to-MP3 converter, which you upload to GitHub and share the link.
> It can run on the local machine, but if it uses server, it's even better.

## Features

This is a simple web-based MP4 to MP3 converter that allows you to upload MP4 files and convert them to MP3 format.

- Drag and drop support for uploading MP4 files.
- Error handling for invalid file formats and conversion errors.
- Easy-to-use web interface.
- Download the converted MP3 file.

## Technologies Used

- Node.js
- Express.js
- Dotenv to load the environment variables
- Multer for file uploads
- Fluent-ffmpeg for video conversion
- Static ffmpeg binaries for macOS, Linux, Windows

## Localhost usage

1. Clone this repository to your local machine: `git clone https://github.com/ellgree/StatsPerformTest`
2. Navigate to the project directory: `cd StatsPerformTest`
3. Install the required dependencies: `npm install`
4. Edit `.env` to set PORT variable (default: 3000)
5. Start the server: `node app.js`
6. Open your web browser and go to http://localhost:3000 to access the converter.
7. Drag and drop an MP4 file onto the drop zone or click to select a file.
8. Wait for the conversion to finish. The converted MP3 file will be available for download.

## Docker Container Deployment

You can deploy this Node.js application as a Docker container. Follow these steps to get started:
Before deploying the application as a Docker container, make sure you have the following prerequisites installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose (optional): [Install Docker Compose](https://docs.docker.com/compose/install/)
1. Use steps 1..4 from *Localhost* *usage* section
2. Set the PORT variable in `Dockerfile` (default: 3000)
3. Build the Docker image `docker-compose build`
4. Run the Docker container `docker-compose up`

- Docker Hub URL: https://hub.docker.com/r/ellgree/statsperformtest-my-node-app
- Digital Ocean App URL: https://whale-app-mz9qo.ondigitalocean.app/

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
