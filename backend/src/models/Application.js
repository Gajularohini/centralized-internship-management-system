const mongoose = require('mongoose');

/**
 * Application Schema - Student applications for internships
 */
const applicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: [true, 'Internship is required']
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student is required']
  },
  coverLetter: {
    type: String,
    maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
  },
  resume: {
    type: String,
    required: [true, 'Resume is required']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  companyNotes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  teacherApproval: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    approvedAt: Date,
    comments: String
  },
  // If accepted - internship details
  internshipStartDate: Date,
  internshipEndDate: Date,
  finalRating: {
    type: Number,
    min: 0,
    max: 5
  },
  completionCertificate: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
applicationSchema.index({ internship: 1, student: 1 }, { unique: true });
applicationSchema.index({ student: 1, status: 1 });
applicationSchema.index({ internship: 1, status: 1 });
applicationSchema.index({ status: 1 });

// Virtual populate for tasks and feedback
applicationSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'application'
});

applicationSchema.virtual('feedbacks', {
  ref: 'Feedback',
  localField: '_id',
  foreignField: 'application'
});

// Update internship applicationsCount when application is created
applicationSchema.post('save', async function(doc) {
  if (doc.status === 'pending' || doc.status === 'reviewed' || doc.status === 'shortlisted') {
    await mongoose.model('Internship').findByIdAndUpdate(
      doc.internship,
      { $inc: { applicationsCount: 1 } }
    );
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
