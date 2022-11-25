import React from 'react'
import { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function editor() {
    const [ready, setReady] = useState(false);
    const [video, setVideo] = useState();
    const [gif, setGif] = useState();

    const ffmpeg = createFFmpeg({
        log: true,
        corePath: '/FFmpeg/ffmpeg-core.js',
    });
   
    useEffect(() => {
        console.log(gif);
    }, [gif])

    const convertToGif = async () => {
      await ffmpeg.load();
      setReady(true);
      // Write the file to memory 
      ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
      console.log("step1===");
  
      // Run the FFMpeg command
      await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
      console.log("step2===");
  
      // Read the result
      const data = ffmpeg.FS('readFile', 'out.gif');
      console.log("step3===");
  
      // Create a URL
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
      console.log("step4===");
      
      setGif(url)
      console.log(url);
      console.log("step5===");
    }


    return (
        <div>
          { video && <video
            controls
            width="250"
            src={URL.createObjectURL(video)}>
          </video>}
          <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
          <h3>Result</h3>
          <button onClick={convertToGif}>Convert</button>
          { gif && <img src={gif} width="250" />}
        </div>
      )
}

export default editor