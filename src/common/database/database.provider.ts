import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
export const databaseProviders = [{

  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize(databaseConfig);
    const modelsDir = './**/*.model.js';
    const selectedModels = [join(process.cwd(), '/dist', modelsDir)];
    sequelize.addModels(selectedModels);
    await sequelize.sync();
    return sequelize;
  }
}];