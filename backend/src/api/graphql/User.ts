import { extendType, nonNull, objectType } from "nexus";
import { User } from "nexus-prisma";
import bcrypt from "bcryptjs";

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

export const CreateAccount = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.boolean("CreateUserAccount", {
      args: {
        email: nonNull("String"),
        password: nonNull("String"),
        firstName: "String",
      },
      resolve: async (_, { email, password, firstName }, { db, req }) => {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = await db.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName: firstName ? firstName : null,
            },
          });

          // @ts-ignore
          req.session.userId = newUser.id;

          // @ts-ignore
          console.log(req.session.userId);

          return true;
        } catch (error) {
          return false;
        }
      },
    });
  },
});
