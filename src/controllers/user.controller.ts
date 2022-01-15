import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { User, UserInput } from '../model/user.model';
import signJWT from '../functions/signJWT';

const register = (req: Request, res: Response) => {
  // Get user info from body
  const { username, email, password, useLocation } = req.body;

  if (!email || !username || !password) {
    // Return error if not all infos are provided
    return res.status(422).json({
      message: 'The fields email, username and password are required',
    });
  } else if (password.length < 8) {
    return res
      .status(422)
      .json({ message: 'Password must be at least 8 digits long' });
  }

  bcryptjs.hash(password, 10, (hashError, hash) => {
    // Hash the password to not store it in plain text in db
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    const userInput: UserInput = {
      // Mongoose Create User Instance
      username,
      email,
      password: hash,
      useLocation,
      myEvents: [],
      suggestedEvents: [],
    };

    const userInput2 = new User(userInput);
    userInput2.save(function (err, user) {
      if (err) {
        // console.log(err);
        return res.status(409).json({
          message: 'Username or Email already taken!',
          error: err,
        });
      }
      return res.status(201).json({ data: user });
    });
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body; // Get credentials from body

  /*if (password === GOOGLE_PASSWORD) { // Prevent sneaky people from logging in by using the normal Login form to perform Google logins
      return res.status(401).json({
        message: 'Unauthorized!'
      });
    }*/

  User.find({ email }) // Find user in db
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        // If for some reason more than one accounts with this username exist return error
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      bcryptjs.compare(password, users[0].password, (error, result) => {
        // Compare pws
        if (error) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            // Create JWT Token for user
            if (_error) {
              return res.status(401).json({
                message: 'Unauthorized',
              });
            } else if (token) {
              // Pass Token and general user info back to client
              return res.status(200).json({
                message: 'Auth successful',
                token: token,
                user: users[0],
              });
            }
          });
        } else {
          // passwords don't match
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }
      });
    });
};

const getUserById = (req: Request, res: Response) => {
  const {userId} = req.body;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(400).json({});
    } else if (user) {
      res.json(user);
    }
  })
}

const getUsers = (req: Request, res: Response) => {
  User.find().exec((err, users) => {
    res.json(users);
  });
}

const recommendEvent = (req: Request, res: Response) => {
  const { eventId, recommenderId, forUserId } = req.body;

  User.findById(forUserId).exec((err, user) => {
    if (err) {
      res.status(400).json({});
    } else if (user) {
      if (user.suggestedEvents.some(e => e.eventId === eventId)) {
        // Already recommended remove
        const copy = user.suggestedEvents.filter(e => e.eventId !== eventId);
        User.findByIdAndUpdate(forUserId, {
          $set: {
            suggestedEvents: copy,
          },
        }).exec(function (error, user) {
          res.json(user);
        });
      } else {
        // Add
        User.findByIdAndUpdate(forUserId, {
          $push: {
            suggestedEvents: [{suggester: recommenderId, eventId: eventId}],
          },
        }).exec(function (error, user) {
          res.json(user);
        });
      }
    }
  })
}

const saveEvent = (req: Request, res: Response) => {
  const { eventId, userId } = req.body;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(400).json({});
    } else if (user) {
      if (user.myEvents.includes(eventId)) {
        // Remove
        const copy = user.myEvents;
        const index = copy.indexOf(eventId, 0);
        copy.splice(index, 1);
        User.findByIdAndUpdate(userId, {
          $set: {
            myEvents: copy,
          },
        }).exec(function (error, user) {
          res.json(user);
        });
      } else {
        // Add
        User.findByIdAndUpdate(userId, {
          $push: {
            myEvents: [eventId],
          },
        }).exec(function (error, user) {
          res.json(user);
        });
      }
    }
  });

};
export { register, login, saveEvent, getUserById, getUsers, recommendEvent };
