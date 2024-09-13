import express from "express";
import { conexion } from "./db/conexion.js";
import routerPeliculas from "./routes/peliculas.routes.js";
const app = express();
const PORT =  process.env.PORT ?? 4321

conexion()
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/peliculas", routerPeliculas )

app.get('/', (req,res)=>{
  res.sendFile(process.cwd() + '/public/index.html')
})
app.get('/ejemplodos', (req,res)=>{
  res.sendFile(process.cwd() + '/eric.html')
})






app.listen(PORT,()=>{
  console.log('escuchando en el puerto 4321');
  
})


