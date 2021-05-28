import { Router } from "express";

import UserController from "./controllers/UserController.js";
import ProfessorController from "./controllers/ProfessorController.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// GET /users > Listar usuários
routes.get("/users", UserController.list);
// GET /users/:id > Listar um usuário
routes.get("/users/:id", UserController.listOne);
// POST /users > Criar um usuário
routes.post("/users", UserController.create);
// PUT /users/:id > Atualizar um usuário
routes.put("/users/:id", UserController.update);
// DELETE /users/:id > Deletar um usuário
routes.delete("/users/:id", UserController.delete);


// Rotas de professores
// GET /professores > Listar todos os professores
routes.get("/professores", ProfessorController.listAll);
// GET /professores/:pid > Listar um professor
routes.get("/professores/:pid", ProfessorController.listOne);
// POST /professores
routes.post("/professores", ProfessorController.create);
// PUT /professores/:pid
routes.put("/professores/:pid", ProfessorController.updateOne);
// DELETE /professores/:pid
routes.delete("/professores/:pid", ProfessorController.delete);

// Classes de um Professor
// GET /professores/:pid/classes > Listar todas as classes de um professor
routes.get("/professores/:pid/classes", ProfessorController.listAll);
// GET /professores/:pid/classes/:cid > Listar uma classe de um professor
routes.get("/professores/:pid/classes/:cid", ProfessorController.listOneClass);
// POST /professores/:pid/classes > Cadastrar nova classe de um Professor.
/*
{
    name: "Classe 1",
    Description: "aaaa"
}
*/
routes.post("/professores/:pid/classes", ProfessorController.createClass);
// PUT /professores/:pid/classes/:cid > Editar uma classe de um Professor
routes.put("/professores/:pid/classes/:cid", ProfessorController.editOneClass);
// DELETE /professores/:pid/classes/:cid > Deletar uma classe de um Professor
routes.delete("/professores/:pid/classes/:cid", ProfessorController.deleteOneClass);

export default routes;
