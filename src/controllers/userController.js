// const { Usuario } = require('../models');

// Criar
exports.createUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const usuario = await Usuario.create({ nome, email, senha, dataCriacao: new Date() });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Obter todos
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

// Atualizar
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const usuario = await Usuario.update({ nome, email, senha }, { where: { idUser: id } });
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Excluir
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.destroy({ where: { idUser: id } });
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};