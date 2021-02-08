var Team = require('../models/team')

module.exports.listarAll = () => {
    return Team
        .find()
        .exec()
}


module.exports.listar = () => {
    return Team.aggregate([
        {
            $project: {
                _id: 1,
                pitch1: 1,
                pitch2: 1,
                team: 1,
                techPitch: 1,
                businessReport: 1,
                techReport: 1,
                nmembers: { $cond: { if: { $isArray: "$members" }, then: { $size: "$members" }, else: "0"} }
            }
        }
    ])
    .exec()
}

module.exports.consultar = id => {
    return Team
        .findOne({_id: id})
        .exec()
}

module.exports.consultarT = (idt, idm) => {
    return Team
        .findOne({_id : idt}, {$pull:{ "members" : {id: idm}}})
        .exec()
}

module.exports.inserirNM = (t,m) => {
    return Team
        .findOneAndUpdate({_id: t}, {$push: {members: m}}, { new: true, useFindAndModify: false })
        .exec()
    //var novo = new Compra(c)
    //return novo.save()
}

module.exports.inserir = t => {
    var novo = new Team(t)
    return novo.save()
}

module.exports.remover = id => {
    return Team.deleteOne({_id: id})
}

module.exports.removerTM = (idt, idm) => {
    return Team
    .updateOne({_id : idt}, {$pull:{ "members" : {id: idm}}}
    )
}
