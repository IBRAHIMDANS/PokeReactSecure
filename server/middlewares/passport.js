import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";

passport.use(
  new LocalStrategy(
    {
      usernameField: "nickname",
      passwordField: "password"
    },
    async (nickname, password, next) => {
      const user = await User.findOne({ where: { nickname } });

      if (!user) {
        return next("Nickname doesn't exist");
      }

      if (!(await user.checkPassword(password))) {
        return next("Password doesn't match");
      }

      return next(false, user);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENCRYPTION
    },
    async (jwtPayload, next) => {
      try {
        const user = await User.findOne({ where: { uuid: jwtPayload.uuid } });
        if (!user) {
          return next("User doesn't exist");
        }
        return next(false, user);
      } catch (err) {
        return next(err.message);
      }
    }
  )
);
