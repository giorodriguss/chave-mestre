// const { Usuario } = require('../models');

// Gerar nova senha
exports.createPassword = async (req, res) => {
    const { senhaGerada, idUser_fk, codPlataforma_fk } = req.body;
    try {
        const senha = await Senha.create({ senhaGerada, dataGeracao: new Date(), idUser_fk, codPlataforma_fk });
        res.status(201).json(senha);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar senha' });
    }
};

// Listar senhas por usuário
exports.getPasswordsByUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const senhas = await Senha.findAll({ where: { idUser_fk: idUser } });
        res.json(senhas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar senhas' });
    }
};

// Obter senha específica
exports.getPasswordById = async (req, res) => {
    const { id } = req.params;
    try {
        const senha = await Senha.findByPk(id);
        if (!senha) return res.status(404).json({ error: 'Senha não encontrada' });
        res.json(senha);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter senha' });
    }
};

// Atualizar senha
exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { senhaGerada } = req.body;
    try {
        await Senha.update({ senhaGerada }, { where: { id } });
        res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar senha' });
    }
};

// Excluir senha
exports.deletePassword = async (req, res) => {
    const { id } = req.params;
    try {
        await Senha.destroy({ where: { id } });
        res.json({ message: 'Senha excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir senha' });
    }
};