
import { typeOrmConnection } from './typeorm-connection';
import { Logger } from '@infra/utils/logger/Logger';
import { envPostgres } from '@config/variables/postgres';
import { exec } from 'child_process';
import util from 'util';
import { TypeOrmConnector } from './typeorm-connector';

jest.mock('./typeorm-connection', () => ({
  typeOrmConnection: {
    initialize: jest.fn(),
    destroy: jest.fn(),
    query: jest.fn(),
    isInitialized: false,
  },
}));

jest.mock('util', () => ({
  promisify: jest.fn().mockImplementation(() => jest.fn()),
}));

jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

jest.mock('@infra/utils/logger/Logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

const mockExecAsync = jest.fn();
(util.promisify as unknown as jest.Mock).mockReturnValue(mockExecAsync);

describe('TypeOrmConnector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInstance', () => {
    it('when called multiple times should return the same instance', () => {
      const instance1 = TypeOrmConnector.getInstance();
      const instance2 = TypeOrmConnector.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('connect', () => {
    it('when initialization succeeds should log success and return true', async () => {
      (typeOrmConnection.initialize as jest.Mock).mockResolvedValue(undefined);
      (typeOrmConnection.query as jest.Mock).mockResolvedValue(undefined);
      mockExecAsync.mockResolvedValue({ stdout: 'migration ok', stderr: '' });
      (typeOrmConnection as any).isInitialized = true;

      const connector = TypeOrmConnector.getInstance();
      const result = await connector.connect();

      expect(typeOrmConnection.initialize).toHaveBeenCalled();
      expect(typeOrmConnection.query).toHaveBeenCalledWith(`CREATE SCHEMA IF NOT EXISTS "${envPostgres.schema}"`);
      expect(Logger.info).toHaveBeenCalledWith(expect.objectContaining({ message: '[DATABASE] - Connected' }));
      expect(result).toBe(true);
    });

    it('when initialization fails should log error and return false', async () => {
      const error = new Error('fail init');
      (typeOrmConnection.initialize as jest.Mock).mockRejectedValue(error);
      (typeOrmConnection as any).isInitialized = false;

      const connector = TypeOrmConnector.getInstance();
      const result = await connector.connect();

      expect(Logger.error).toHaveBeenCalledWith(expect.objectContaining({
        message: '[DATABASE] - Connection failed',
        additionalInfo: expect.objectContaining({ errorMessage: error.message }),
      }));
      expect(result).toBe(false);
    });
  });

  describe('isConnected', () => {
    it('when isInitialized is true should return true', () => {
      (typeOrmConnection as any).isInitialized = true;
      const connector = TypeOrmConnector.getInstance();
      expect(connector.isConnected()).toBe(true);
    });

    it('when isInitialized is false should return false', () => {
      (typeOrmConnection as any).isInitialized = false;
      const connector = TypeOrmConnector.getInstance();
      expect(connector.isConnected()).toBe(false);
    });
  });

  describe('disconnect', () => {
    it('when disconnect succeeds should log and return true', async () => {
      (typeOrmConnection.destroy as jest.Mock).mockResolvedValue(undefined);
      (typeOrmConnection as any).isInitialized = false;

      const connector = TypeOrmConnector.getInstance();
      const result = await connector.disconnect();

      expect(Logger.info).toHaveBeenCalledWith({ message: '[DATABASE] - Disconnected' });
      expect(result).toBe(true);
    });

    it('when disconnect fails should log error and return false', async () => {
      const error = new Error('disconnect error');
      (typeOrmConnection.destroy as jest.Mock).mockRejectedValue(error);
      (typeOrmConnection as any).isInitialized = true;

      const connector = TypeOrmConnector.getInstance();
      const result = await connector.disconnect();

      expect(Logger.error).toHaveBeenCalledWith(expect.objectContaining({
        message: '[DATABASE] - Disconnection failed',
        additionalInfo: { errorMessage: error.message },
      }));
      expect(result).toBe(false);
    });
  });
});
