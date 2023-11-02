const {Products} = require('../models/Products')
const axios = require('axios');

class IndexController {

    info (req,res) {
        res.status(200).json({
            "/listadeproductos" :"GET: Muestra la lista de los productos disponibles de la base de datos",
            "/listacompletadeproductos": "GET: Muestra la lista completa de productos",
            "/agregarproducto":"POST: Ruta para agregar un nuevo producto a la base de datos",
            "/editarproducto":"PATCH: Ruta para modificar un valor de un producto existente. Requiere subir toda la información, aunque ésta se repita",
            "/editarstock":"PATCH: Ruta para modificar sólo el stock de un producto. Sólo requiere el nombre y el nuevo stock",
            "/removerproducto":"DELETE: Ruta para remover un producto. Realiza un borrado lógico. No quita el producto de la base de datos",
            "/borrarproducto":"DELETE: Realiza un borrado físico del producto indicado en la base de datos",
            "/reactivarproducto":"PATCH: Permite reactivar un producto que haya sido removido (borrado lógico). Sólo requiere el nombre del producto",
            "/monedasdisponibles": "GET: Muestra una lista de monedas disponibles a los que transformar los precios de los productos. En la BD, sus precios se encuentran indicados en peso chileno (CLP)",
            "/cambiarmoneda":"GET: entrega el precio de un producto en la moneda indicada. Requiere el nombre del producto y la moneda a cambiar"
        })

    }

    async getProducts (req,res) {
        const list = await Products.find({disponible:true});       
        res.status(200).json(list);
    } 

    async getAllProducts (req,res) {
        const list = await Products.find();       
        res.status(200).json(list);
    } 

    async postProduct (req,res) {
        const newProduct = new Products(req.body);   

        await newProduct.save();
            res.status(201).json(newProduct)
        }        
      

     async updateProduct (req,res) {    //metodo patch

        const updatingProduct = new Products(req.body);
        const existingProduct = await Products.findOne({nombre:updatingProduct.nombre});

        await existingProduct.deleteOne();
        await updatingProduct.save();
        res.status(202).json(updatingProduct);
        

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
            res.status(202).send('Producto modificado')

        }
    }

    async removeProduct (req,res){

        const doc = await Products.findOne({nombre: req.body.nombre});
        const output = await doc.updateOne({disponible:false});
        console.log(output);
        res.status(202).send('Producto removido')
    }

    async reactivateProduct (req,res){

        const doc = await Products.findOne({nombre: req.body.nombre});
        const output = await doc.updateOne({disponible:true});
        console.log(output);
        res.status(202).send('Producto disponibilizado')
    }    

    

    async delete (req,res) {      //metodo delete
        const data = req.body;
        const deletingProduct = Products.findOne({nombre:data.nombre});
        
        if (deletingProduct == null){
            res.status(404).send('Error: El producto no existe en la base de datos')   
        }

        else {
            await deletingProduct.deleteOne();
            res.status(202).send('Producto removido con exito');
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