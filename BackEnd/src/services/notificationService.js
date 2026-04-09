// services/notificationService.js

const sendNotification = async ({ type, payload }) => {
    try {
      switch (type) {
  
        case "TOKEN_CREATED":
          console.log(`🔔 Token Created`);
          console.log(`Patient: ${payload.patientName}`);
          console.log(`Token No: ${payload.tokenNumber}`);
          console.log(`ETA: ${payload.estimatedTime} mins`);
          break;
  
        case "TOKEN_UPDATED":
          console.log(`🔄 Token Updated`);
          console.log(`Token ID: ${payload.id}`);
          console.log(`New Status: ${payload.status}`);
          break;
  
        case "TRIAGE_COMPLETED":
          console.log(`🚑 Triage Completed`);
          console.log(`Category: ${payload.triage_category}`);
          console.log(`Score: ${payload.priority_score}`);
          break;
  
        default:
          console.log("Unknown notification type");
      }
  
      return {
        success: true,
        message: "Notification processed",
      };
  
    } catch (error) {
      console.error("Notification Error:", error);
  
      return {
        success: false,
        message: "Notification failed",
      };
    }
  };
  
  module.exports = {
    sendNotification,
  };