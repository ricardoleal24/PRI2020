var Aluno = require('../models/aluno')

module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}
// O id é número de aluno
module.exports.consultar = id => {
    return Aluno
        .findOne({Número: id})
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}


module.exports.remover = function(id){
    return Aluno.deleteOne({Número: id})
}

/*
module.exports.editar = function(aluno){
    return Aluno.findByIdAndUpdate({_id: emd._id}, emd, {new: true})
}
*/