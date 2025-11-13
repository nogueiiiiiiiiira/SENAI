
const {
  addReturn,
  listReturns,
  listReturnById,
  listReturnBySearch,
  updateReturnService,
  deleteReturnService,
  updateStock,
  addFine,
  updateLoan
} = require("../service/returnService");

const { getReaderAndBookNames } = require("../service/loanService");
const { addHistoric } = require("../service/historicService");
const { validateRequired, formatDate } = require('../utils/validation');
const { CREATED_AT, NOW, FINE_PER_DAY } = require('../utils/constants');

async function getReturns(req, res) {
  const returns = await listReturns();
  return returns.length > 0 ? res.status(200).json(returns) : res.status(204).send();
}

async function getReturnBySearch(req, res) {
  const { returnSearch } = req.params;
  if (!returnSearch) return res.status(400).json({ message: 'Inserção é obrigatória.' });

  const result = await listReturnBySearch(returnSearch);
  return result?.length > 0 ? res.status(200).json(result) : res.status(204).send();
}

async function postReturn(req, res) {
  try {
    const { cpf, idLivro } = req.body;
    validateRequired(['cpf', 'idLivro'], req.body);

    const loan = await require('@prisma/client').PrismaClient.prototype.loan.findFirst({
      where: { idLivro: idLivro }
    });

    if (!loan) throw new Error('Livro não existe! Não foi possível realizar a devolução');

    const { nomeLeitor, nomeLivro } = await getReaderAndBookNames(cpf, idLivro);
    const [dia, mes, ano] = loan.dataDev.split('/');
    const prevDev = formatDate(new Date(`${ano}-${mes}-${dia}`));
    const dataAtual = new Date();
    const criadoEm = formatDate(dataAtual);
    const prevDevDate = new Date(`${ano}-${mes}-${dia}`);
    const multaAtribuida = dataAtual.getTime() > prevDevDate.getTime() ? 'Sim' : 'Não';

    if (multaAtribuida === 'Sim') {
      const diasAtra = Math.round((dataAtual.getTime() - prevDevDate.getTime()) / (1000 * 3600 * 24));
      const total = diasAtra * FINE_PER_DAY;
      const statusPag = 'Não pago';
      await addFine(cpf, nomeLeitor, idLivro, nomeLivro, diasAtra.toString(), total.toString(), statusPag, criadoEm);
      await addHistoric('Multa registrada', `${NOW} ${CREATED_AT}`);
    }

    await addReturn(cpf, nomeLeitor, idLivro, nomeLivro, prevDev, criadoEm, multaAtribuida);
    await addHistoric('Devolução registrada', `${NOW} ${CREATED_AT}`);
    await updateStock(idLivro);
    await updateLoan(idLivro, { statusEmp: 'Livro devolvido' });

    res.status(201).json({ message: 'Devolução realizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: `Erro ao realizar devolução: ${error.message}` });
  }
}

async function updateReturn(req, res) {
  try {
    const { cpf, idLivro } = req.body;
    const { idReturn } = req.params;
    validateRequired(['cpf', 'idLivro'], req.body);

    if (!Number(idReturn)) return res.status(400).json({ message: 'ID de devolução inválido.' });

    const existingReturn = await listReturnById(Number(idReturn));
    if (!existingReturn) return res.status(404).json({ message: 'Devolução não encontrada.' });

    const updateReturn = await updateReturnService(idReturn, cpf, idLivro);
    await addHistoric('Atualização de devolução registrado', `${NOW} ${CREATED_AT}`);

    res.status(200).json(updateReturn);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar devolução.' });
  }
}

async function deleteReturn(req, res) {
  try {
    const { idReturn } = req.params;
    if (!Number(idReturn)) return res.status(400).json({ message: 'ID de devolução inválido.' });

    const existingReturn = await listReturnById(Number(idReturn));
    if (!existingReturn) return res.status(404).json({ message: 'Devolução não encontrada.' });

    await deleteReturnService(Number(idReturn));
    await addHistoric('Exclusão de devolução registrada', `${NOW} ${CREATED_AT}`);

    res.status(200).json({ message: 'Devolução deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar devolução.' });
  }
}

module.exports = { getReturns, getReturnBySearch, postReturn, updateReturn, deleteReturn };
