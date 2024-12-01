const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica se o cabeçalho de autorização está presente
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Remove o "Bearer" do início do token, se houver
    const token = authHeader.split(' ')[1];

    // Verifica e valida o token
    jwt.verify(token, 'sua_chave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        // Salva os dados do usuário no request para acesso posterior
        req.user = user;
        next(); // Continua para o próximo middleware ou rota
    });
};

module.exports = authenticateToken;
