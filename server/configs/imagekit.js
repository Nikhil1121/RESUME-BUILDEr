import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    privateKey:  process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:   process.env.IMAGEKIT_PUBLIC_KEY  || 'public_placeholder',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/placeholder',
});

export default imagekit;
