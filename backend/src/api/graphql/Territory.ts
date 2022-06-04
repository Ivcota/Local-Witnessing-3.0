import { extendType, nonNull, objectType } from "nexus";
import { Territory } from "nexus-prisma";

export const TerritoryObject = objectType({
  name: Territory.$name,
  definition(t) {
    t.field(Territory.id);
    t.field(Territory.name);
    t.field(Territory.addresses);
    t.list.field("addresses", {
      type: "Address",
      resolve: async ({ id }, __, { db }) => {
        const addresses = await db.address.findMany({
          where: {
            territoryId: id,
          },
        });

        return addresses;
      },
    });
    t.field("User", {
      type: "User",
      resolve: async ({ userId }, __, { db }) => {
        const user = await db.user.findUnique({
          where: { id: userId ? userId : "" },
        });

        return user;
      },
    });
    t.field(Territory.userId);
  },
});

export const AllTerritories = extendType({
  type: "Query",
  definition(t) {
    t.list.field("GetAllTerritories", {
      type: "Territory",
      resolve: async (_, __, { db }) => {
        const territory = db.territory.findMany();
        return territory;
      },
    });
  },
});

export const SingleTerritory = extendType({
  type: "Query",
  definition(t) {
    t.field("SingleTerritory", {
      type: "Territory",
      args: {
        id: nonNull("String"),
      },
      resolve: async (_, { id }, { db }) => {
        const territory = await db.territory.findUnique({ where: { id } });
        return territory;
      },
    });
  },
});
