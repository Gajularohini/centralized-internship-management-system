const mongoose = require('mongoose');

/**
 * Task Schema - Tasks/work submissions by students during internship
 */
const taskSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'milestone', 'final'],
    default: 'daily'
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  // File attachments
  files: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Links (GitHub, Drive, etc.)
  links: [{
    title: String,
    url: String
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected', 'revision-required'],
    default: 'submitted'
  },
  // Teacher evaluation
  teacherReview: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    reviewedAt: Date,
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    comments: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'revision-required'],
      default: 'pending'
    }
  },
  // Company evaluation
  companyReview: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    reviewedAt: Date,
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    comments: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'revision-required'],
      default: 'pending'
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes
taskSchema.index({ application: 1, student: 1 });
taskSchema.index({ student: 1, status: 1 });
taskSchema.index({ internship: 1, submissionDate: -1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
