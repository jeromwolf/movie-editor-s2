import React from 'react'
import Avata from 'react-avatar-edit';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';

function UploadAvatar() {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const onClose = () => {
        setPreview(null);
    }
    const onCrop = view => {
        setPreview(view);
    }
    return (
        <div>
            <Avatar
                width={400}
                height={300}
                src={"https://www.shutterstock.com/image-photo/head-shot-portrait-smart-confident-260nw-1721092123.jpg"}
            />

        </div>
    )
}

export default UploadAvatar