const mongoose = require('mongoose');

/**
 * Feedback Schema - Feedback given by teachers and companies
 */
const feedbackSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: [true, 'Application is required']
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student is required']
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: [true, 'Internship is required']
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'givenByModel',
    required: [true, 'Feedback giver is required']
  },
  givenByModel: {
    type: String,
    required: true,
    enum: ['Teacher', 'Company']
  },
  type: {
    type: String,
    enum: ['task-feedback', 'weekly-review', 'monthly-review', 'final-evaluation'],
    default: 'task-feedback'
  },
  rating: {
    overall: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: 0,
      max: 5
    },
    technical: {
      type: Number,
      min: 0,
      max: 5
    },
    communication: {
      type: Number,
      min: 0,
      max: 5
    },
    punctuality: {
      type: Number,
      min: 0,
      max: 5
    },
    teamwork: {
      type: Number,
      min: 0,
      max: 5
    },
    problemSolving: {
      type: Number,
      min: 0,
      max: 5
    }
  },
  comments: {
    type: String,
    required: [true, 'Comments are required'],
    maxlength: [2000, 'Comments cannot exceed 2000 characters']
  },
  strengths: [{
    type: String,
    trim: true
  }],
  improvements: [{
    type: String,
    trim: true
  }],
  recommendations: {
    type: String,
    maxlength: [1000, 'Recommendations cannot exceed 1000 characters']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  acknowledgedBy: {
    acknowledgedAt: Date,
    response: String
  }
}, {
  timestamps: true
});

// Indexes
feedbackSchema.index({ application: 1, student: 1 });
feedbackSchema.index({ student: 1, createdAt: -1 });
feedbackSchema.index({ givenBy: 1, givenByModel: 1 });
feedbackSchema.index({ task: 1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
