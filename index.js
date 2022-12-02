const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
require('dotenv').config();

//AQUI REALIZO MI CONEXION A MONGO ATLAS Y REQUIERO LOS ESQUEMAS PARA INICIAR CON LA APP
const mongoServer = process.env.DB_CONNECTION;
const client = new MongoClient(mongoServer);
 
 const Mascota = require('./models/mascotaSchema');

 mongoose.connect(mongoServer).then(()=>{
  console.log('EXITO')

    //INSERTO LOS ELEMENTOS A MI DB
   const insertMany = async () => {

    const Salem = new Mascota ({
            nombre: 'Salem',
            edad: 9,
            tipo: 'Gato',
            caracteristicas: 'Muy tranquilo y ama dormir'
    })

    await Salem.save()

    
    const Mateo = new Mascota ({
        nombre: 'Mateo',
        edad: 5,
        tipo: 'Gato',
        caracteristicas: 'Le gusta comer budín'
    })

    await Mateo.save()

    const Chuchi = new Mascota({
            nombre: 'Chuchi',
            edad: 4,
            tipo: 'Gato',
            caracteristicas: 'Es muy peluda y tiene problemas sociales'
        })

    await Chuchi.save()

    const Mia = new Mascota({
        nombre: 'Mia',
        edad: 4,
        tipo: 'Perra',
        caracteristicas: 'No le gustan los extraños'
    })

    await Mia.save()

    const Memi = new Mascota({
        nombre: 'Memi',
        edad: 1,
        tipo: 'Gata',
        caracteristicas: 'Es muy chiquita y le gusta cantar'
    })

    await Memi.save()

    const Keyko = new Mascota({
        nombre: 'Keyko',
        edad: 0.6,
        tipo: 'Perra',
        caracteristicas: 'Le roba la comida a quien pueda'
    })

    await Keyko.save()
};

//insertMany();

    //LOS IMPRIMO A TODOS EN CONSOLA
    const findMascotas = async ()=>{
        const pet = await Mascota.find()
        console.log(pet)
      
      }

      //findMascotas();

       //MODIFICO LA EDAD DE LA MASCOTA LLAMADA KEYKO
      const updateEdad = async()=>{
        const book = await Mascota.updateOne({nombre : "Keyko"},{$set : { edad : 2 } });
        console.log(book);
    
    }

   //updateEdad();

   //ELIMINO A LA MASCOTA LLAMADA MEMI
      const deleteOne = async () => {
        const pet = await Mascota.deleteOne({nombre: "Salem"});
        console.log(pet);
 }
 
  //deleteOne();

   //IMPRIMO EN CONSOLA UNICAMENTE EL NOMBRE DE TODAS LAS MASCOTAS
  const findMascotasName = async ()=>{
    const pet = await Mascota.find({edad: {$gt:0}}, {nombre: 1, _id:0});
    console.log(pet)
 }

   // findMascotasName();

   //AQUI DEBAJO INICIO CON MI APP DE NODE
}).then( ()=>{
const express = require("express");
const app = express();
app.listen(3005);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/mascotas", async (req, res) => {
    const mascotas = await Mascota.find();
    res.json(mascotas);
  });

  
//OBTENGO LOS DATOS INGRESADOS EN MI FORMULARIO HTML Y LOS GUARDO EN MI DB
app.post("/", async (req, res) => {
    const newMascota = new Mascota({
      nombre: req.body.nom,
      edad: req.body.edad,
      tipo: req.body.tipo,
      caracteristicas: req.body.caracteristicas,
    });
    newMascota.save();
    res.redirect("/");
  });

} )