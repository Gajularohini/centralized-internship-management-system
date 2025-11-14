const Notification = require('../models/Notification');

/**
 * Create and send notification
 */
exports.createNotification = async ({ recipient, sender, type, title, message, relatedTo, link, priority = 'medium' }) => {
  try {
    const notification = await Notification.create({
      recipient,
      sender,
      type,
      title,
      message,
      relatedTo,
      link,
      priority
    });

    // Emit socket event if socket.io is available
    if (global.io) {
      global.io.to(recipient.toString()).emit('notification', notification);
    }

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

/**
 * Notification templates
 */
exports.notificationTemplates = {
  applicationSubmitted: (studentName, internshipTitle) => ({
    type: 'application-submitted',
    title: 'New Application Received',
    message: `${studentName} has applied for ${internshipTitle}`
  }),
  
  applicationReviewed: (status, internshipTitle) => ({
    type: 'application-reviewed',
    title: 'Application Reviewed',
    message: `Your application for ${internshipTitle} has been ${status}`
  }),
  
  taskSubmitted: (studentName, taskTitle) => ({
    type: 'task-submitted',
    title: 'New Task Submitted',
    message: `${studentName} has submitted "${taskTitle}"`
  }),
  
  taskReviewed: (taskTitle, status) => ({
    type: 'task-reviewed',
    title: 'Task Reviewed',
    message: `Your task "${taskTitle}" has been ${status}`
  }),
  
  feedbackReceived: (giverName, role) => ({
    type: 'feedback-received',
    title: 'New Feedback Received',
    message: `You have received feedback from ${giverName} (${role})`
  }),
  
  internshipPosted: (companyName, internshipTitle) => ({
    type: 'internship-posted',
    title: 'New Internship Posted',
    message: `${companyName} has posted a new internship: ${internshipTitle}`
  }),
  
  teacherAssigned: (teacherName) => ({
    type: 'teacher-assigned',
    title: 'Teacher Assigned',
    message: `${teacherName} has been assigned as your mentor`
  })
};
