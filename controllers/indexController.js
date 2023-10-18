const {Products} = require('../models/Products')

class IndexController {
    info (req,res) {
        res.status(400).send('Esto es una api')

    }

    async getProducts (req,res) {
        const list = await Products.find();       //no es el find de javascrpt, es uno especial de mongoDb. busca algo
        res.status(200).json(list);

    } 

    async postProduct (req,res) {

        try{
            const newProduct = new Products(req.body);//el canal por donde se pasa la info. la info se incluye si y solo si esta en el formato del esquema. si no, tira error
            await newProduct.save();
            res.status(201).json(newProduct)

        } catch (error){
            res.status(401).json(error)

        }  
        res.status(200).json(req.body) //los objetos que se reciben se envian por body. es un canal de despacho de informacion desde el front o desde la api
    
    }

    put (req,res) {

    }

    patch (req,res) {

    }

    delete (req,res) {

    }
}

module.exports = new IndexController