const Senha = require('../models/senha');
const Plataforma = require('../models/plataforma');
const Requisito = require('../models/requisito');
const gerarSenha = require('../utils/gerarSenha');

// Gerar Senha
exports.createPassword = async (req, res) => {
    const { idUser_fk, codPlataforma_fk } = req.body;

    try {
        // Verificar se a plataforma existe
        const plataforma = await Plataforma.findOne({
            where: { codPlataforma: codPlataforma_fk } // Buscando pela FK fornecida
        });

        if (!plataforma) {
            return res.status(404).json({ error: 'Plataforma não encontrada' });
        }

        // Buscar os requisitos diretamente pela tabela de requisitos, se não há associação
        const requisitos = await Requisito.findOne({
            where: { idReq: plataforma.idReq_fk } // idReq_fk está na plataforma
        });

        if (!requisitos) {
            return res.status(404).json({ error: 'Requisitos não encontrados para a plataforma' });
        }

        // Gerar a senha
        const senhaGerada = gerarSenha(requisitos);

        // Criar a nova senha no banco
        const novaSenha = await Senha.create({
            senhaGerada,
            dataGeracao: new Date(),
            idUser_fk,
            codPlataforma_fk
        });

        res.status(201).json({ message: 'Senha criada com sucesso', senha: novaSenha });
    } catch (error) {
        console.error('Erro ao criar senha:', error);
        res.status(500).json({ error: 'Erro ao criar senha' });
    }
};


// Armazenar uma senha personalizada
exports.storePassword = async (req, res) => {
    const { senhaPersonalizada, idUser_fk, codPlataforma_fk } = req.body;

    try {
        // Cria o registro da senha personalizada
        const senha = await Senha.create({
            senhaGerada: senhaPersonalizada, // Usa o mesmo campo para armazenar a senha
            dataGeracao: new Date(),
            idUser_fk,
            codPlataforma_fk,
        });

        res.status(201).json({ message: 'Senha personalizada armazenada com sucesso', senha });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao armazenar senha personalizada' });
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

// Buscar senhas por plataforma
exports.getPasswordsByPlatform = async (req, res) => {
    const { codPlataforma } = req.params; // Obtém o código da plataforma dos parâmetros da rota
    try {
        const senhas = await Senha.findAll({ 
            where: { codPlataforma_fk: codPlataforma } 
        });

        if (senhas.length === 0) {
            return res.status(404).json({ error: 'Nenhuma senha encontrada para esta plataforma' });
        }

        res.json(senhas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar senhas por plataforma' });
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