import { extendType, nonNull, objectType } from "nexus";
import { Address } from "nexus-prisma";

export const AddressObject = objectType({
  name: Address.$name,
  definition(t) {
    t.field(Address.id);
    t.field(Address.address);
    t.field(Address.city);
    t.field(Address.zip);
    t.field(Address.state);
    t.field(Address.isDoNotCall);
    // t.field(Address.notes)
    t.field("territory", {
      type: "Territory",
      resolve: async ({ territoryId }, __, { db }) => {
        return db.territory.findUnique({
          where: { id: territoryId ? territoryId : "" },
        });
      },
    });
    t.field(Address.territoryId);
  },
});
