// const { Usuario } = require('../models');

// Listar todas as plataformas
exports.getAllPlatforms = async (req, res) => {
    try {
        const plataformas = await Plataforma.findAll();
        res.json(plataformas);
    } catch (error) {
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