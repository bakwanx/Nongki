const { where } = require('sequelize');
const { 
  UserProfile,
  User
} = require('../models');

const createUser = async (user) => {
  const checkUser = await getUser(user.email.toLowerCase());
  if(checkUser != null){
    throw new Error('User has already registered');
  }
  try {
    const newUser = await User.create(
      { 
        email: user.email, 
        password: user.password
      }
    );
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const createUserProfile = async (userProfile) => {
  try {
    const newUser = await UserProfile.create(
      { 
        userId: userProfile.user.id,
        fullname : userProfile.fullname, 
        address: userProfile.address, 
        gender: userProfile.gender, 
        maritalStatus: userProfile.maritalStatus 
      }
    );
    return newUser;
  } catch (error) {
    console.error(error.message)
    throw new Error('Error creating user profile');
  }
};

const getUser = async (key) => {
  try {
    if(!Number.isInteger(key)){
      const user = await User.findOne({
        where: { 
         email: key.toLowerCase()
       }, 
       attributes: {
        exclude: ['createdAt', 'updatedAt']
       },
       include: [
         {
             model: UserProfile,
             as: 'userProfile',
             attributes: {
              exclude: ['createdAt', 'updatedAt', 'userId', 'id']
             },
         },
       ],
     });
     return user;
    }
    const user = await User.findOne({
       where: { 
        id: key
      }, 
      attributes: {
        exclude: ['createdAt', 'updatedAt']
       },
      include: [
        {
            model: UserProfile,
            as: 'userProfile',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'userId', 'id']
             },
        },
      ],
    });
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

const removeUser = async (userId) => {
  try {
    await User.destroy({
      where: { 
       id: userId 
    }});
    await UserProfile.destroy({
      where: { 
        userId : userId 
    }});
  } catch (error) {
    throw new Error('Error delete user');
  }
};


const updateUserProfile = async (userProfile) => {
  const checkUser = await getUser(userProfile.userId);
  if(checkUser == null){
    throw new Error('User not found');
  }
  try {
    const updateUser = await UserProfile.update(
      { 
        fullname : userProfile.fullname, 
        address: userProfile.address, 
        gender: userProfile.gender, 
        maritalStatus: userProfile.maritalStatus 
      }, {
        where : {
          userId: userProfile.userId,
        }
      }
    );
    return updateUser;
  } catch (error) {
    console.error(error.message)
    throw new Error('Error updating user profile');
  }
};

const updateEmailAndPassword = async (user) => {
  const checkUser = await getUser(user.userId);
  if(checkUser == null){
    throw new Error('User not found');
  }
  try {
    const updateUser = await User.update(
      { 
        email : user.email.toLowerCase(), 
        password: user.password, 
      }, {
        where : {
          id: user.userId,
        }
      }
    );
    return updateUser;
  } catch (error) {
    console.error(error.message)
    throw new Error('Error updating user email or password');
  }
};

module.exports = { 
  createUser, 
  getUser, 
  createUserProfile, 
  updateUserProfile,
  updateEmailAndPassword,
  removeUser
};
