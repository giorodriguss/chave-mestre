const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Define o payload do token
        const payload = { idUser: usuario.idUser, nome: usuario.nome };

        // Gera o token com uma chave secreta e define a expiração (opcional)
        const token = jwt.sign(payload, 'sua_chave_secreta', { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar login' });
    }
};


// Criar usuário
exports.createUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        // Verifica se os campos obrigatórios foram fornecidos
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }

        const usuario = await Usuario.create({ nome, email, senha, dataCriacao: new Date() });
        res.status(201).json(usuario); // Resposta com o usuário criado
    } catch (error) {
        console.error('Erro ao criar usuário:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }
        res.json(usuarios); // Retorna todos os usuários
    } catch (error) {
        console.error('Erro ao listar usuários:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
    const { idUser } = req.params;
    try {
        const usuario = await Usuario.findByPk(idUser);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario); // Retorna o usuário encontrado
    } catch (error) {
        console.error('Erro ao obter usuário:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
    const { idUser } = req.params;
    const { nome, email, senha } = req.body;
    try {
        // Verifica se os campos foram fornecidos
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }

        const [updated] = await Usuario.update({ nome, email, senha }, { where: { idUser } });

        if (updated) {
            const usuarioAtualizado = await Usuario.findByPk(idUser);
            res.json({ message: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado para atualizar' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const deleted = await Usuario.destroy({ where: { idUser } });

        if (deleted) {
            res.json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado para excluir' });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error); // Log para depuração
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};
