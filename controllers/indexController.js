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
        const newProduct = new Products(req.body);
        const existingProduct = await Products.findOne({nombre:newProduct.nombre});

        if (existingProduct == null){
            await newProduct.save();
            res.status(201).json(newProduct)

        }

        else{
            res.status(401).send('El producto ya existe en la base de datos')       
        }

        }        
      

     async updateProduct (req,res) {    //metodo patch

        /*const modificar = async()=> {
            const doc = await Products.findOne({nombre:req.body.nombre});
            const output = await doc.updateOne({req.body});
            console.log(output);
            res.json(doc)};

        modificar();
        }*/

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

        const modificar = async()=> {
            const doc = await Products.findOne({nombre:req.body.nombre});
            const output = await doc.updateOne({stock: req.body.stock});
            console.log(output);
            res.send('Producto modificado')}

        modificar();
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

        const remove = async() => {
            const doc = await Products.findOne({nombre: req.body.nombre});
            const output = await doc.updateOne({disponible:false});
            console.log(output);
            res.send('Producto removido')}
        remove();
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
}

module.exports = new IndexController