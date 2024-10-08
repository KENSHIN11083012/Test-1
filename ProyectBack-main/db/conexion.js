import mongoose from 'mongoose';


const dBURL = 'mongodb://localhost:27017/ContenidoMas18'

const conexion = async () => {
  try {
    const db = await mongoose.connect(dBURL)
    console.log('Conexión exitosa a la base de datos')
    return db
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
    throw error;
  }
};

export { conexion };
  