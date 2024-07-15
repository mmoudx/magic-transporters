import request from 'supertest';
import app from '../src/app'; 
import { MagicMover } from '../src/models/MagicMover';
import { MagicItem } from '../src/models/MagicItem';
import mongoose from 'mongoose'; 


describe('Magic Mover Controllers', () => {
  let testMoverId: mongoose.Types.ObjectId;

  beforeEach(async () => {
    await MagicMover.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /api/magic-movers should create a new Magic Mover', async () => {
    const newMoverData = {
      name: 'Test Mover',
      weightLimit: 150
    };

    const res = await request(app)
      .post('/api/magic-movers')
      .send(newMoverData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(newMoverData.name);
    expect(res.body.weightLimit).toBe(newMoverData.weightLimit);
    expect(res.body.questState).toBe('resting');
    expect(res.body.completedMissions).toBe(0); 

    // Verify if Magic Mover was actually saved in the database
    const savedMover = await MagicMover.findById(res.body._id);
    expect(savedMover).toBeTruthy();
    expect(savedMover!.name).toBe(newMoverData.name);
    expect(savedMover!.weightLimit).toBe(newMoverData.weightLimit);
    expect(savedMover!.questState).toBe('resting');
    expect(savedMover!.completedMissions).toBe(0);
  });

  it('POST /api/magic-movers/:moverId/load should load items onto a Magic Mover', async () => {
    // Prepare test data
    const testMover = new MagicMover({
      name: 'Test Mover',
      weightLimit: 200,
      questState: 'resting'
    });
    await testMover.save();
    testMoverId = testMover._id as mongoose.Types.ObjectId;

    const newItemData = {
      name: 'Magic Item',
      weight: 50
    };
    const newItemRes = await request(app)
      .post('/api/magic-items')
      .send(newItemData)
      .expect(201);

    const loadRequestData = {
      itemIds: [newItemRes.body._id],
      quantity: 1
    };

    const res = await request(app)
      .post(`/api/magic-movers/${testMoverId}/load`)
      .send(loadRequestData)
      .expect(200);

    expect(res.body).toHaveProperty('questState', 'loading');
    expect(res.body.loadedItems).toHaveLength(1);
    expect(res.body.loadedItems[0].item).toBe(newItemRes.body._id);
    expect(res.body.loadedItems[0].quantity).toBe(loadRequestData.quantity);
  });

it('POST /api/magic-movers/:moverId/start-mission should start a mission for a Magic Mover', async () => {
  const testMover = new MagicMover({
    name: 'Test Mover',
    weightLimit: 200,
    questState: 'loading' // Set to loading state for test
  });
  await testMover.save();
  const testMoverId = testMover._id; // Ensure testMoverId is defined here

  const res = await request(app)
    .post(`/api/magic-movers/${testMoverId}/start-mission`) // Pass testMoverId as part of URL
    .expect(200);

  expect(res.body).toHaveProperty('questState', 'on-mission');
});


it('POST /api/magic-movers/:moverId/end-mission should end a mission for a Magic Mover', async () => {
    const testMover = new MagicMover({
      name: 'Test Mover',
      weightLimit: 200,
      questState: 'on-mission' // Set to on-mission state for test
    });
    await testMover.save();
    const testMoverId = testMover._id; // Ensure testMoverId is defined here
  
    const res = await request(app)
      .post(`/api/magic-movers/${testMoverId}/end-mission`) // Pass testMoverId as part of URL
      .expect(200);
  
    expect(res.body).toHaveProperty('questState', 'resting');
    expect(res.body).toHaveProperty('completedMissions', 1);
  });
  

  it('GET /api/magic-movers/completed-missions should fetch movers sorted by most completed missions', async () => {
    // Insert test data into database
    await MagicMover.create([
      { name: 'Mover A', weightLimit: 100, questState: 'resting', completedMissions: 5 },
      { name: 'Mover B', weightLimit: 150, questState: 'resting', completedMissions: 3 },
      { name: 'Mover C', weightLimit: 120, questState: 'resting', completedMissions: 7 }
    ]);

    const res = await request(app)
      .get('/api/magic-movers/completed-missions')
      .expect(200);

    // Verify the order of movers by completedMissions (descending)
    expect(res.body).toHaveLength(3);
    expect(res.body[0].name).toBe('Mover C');
    expect(res.body[1].name).toBe('Mover A');
    expect(res.body[2].name).toBe('Mover B');
  });
});
