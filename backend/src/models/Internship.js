const mongoose = require('mongoose');

/**
 * Internship Schema - Posted by companies, applied by students
 */
const internshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  title: {
    type: String,
    required: [true, 'Internship title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [3000, 'Description cannot exceed 3000 characters']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  stipend: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    type: {
      type: String,
      enum: ['paid', 'unpaid', 'performance-based'],
      default: 'unpaid'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true
    },
    city: String,
    state: String,
    country: String
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time'],
    default: 'full-time'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'Application deadline is required']
  },
  positions: {
    type: Number,
    default: 1,
    min: 1
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'cancelled'],
    default: 'active'
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['software', 'design', 'marketing', 'sales', 'hr', 'finance', 'other'],
    default: 'other'
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  perks: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
internshipSchema.index({ company: 1, status: 1 });
internshipSchema.index({ status: 1, applicationDeadline: 1 });
internshipSchema.index({ skills: 1 });
internshipSchema.index({ createdAt: -1 });

// Virtual populate for applications
internshipSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'internship'
});

// Update applicationsCount before saving
internshipSchema.pre('save', async function(next) {
  if (this.isModified('applicationsCount')) {
    return next();
  }
  next();
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
