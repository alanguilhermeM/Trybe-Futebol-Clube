import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatche } from '../../Interfaces/matches/IMatche';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatche>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: {
          // Informa a tabela da referência da associação
          model: 'teams',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals'
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        references: {
          // Informa a tabela da referência da associação
          model: 'teams',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals'
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
        // defaultValue: true,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};