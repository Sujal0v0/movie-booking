# User Sign up

- database user record save
- nodemailer services module
- async await nodemailer service
- email from req.body, send welcome user email(event or async await)

# User Login

- input=> req.body => email,password
- if email and password doesn't match => throw error
- output=> jwt token

# User List API (admin)

- if user is admin => show list of error
- if user is not admin throw unauthorized error

-How? By using JWT Token, by sending jwt token through headers

# Utils

- secure => Verify JWT Token with checkRole middleware
- token => generateToken , verifyToken ,checkRole

# User Register

- API endpoint (req.body)
- joi validation
- password convert to hash password
- store in db(create)
- email

# User Signup

- API Endpoint {msg:User signup successfully}(/register)
- userController.register()
- register controller,
  1. email,password check
  2. create bcrypt utility file (genHash,compareHash)
  3. payload.password =getHash(password)
  4. userModel.create(payload)
  5. email signup(email notification)

# User Login

- Api Endpoint (/login)
- login controller
  1. email exists;isActive:true
  2. check email verification of user
  3. email not verified , throw error
  4. compare password hash with user password
  5. if invalid, throw error
  6. return true

# Email token generation

1. Api EndPoint (/generate-email-token)
2. check if email exists ; isActive:true
3. use crypto util to create otp (truly random otp)
4. Store the otp in the user database
5. email that otp

# Token verification

- Api (/verify-email-token)

1. email exists; isActive :true
2. compare otp
3. if verified ,update user database isEmailVerified : true, otp:""
4. else Token not matching

# User list (admin)

- .find()
- secure pass admin as sys role
- select: false in model

# User block (admin)

- blockUser method
- user findOne({\_id:id})
- use opposite of user isActive status
- user updateOne()

# User delete (admin)

- secure admin only
- User findOne()
- use .deleteOne({\_id:id})

# User profile (user,admin)

- secure([])
- checkRole update for sysRole empty condition
- secure token and send only {name,email}
- token decrypt
- use email to find user detail (isActive:true,isEmailVerified: true)
- userRole and pass it to checkRole
- user id => req.currentUser

# Get User detail (admin)

# User password change (user)

# User password reset (admin)

# User forget password (user,admin)
