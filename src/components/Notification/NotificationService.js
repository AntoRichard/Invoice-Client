import { notification } from "antd";

const NotificationService = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

export default NotificationService;