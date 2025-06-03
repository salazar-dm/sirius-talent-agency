import {useEffect, useState} from 'react';
import { Area } from 'react-easy-crop';

export const useImageHandler = (defaultAspectRatio: number = 3/4) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [showCrop, setShowCrop] = useState<boolean>(false);
    const [croppedArea, setCroppedArea] = useState<Area | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio);
    const [imageSelected, setImageSelected] = useState<boolean>(false);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result as string);
                setShowCrop(true);
            };
        }
    };

    const onCropComplete = (croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onCropDone = async (profileName: string) => {
        if (!croppedArea || !imageFile) return;

        setShowCrop(false);

        const canvas = document.createElement('canvas');
        const image = new Image();
        image.src = URL.createObjectURL(imageFile);

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const width = image.width;
        const height = image.height;
        const cropWidth = (croppedArea.width / 100) * width;
        const cropHeight = (croppedArea.height / 100) * height;
        const cropX = (croppedArea.x / 100) * width;
        const cropY = (croppedArea.y / 100) * height;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: mimeString });
        const croppedFile = new File([blob], `${profileName}-cropped.jpg`, { type: 'image/jpeg' });

        setCroppedImageFile(croppedFile);
        setCroppedImage(dataUrl);
        setImageSelected(true);
    };

    return {
        imageFile,
        croppedImageFile,
        imageUrl,
        croppedImage,
        showCrop,
        crop,
        zoom,
        aspectRatio,
        setAspectRatio,
        onFileChange,
        setCrop,
        setZoom,
        croppedArea,
        onCropComplete,
        onCropDone,
        imageSelected,
    };
};
