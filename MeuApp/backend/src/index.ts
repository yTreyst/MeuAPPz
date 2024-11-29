import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Inicializando o app
const app = express();

// Configurando middlewares
app.use(cors());
app.use(express.json()); // Permite o envio de JSON no corpo das requisições

// Tratamento de erros genéricos
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor!' });
});

// Rota de teste
app.get('/api/test', (req: Request, res: Response): Response => {
  return res.status(200).json({ message: 'Servidor está funcionando corretamente!' });
});

// Outra rota de exemplo
app.post('/api/example', (req: Request, res: Response): Response => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
  }
  return res.status(201).json({ message: `Bem-vindo, ${name}!` });
});

// Porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
