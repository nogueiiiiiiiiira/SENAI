const {
  payFine,
  listFines,
  listFineById,
  listFineBySearch,
  updateFineService,
  deleteFineService
} = require("../service/fineService");

async function getFines(req, res) {
  const fines = await listFines();
  return fines.length > 0 ? res.status(200).json(fines) : res.status(204).send();
}

async function getFinesBySearch(req, res) {
  const { fineSearch } = req.params;
  if (!fineSearch) return res.status(400).json({ message: 'Inserção é obrigatória' });

  const result = await listFineBySearch(fineSearch);
  return result?.length > 0 ? res.status(200).json(result) : res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function updatePayment(req, res) {
  try {
    const { cpf, idLivro } = req.body;
    if (!cpf || !idLivro) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    await payFine(cpf, idLivro, 'Multa Paga');

    res.status(201).json({ message: 'Multa paga com sucesso' });
  } catch (error) {
    res.status(error.message.includes('não existe') ? 400 : 500).json({ message: error.message });
  }
}

async function updateFine(req, res) {
  try {
    const { cpf, idLivro } = req.body;
    const { fineId } = req.params;
    if (!cpf || !idLivro) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const existingFine = await listFineById(fineId);
    if (!existingFine) return res.status(404).json({ message: 'Multa não encontrada.' });

    const updatedFine = await updateFineService(fineId, cpf, idLivro);

    res.status(200).json(updatedFine);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a multa.' });
  }
}

async function deleteFine(req, res) {
  try {
    const { fineId } = req.params;
    const existingFine = await listFineById(fineId);
    if (!existingFine) return res.status(404).json({ message: 'Multa não encontrada.' });

    await deleteFineService(fineId);

    res.status(200).json({ message: 'Multa excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = { getFines, getFinesBySearch, updatePayment, updateFine, deleteFine };
