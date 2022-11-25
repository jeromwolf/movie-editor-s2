import React from 'react'
import { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function editor() {
    const [videoSrc, setVideoSrc] = useState("");
    // upload file functionality

    const [imageFile, setImageFile] = useState({});
    const [sountFile, setSoundFile] = useState({});

    const ffmpeg = createFFmpeg({
        log: true,
        corePath: '/FFmpeg/ffmpeg-core.js',
    });

    const handlechangeImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImageFile(file);
    }

    const handlechangeSound = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setSoundFile(file);
    }

    const createVideo = async () => {

        await ffmpeg.load();

        ffmpeg.FS('writeFile', 'image.png', await fetchFile(imageFile));
        ffmpeg.FS('writeFile', 'sound.mp3', await fetchFile(sountFile));

        await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "10", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4");

        const data = ffmpeg.FS('readFile', 'test.mp4');
        setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    }


    return (
        <div>
            <video src={videoSrc} controls></video><br />
            <input type="file" id="image" accept="image/*" onChange={handlechangeImage} />
            <p></p>
            <input type="file" id="sound" accept="sound/*" onChange={handlechangeSound} />
            <p></p>

            <button onClick={createVideo}>Create a video from the things above!</button>
        </div>
    )
}

export default editor