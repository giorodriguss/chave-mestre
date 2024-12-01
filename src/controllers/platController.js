const Plataforma = require('../models/plataforma');
const sequelize = require('../config/db');

// Listar todas as plataformas e seus requisitos

exports.getAllPlatforms = async (req, res) => {
    try {
        const query = `
            SELECT 
                plataforma.codPlataforma, 
                plataforma.nome AS plataformaNome, 
                requisitos.idReq, 
                requisitos.tamanhoMinSenha, 
                requisitos.tamanhoMaxSenha, 
                requisitos.requerMaiusculas, 
                requisitos.requerMinusculas, 
                requisitos.requerNumeros, 
                requisitos.requerSimbolos
            FROM plataforma
            LEFT JOIN requisitos ON plataforma.idReq_fk = requisitos.idReq
        `;

        const [plataformas] = await sequelize.query(query); // Executa a consulta
        if (plataformas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma plataforma encontrada' });
        }
        res.json(plataformas); // Retorna os dados
    } catch (error) {
        console.error('Erro ao listar plataformas:', error);
        res.status(500).json({ error: 'Erro ao listar plataformas' });
    }
};

exports.getPlatformByCode = async (req, res) => {
    const { codPlataforma } = req.params;
    try {
        const plataforma = await Plataforma.findOne({ where: { codPlataforma } });
        if (plataforma) {
            res.json(plataforma);
        } else {
            res.status(404).json({ error: 'Plataforma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a plataforma' });
    }
};

