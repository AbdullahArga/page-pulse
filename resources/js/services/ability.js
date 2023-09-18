import { AbilityBuilder, createMongoAbility } from '@casl/ability';

const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

// can('read', 'Post');
// cannot('delete', 'Post', { published: true });

export default build();
