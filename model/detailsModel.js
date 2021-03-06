const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  setUpForFirstTimeStatus: {
    type: Boolean,
    default: false,
    optional: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePhoto: {
    type: String,
    default:
      'https://i.pinimg.com/564x/74/46/9b/74469bd23df16c22231fcf75b7073fd2.jpg',
    optional: true,
  },
  profilePhotoUpdateCount: {
    type: Number,
    default: 0,
    optional: true,
  },
  bio: {
    type: String,
    default: '',
    optional: true,
  },
  aboutMe: {
    type: String,
    default: '',
    optional: true,
  },
  twitter: {
    type: String,
    default: '',
    optional: true,
  },
  facebook: {
    type: String,
    default: '',
    optional: true,
  },
  instagram: {
    type: String,
    default: '',
    optional: true,
  },
  linkedin: {
    type: String,
    default: '',
    optional: true,
  },
  github: {
    type: String,
    default: '',
    optional: true,
  },
  website: {
    type: String,
    default: '',
    optional: true,
  },
  education: [
    {
      organizationName: {
        type: String,
        default: '',
        optional: true,
      },
      dateOfJoining: {
        type: String,
        default: '',
        optional: true,
      },
      dateOfLeaving: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],

  workExperience: [
    {
      companyName: {
        type: String,
        default: '',
        optional: true,
      },
      designation: {
        type: String,
        default: '',
        optional: true,
      },
      dateOfJoining: {
        type: String,

        default: '',
        optional: true,
      },
    },
  ],

  skills: [
    {
      skillName: {
        type: String,
        default: '',
        optional: true,
      },
      rate: {
        type: Number,
        default: 100,
        optional: true,
      },
    },
  ],

  projects: [
    {
      projectName: {
        type: String,
        default: '',
        optional: true,
      },
      projectDescription: {
        type: String,
        default: '',
        optional: true,
      },
      projectImage: {
        type: String,
        default: '',
        optional: true,
      },
      projectVideoLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectGithubLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectWebsiteLink: {
        type: String,
        default: '',
        optional: true,
      },
      projectDocLink: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],

  achievements: [
    {
      achievementName: {
        type: String,
        default: '',
        optional: true,
      },
      achievementDescription: {
        type: String,
        default: '',
        optional: true,
      },
      achievementImage: {
        type: String,
        default: '',
        optional: true,
      },
    },
  ],
});
const Details = mongoose.model('Details', detailsSchema);
module.exports = Details;
