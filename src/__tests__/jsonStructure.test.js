/* eslint-env jest */
import fs from 'fs';
import path from 'path';

// Lista de usuarios esperados (puedes automatizarla si quieres leer el directorio)
const users = ['Bob', 'Alice', 'John'];

describe('JSON structure validation for each user', () => {
  users.forEach((username) => {
    it(`validates structure of ${username}'s data.json`, () => {
      const filePath = path.resolve(__dirname, `../../public/${username}/data.json`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);

      // Verifica estructura general
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('topic');
      expect(data).toHaveProperty('names');

      // Verifica contenido de 'user'
      expect(data.user).toMatchObject({
        username: expect.any(String),
        profileImage: expect.any(String),
        socialLink: expect.any(String),
      });

      // Verifica 'topic'
      expect(typeof data.topic).toBe('string');

      // Verifica 'names' es un array con al menos un string
      expect(Array.isArray(data.names)).toBe(true);
      data.names.forEach(name => {
        expect(typeof name).toBe('string');
      });
    });
  });
});
