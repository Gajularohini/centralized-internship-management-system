const mongoose = require('mongoose');

/**
 * Notification Schema - Real-time notifications for all users
 */
const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required']
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'application-submitted',
      'application-reviewed',
      'application-accepted',
      'application-rejected',
      'task-submitted',
      'task-reviewed',
      'feedback-received',
      'internship-posted',
      'internship-deadline',
      'message-received',
      'teacher-assigned',
      'system'
    ],
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  relatedTo: {
    model: {
      type: String,
      enum: ['Internship', 'Application', 'Task', 'Feedback', 'Message']
    },
    id: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  link: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
