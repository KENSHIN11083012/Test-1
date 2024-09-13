import Pija from '../models/model.js'


export async function  agregar(req, res) {
    try {
        const { titulo, urlImagen, url} = req.body

        if(!titulo || !urlImagen || !url){
            return res.status(400).json({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }

        const existingMovie = await Pija.findOne({titulo: titulo})
        console.log(existingMovie);

        if(existingMovie){
            return res.status(409).json({
                status: 'error',
                message: 'La movie ya existe.'
            })
        }
        
        const movieToSave = new Pija({
            titulo: titulo,
            urlImagen: urlImagen,
            url: url
        })

        const movieSaved = await movieToSave.save()

        if(!movieSaved){
            return res.status(400).json({
                status: 'error',
                message: 'Ocurrio un error'
            })
        }

        return res.status(201).json({
            status: 'success',
            message: 'Pelicula agregada correctamente'
        })
    } catch (error) {
        console.log(error);
        
    }
}


export  async function leerPeliculas(req, res) {
    try {
    } catch (err) {
      respuestas.error(req, res, err , 500);
    }
  }


  export async function allMovies(req,res){
    try {
      
      const peliculas = await Pija.find()
    
      res.status(200).json({
        status: 'success',
        peliculas: peliculas
      })
    } catch (error) {
      console.log(error);
      
    }
  }