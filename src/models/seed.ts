import mongoose from 'mongoose';
import { MagicMover } from '../models/MagicMover';
import { MagicItem } from '../models/MagicItem';

const seedData = async () => {
  await mongoose.connect('mongodb://localhost:27017/magic_movers');

  // Clear existing data
  await MagicMover.deleteMany({});
  await MagicItem.deleteMany({});

  // Add new data
  const items = await MagicItem.insertMany([
    { name: 'Magic Wand', weight: 1 },
    { name: 'Potion', weight: 0.5 },
    { name: 'Magic Sword', weight: 5 },
    { name: 'Enchanted Shield', weight: 7 },
    { name: 'Healing Herb', weight: 0.2 },
    { name: 'Spell Book', weight: 3 },
    { name: 'Mystic Crystal', weight: 2 },
    { name: 'Fire Amulet', weight: 0.8 },
    { name: 'Ice Amulet', weight: 0.8 },
    { name: 'Lightning Rod', weight: 4 },
    { name: 'Phoenix Feather', weight: 0.1 },
    { name: 'Dragon Scale', weight: 6 },
  ]);

  await MagicMover.insertMany([
    { name: 'Mover1', weightLimit: 10, questState: 'resting', completedMissions: 0, loadedItems: [] },
    { name: 'Mover2', weightLimit: 15, questState: 'resting', completedMissions: 0, loadedItems: [] },
    { name: 'Mover3', weightLimit: 12, questState: 'resting', completedMissions: 1, loadedItems: [] },
    { name: 'Mover4', weightLimit: 20, questState: 'resting', completedMissions: 2, loadedItems: [] },
    { name: 'Mover5', weightLimit: 18, questState: 'resting', completedMissions: 1, loadedItems: [] },
    { name: 'Mover6', weightLimit: 22, questState: 'resting', completedMissions: 3, loadedItems: [] },
    { name: 'Mover7', weightLimit: 8, questState: 'resting', completedMissions: 0, loadedItems: [] },
    { name: 'Mover8', weightLimit: 25, questState: 'resting', completedMissions: 4, loadedItems: [] },
    { name: 'Mover9', weightLimit: 30, questState: 'resting', completedMissions: 5, loadedItems: [] },
    { name: 'Mover10', weightLimit: 11, questState: 'resting', completedMissions: 2, loadedItems: [] },
    { name: 'Mover11', weightLimit: 16, questState: 'resting', completedMissions: 1, loadedItems: [] },
    { name: 'Mover12', weightLimit: 17, questState: 'resting', completedMissions: 3, loadedItems: [] },
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData().catch(err => console.error(err));
