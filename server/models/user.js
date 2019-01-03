import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

export default class User extends Model {
  static init(database) {
    return super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: true,
            msg: "Nickname already in use"
          },
          validate: {
            isLongEnough(v) {
              if (v.length < 5) {
                throw new Error("Nickname must have at least 5 characters");
              }
            }
          }
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          },
          unique: {
            args: true,
            msg: "Email already in use"
          }
        },
        password_digest: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            isLongEnough(v) {
              if (v.length < 7) {
                throw new Error("Password must have at least 7 characters");
              }
            }
          }
        },
        password_confirmation: {
          type: Sequelize.VIRTUAL,
          validate: {
            isEqual(v) {
              if (v !== this.password) {
                throw new Error("Password confirmation doesn't match password");
              }
            }
          }
        }
      },
      {
        tableName: "users",
        sequelize: database,

        indexes: [
          {
            unique: true,
            fields: ["uuid", "nickname", "email"]
          }
        ],

        hooks: {
          async beforeValidate(userInstance) {
            userInstance.password_digest = await userInstance.generateHash();
          },

          async beforeSave(userInstance) {
            if (!userInstance.isNewRecord && userInstance.changed("password")) {
              userInstance.password_digest = await userInstance.generateHash();
            }
          }
        }
      }
    );
  }

  async generateHash() {
    const SALT_ROUND = 5;

    const hash = await bcrypt.hash(this.password, SALT_ROUND);
    if (!hash) {
      throw new Error("Can't hash password");
    }

    return hash;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_digest);
  }

  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password_digest;

    return values;
  }
}
