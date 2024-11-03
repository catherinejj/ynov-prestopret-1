import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    const saltRounds = 10; // Nombre de tours pour le salage

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        throw error;
    }
}