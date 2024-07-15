// tests/magicItemRoutes.test.ts

import request from 'supertest';
import app from '../src/app';
import { MagicItem } from '../src/models/MagicItem';


describe('Magic Item Routes', () => {
  beforeEach(async () => {
    await MagicItem.deleteMany({});

    const magicItemData = [
      { name: 'Item 1', weight: 10 },
      { name: 'Item 2', weight: 15 }
    ];

    await MagicItem.create(magicItemData);
  });

  it('GET /api/magic-items should fetch all magic items', async () => {
    const res = await request(app)
      .get('/api/magic-items')
      .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('name', 'Item 1');
    expect(res.body[0]).toHaveProperty('weight', 10);
    expect(res.body[1]).toHaveProperty('name', 'Item 2');
    expect(res.body[1]).toHaveProperty('weight', 15);
  });
});
