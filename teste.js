const Jimp = require('jimp')

Jimp.read('image/react.png', (err, image)=> {
    image.resize(100,100).greyscale().blur(1.0).write('react-100x100-distorcida.png')
})