import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert, { Color } from "@material-ui/lab/Alert";

interface NotificationPropsInterface {
  children: (
    callback: (text: string, type: Color) => void
  ) => React.ReactElement;
}

export const Notification: React.FC<NotificationPropsInterface> = ({
  children,
}): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{
    text: string;
    type: Color;
  }>();

  const openNotification = (text: string, type: Color) => {
    setNotificationObj({ text, type });
    setOpen(true);
  };

  return (
    <>
      {children(openNotification)}
      <Snackbar open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
          {notificationObj?.text}
        </Alert>
      </Snackbar>
    </>
  );
};
