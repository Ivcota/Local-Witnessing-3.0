import { extendType, objectType } from "nexus";
import { User } from "nexus-prisma";

export const UserObject = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.password);
    t.field(User.firstName);
    t.field(User.lastName);
    t.field(User.phone);
    t.field(User.isAdmin);
    // t.field(User.roles);
    t.list.field("territories", {
      type: "Territory",
      resolve: async ({ id }, __, { db }) => {
        return db.territory.findMany({
          where: {
            userId: { equals: id },
          },
        });
      },
    });
  },
});
