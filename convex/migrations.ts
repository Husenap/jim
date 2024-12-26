import { makeMigration } from 'convex-helpers/server/migrations';
import { internalMutation } from './_generated/server';

const migration = makeMigration(internalMutation);

export const renameImageURL = migration({
  table: 'users',
  migrateOne: async (ctx, doc) => {
    if (doc.image_url !== undefined) {
      await ctx.db.patch(doc._id, {
        imageURL: doc.image_url,
        image_url: undefined
      });
    }
  },
});