const {Products} = require('../models/Products')
const axios = require('axios');

class IndexController {

    info (req,res) {
        res.status(400).send('Esto es una api')

    }

    async getProducts (req,res) {
        const list = await Products.find();       //no es el find de javascrpt, es uno especial de mongoDb. busca algo
        res.status(200).json(list);

    } 

    async postProduct (req,res) {
        const newProduct = new Products(req.body);
       /* const existingProduct = await Products.findOne({nombre:newProduct.nombre});

        if (existingProduct == null){
            await newProduct.save();
            res.status(201).json(newProduct)

        }

        else{
            res.status(401).send('El producto ya existe en la base de datos')       
        }*/

        await newProduct.save();
            res.status(201).json(newProduct)


        }        
      

     async updateProduct (req,res) {    //metodo patch


        const updatingProduct = new Products(req.body);
        const existingProduct = await Products.findOne({nombre:updatingProduct.nombre});

        if (existingProduct == null){
            res.status(401).send('El producto no existe en la base de datos')   
        }

        else {
            await existingProduct.deleteOne();
            await updatingProduct.save();
            res.status(201).json(updatingProduct);
        }

    }

    async updateQuantity (req,res) {    //metodo patch


        const doc = await Products.findOne({nombre: req.body.nombre});
        if (doc == null){
            res.send('error')
        }
        else if (doc.stock === req.body.stock){
            res.send('Error: El stock ingresado coincide con el registrado. Producto sin modificar')
        }
        else{
            const output = await doc.updateOne({stock: req.body.stock});
            
            console.log(output);
            res.send('Producto modificado')

        }



    }

        /*const updatingProduct = new Products(req.body);
        const existingProduct = await Products.findOne({nombre:updatingProduct.nombre});

        if (existingProduct == null){
            res.status(401).send('El producto no existe en la base de datos')   
        }

        else {
            await existingProduct.deleteOne();
            await updatingProduct.save();
            res.status(201).json(updatingProduct);
        }

    }*/

    async removeProduct (req,res){


            const doc = await Products.findOne({nombre: req.body.nombre});
            const output = await doc.updateOne({disponible:false});
            console.log(output);
            res.send('Producto removido')

        }

        /*
        const doc = await Products.findOne({nombre: req.body.nombre});
        doc.updateOne({disponible: false})
        res.status(500).send('Producto removido')

    }*/

    put (req,res) {

    }

    async delete (req,res) {      //metodo delete
        const data = req.body;
        const deletingProduct = Products.findOne({nombre:data.nombre});
        
        if (deletingProduct == null){
            res.status(401).send('Error: El producto no existe en la base de datos')   
        }

        else {
            await deletingProduct.deleteOne();
            res.status(201).send('Producto removido con exito');
        }



    }

    async availableCurrencies (req,res) {


        const options = {
            method: 'GET',
            url: 'https://currency-converter5.p.rapidapi.com/currency/list',
            headers: {
                'X-RapidAPI-Key': 'c3c6fa30e6msh129093a868aed62p18a249jsn30ee0be9ee97',
                'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            res.status(200).json(response.data);
        } catch (error) {
            res.send(error);
        }
    }


    async fromCLPTo (req,res) {

        const data = req.body;      //tiene que tener el nombre del producto y la moneda a la que cambiar (moneda)
        const product = await Products.findOne({nombre:data.nombre})
        

        const options = {
          method: 'GET',
          url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
          params: {
            format: 'json',
            from: 'CLP',
            to: data.moneda ,
            amount: product.precio
          },
          headers: {
            'X-RapidAPI-Key': 'c3c6fa30e6msh129093a868aed62p18a249jsn30ee0be9ee97',
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
          }
        };
        
        try {

            const response = await axios.request(options);
            res.status(200).json(response.data);
        } catch (error) {
            res.send(error);
        }
    }
}

    module.exports = new IndexController