import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);

//GET: buscar ou listar alguma informação
//POST: criar alguma informação
//PUT: atualizar uma informação existente
//DELETE: Deletar uma informação existente

// Copro : Request Body: Dados para criação ou att 
// Route params: identificar qual recurso eu quero utilizar ou deletar 
// Query params: paginacao, filtros, ordenacao

app.listen(3333);