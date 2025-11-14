const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema - Base schema for all users (Student, Teacher, Company)
 * Uses discriminators for role-specific data
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update passwordChangedAt when password is changed
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password was changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

/**
 * Student Schema - Extends User with student-specific fields
 */
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    sparse: true
  },
  university: {
    type: String,
    required: [true, 'University name is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required']
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  skills: [{
    type: String,
    trim: true
  }],
  resume: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  linkedIn: String,
  github: String,
  portfolio: String
});

const Student = User.discriminator('student', studentSchema);

/**
 * Teacher Schema - Extends User with teacher-specific fields
 */
const teacherSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
    sparse: true
  },
  university: {
    type: String,
    required: [true, 'University name is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required']
  },
  specialization: [{
    type: String
  }],
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  assignedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Teacher = User.discriminator('teacher', teacherSchema);

/**
 * Company Schema - Extends User with company-specific fields
 */
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required']
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  website: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  logo: String,
  linkedIn: String,
  twitter: String,
  contactPerson: {
    name: String,
    designation: String,
    email: String,
    phone: String
  },
  isVerifiedCompany: {
    type: Boolean,
    default: false
  }
});

const Company = User.discriminator('company', companySchema);

module.exports = { User, Student, Teacher, Company };
