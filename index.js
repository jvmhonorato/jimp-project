const { asyncMap } = require('@apollo/client/utilities')
const express = require('express')
const app = express()
const Jimp = require('jimp')


const empresas = [
    {id: 1, nome: 'Empresa A', telefone: '1233456789'},
    {id: 2, nome: 'Empresa B', telefone: '1215313539'},
    {id: 3, nome: 'Empresa C', telefone: '4864156789'},
    {id: 4, nome: 'Empresa D', telefone: '1278413589'},
]

const genImage = async(text)=> {
    // create a new with image size
    const image = await new Jimp(200, 40)
    //link the font type to image
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    //print image with text
    image.print(font, 0,0,  text)

    //write the image name and image extension
    //await image.write('teste.png')
    return image
}

//genImage()

//ROUTES
app.set('view engine', 'ejs')

app.get('/', (req,res)=> res.render('index', {empresas}))
app.get('/image/:indice', async(req,res)=> {
  const image = await genImage(empresas[req.params.indice].telefone)


  //buffer must be callback if use await doesn't works
   image.getBuffer(Jimp.MIME_PNG,(err, data)=>{
    res.header('Content-type', 'image/png')
    res.send(data)

  }) 

})


app.listen(3000, ()=> {
    console.log('Server runnig...')
})