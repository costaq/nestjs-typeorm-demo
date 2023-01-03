import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';

@Injectable()
export class CommonRedisService {
  private client: Redis.Redis;
  constructor(private readonly redisService: RedisService) {
    this.getClient();
  }

  /**
   * @description 清空缓存
   */
  private async getClient() {
    this.client = await this.redisService.getClient();
  }

  /**
   * @description 设置缓存
   */
  public async set(key: string, value: any, seconds?: number): Promise<void> {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @description 根据key值获取缓存
   */
  public async get<T>(key: string): Promise<T> {
    if (!this.client) {
      await this.getClient();
    }

    const data = await this.client.get(key);

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /**
   * @description 根据key值删除缓存
   */
  public async del(key: string): Promise<void> {
    if (!this.client) {
      await this.getClient();
    }

    await this.client.del(key);
  }

  /**
   * @description 清空缓存
   */
  public async flushall(): Promise<void> {
    if (!this.client) {
      await this.getClient();
    }

    await this.client.flushall();
  }
}
