import { DataSource as TypeOrmDataSource } from 'typeorm';
import { typeOrmConnection } from './typeorm-connection';
import { Logger } from '@infra/utils/logger/Logger';
import { IDataBaseConnector } from '../IDataBaseConnector';
import { exec } from 'child_process';
import util from 'util';
import { envPostgres } from '@config/variables/postgres';

const execAsync = util.promisify(exec);

export class TypeOrmConnector implements IDataBaseConnector{
  private static instance: TypeOrmConnector;
  private typeOrmConnection: TypeOrmDataSource;

  private constructor() {
    this.typeOrmConnection = typeOrmConnection;
  }

  public static getInstance(): IDataBaseConnector {
    if (!TypeOrmConnector.instance) {
      TypeOrmConnector.instance = new TypeOrmConnector();
    }
    return TypeOrmConnector.instance;
  }

  public async connect(): Promise<boolean> {
    Logger.info({
      message: '[DATABASE] - Connecting',
      additionalInfo: {
        host: envPostgres.host,
        port: envPostgres.port,
        username: envPostgres.user,
        password: envPostgres.pass,
        database: envPostgres.database,
        schema: envPostgres.schema,
      }
    });
    await this.typeOrmConnection.initialize()
        .then(async () => {
            Logger.info({
              message: '[DATABASE] - Connected'
            })

            await this.typeOrmConnection.query(`CREATE SCHEMA IF NOT EXISTS "${envPostgres.schema}"`);

            const { stdout, stderr } = await execAsync('yarn db:run');
            Logger.info({ message: '[MIGRATION] - Output', additionalInfo: { stdout, stderr } });
        })
        .catch((error) => {
            Logger.error({
                message: '[DATABASE] - Connection failed',
                additionalInfo: { errorMessage: error.message, errorStack: error.stack, error: error }
            })
        });
    return this.typeOrmConnection.isInitialized;
  }

  public isConnected(): boolean {
    return this.typeOrmConnection.isInitialized;
  }

  public async disconnect(): Promise<boolean> {
    try {
      await this.typeOrmConnection.destroy();
      Logger.info({
        message: '[DATABASE] - Disconnected',
      });
    } catch (error: any) {
      Logger.error({
        message: '[DATABASE] - Disconnection failed',
        additionalInfo: { errorMessage: error.message },
      });
    }
    return !this.typeOrmConnection.isInitialized;
  }
}