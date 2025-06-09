const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Criar uma nova reclamação
router.post('/', async (req, res) => {
  try {
    const { title, message } = req.body;
    const newComplaint = new Complaint({ title, message });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar reclamação' });
  }
});

// Listar todas as reclamações
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reclamações' });
  }
});

// Atualizar uma reclamação
router.put('/:id', async (req, res) => {
  try {
    const { title, message } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );
    if (!updatedComplaint) return res.status(404).json({ error: 'Reclamação não encontrada' });
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar reclamação' });
  }
});

// Deletar uma reclamação
router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reclamação deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar reclamação' });
  }
});

module.exports = router;
