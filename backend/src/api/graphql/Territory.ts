import { objectType } from "nexus";
import { Territory } from "nexus-prisma";

export const TerritoryObject = objectType({
  name: Territory.$name,
  definition(t) {
    t.field(Territory.id);
    t.field(Territory.name);
    // t.field(Territory.User);
  },
});
