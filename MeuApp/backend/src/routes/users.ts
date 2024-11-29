import { Router } from 'express';

const router = Router();

// Rota para obter usuários
router.get('/', (req, res) => {
  res.json([{ id: 1, nome: 'João', ganhoMensal: 3000 }]);
});

export default router;