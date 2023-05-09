import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisClientOptions, createClient } from 'redis';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options?: RedisClientOptions): DynamicModule {
    const provider = {
      provide: 'RedisClient',
      useFactory: async () => {
        const redisClient = createClient(options);

        redisClient.on('connect', () => {
          console.log('Connected to Redis server');
        });

        redisClient.on('error', (err) => {
          console.error('Error connecting to Redis server', err);
        });

        await redisClient.connect();

        return redisClient;
      },
    };

    return {
      module: RedisModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
