import Professor from "../models/Professor.js";

class ProfessorController {
    // Rotas de professores
    // GET /professores - Listar todos os professores
    async listAll(req, res) {
        Professor.find({}).then((professores)=> { // sucesso
            res.json({ // status 200 ok
                error: false,
                Professor: professores
            })
        }).catch((err) => { // erro
            res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            })
        });
    }   
    
    // GET /professores/:pid - Listar um professor
    async listOne(req, res) {
        Professor.findById(req.params.pid).then((professor) => { // sucesso
            res.json({
                error: false,
                Professor: professor
            })
        }).catch((err) => { // erro
            res.status(400).json({
                error: true,
                message: "Erro, professor não encontrado!"
            })
        });
    }

    // POST /professores
    async create(req, res) {
        Professor.create(req.body).then((professor) => { // sucesso
            res.json({
                error: false,
                Professor: professor
            })
        }).catch((err) => { // erro
            console.log(err.name)
            console.log(err.message)
            if(err.name === "ValidationError") {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        })
    }

    // PUT /professores/:pid
    async updateOne(req, res) {
        Professor.updateOne({_id: req.params.pid}, req.body).then(() => { // sucesso
            return res.json({
                error: false,
                message: "Professor atualizado com sucesso!"
            });
        }).catch((err) => { // erro
            console.log(err.name)
            console.log(err.message)

            if(err.name === "CastError") {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }

            if(err.name === "ValidationError") {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }

            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
            
        });
    }

    // DELETE /professores/:pid
    async delete(req, res) {
        Professor.deleteOne({_id: req.params.pid}).then(() => { // sucesso
            res.json({ // status 200 ok
                error: false,
                message: "Professor deletado com sucesso!"
            });
        }).catch((err) => { // erro
            console.log(err)
            res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        });
    }

    // Classes de um Professor

    // GET /professores/:pid/classes - Listar todas as classes de um professor
    async listAll(req, res) {
        try {
            const professorExiste = await Professor.findById(req.params.pid);
            if(!professorExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            return res.json({classes: professorExiste.classes});
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }        
    }

    // GET /professores/:pid/classes/:cid - Listar uma classe de um professor
    async listOneClass(req, res) {
        try {
            const professorExiste = await Professor.findById(req.params.pid);
            if(!professorExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            const classExist = professorExiste.classes.id(req.params.cid);
            if(!classExist) {
                return res.status(400).json({
                    error: true,
                    message: "Classe não encontrada!"
                });
            }

            res.json({
                error: false,
                onwer: classExist
            });
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    error_code: 101,
                    message: "Professor não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }

    // POST /professores/:pid/classes - Cadastrar nova classe de um Professor.
    /*
    {
        name: "Classe 1",
        Description: "aaaa"
    }
    */
    async createClass(req, res) {
        try {
            const professorExiste = await Professor.findById(req.params.pid);
            if(!professorExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            const totalClasses = professorExiste.classes.push(req.body);
            professorExiste.save((err) => {
                console.log(err);
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: err.message,
                        ValidationError: err.errors
                    });
                }
            
                // Não havendo erro, então
                return res.json({ // status: 200 ok
                    error: false,
                    class: professorExiste.classes[totalClasses-1]
                })
            });
        }catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }

    // PUT /professores/:pid/classes/:cid - Editar uma classe de um Professor
    async editOneClass(req, res) {
        try {
            const professorExiste = await Professor.findById(req.params.pid);
            if(!professorExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            
            if(!professorExiste.classes.id(req.params.cid)) {
                return res.status(400).json({
                    error: true,
                    message: "Classe não encontrada!"
                });
            }
            if(req.body.name) {
                professorExiste.classes.id(req.params.cid).name = req.body.name;
            }
            if(req.body.sex) {
                professorExiste.classes.id(req.params.cid).sex = req.body.sex;
            }
            if(req.body.class) {
                professorExiste.classes.id(req.params.cid).class = req.body.class;
            }
            professorExiste.save((err) => { //const err = professorExiste.validateSync()
                console.log(err);
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: err.message,
                        ValidationError: err.errors
                    });
                }
            
                // Não havendo erro, então
                return res.json({ // status: 200 ok
                    error: false,
                    class: professorExiste.classes.id(req.params.cid)
                })
            });
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }

    // DELETE /professores/:pid/classes/:cid - Deletar uma classe de um Professor
    async deleteOneClass(req, res) {
        try {
            const professorExiste = await Professor.findById(req.params.pid);
            if(!professorExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            
            if(!professorExiste.classes.id(req.params.cid)) {
                return res.status(400).json({
                    error: true,
                    message: "Classe não encontrada!"
                });
            }

            professorExiste.classes.id(req.params.cid).remove();
            professorExiste.save( (err) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "Erro a executar esta solicitação!"
                    });
                }

                return res.json({
                    error: false,
                    message: "Classe deletado com sucesso!"
                })

            });
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Professor não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }
}

export default new ProfessorController();